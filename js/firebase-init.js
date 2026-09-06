// Firebase Modular SDK v12.18.0 Client for Hikka Surf School
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDpUxDVtVFJ0mqJ_Gr4BAk3OWoNtBa-tkY",
  authDomain: "surfhikka.firebaseapp.com",
  projectId: "surfhikka",
  storageBucket: "surfhikka.firebasestorage.app",
  messagingSenderId: "1037191100962",
  appId: "1:1037191100962:web:0d22a65f0dc5a8b1c5a87b",
  measurementId: "G-VLBNEPSNH0"
};

// Initialize Firebase App & Services
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Authentication Helpers
export async function loginAdmin(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Data Fetching & Saving Helpers
export async function getSettings() {
  try {
    const snap = await getDoc(doc(db, "settings", "general"));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("Firestore getSettings error:", err);
    return null;
  }
}

export async function saveSettings(data) {
  return await setDoc(doc(db, "settings", "general"), data, { merge: true });
}

export async function getPageData(pageId) {
  try {
    const snap = await getDoc(doc(db, "pages", pageId));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error(`Firestore getPageData (${pageId}) error:`, err);
    return null;
  }
}

export async function savePageData(pageId, data) {
  return await setDoc(doc(db, "pages", pageId), data, { merge: true });
}

// Real-time listener helper
export function subscribeToPage(pageId, callback) {
  return onSnapshot(doc(db, "pages", pageId), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}

export function subscribeToSettings(callback) {
  return onSnapshot(doc(db, "settings", "general"), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}

// Firebase Storage File Upload Helper
export function uploadImageFile(file, folderPath = "uploads", onProgress = null) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected for upload."));
    }

    // Ensure user is authenticated before attempting upload
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("❌ [Firebase Storage] User is not authenticated. Cannot upload.");
      return reject(new Error("Authentication required: You must be logged in as an admin to upload images. Please sign in first."));
    }

    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const cleanFolder = folderPath.replace(/\/+$/, '');
    const fullPath = `${cleanFolder}/${cleanFileName}`;
    const storageRef = ref(storage, fullPath);

    console.group(`🔥 [Firebase Storage] Starting Upload: ${file.name}`);
    console.log("Bucket:", firebaseConfig.storageBucket);
    console.log("Path:", fullPath);
    console.log("Size:", `${(file.size / 1024).toFixed(1)} KB`);
    console.log("Type:", file.type || "unknown");
    console.log("Admin User:", currentUser.email, `(${currentUser.uid})`);
    console.groupEnd();

    let uploadTask;
    try {
      uploadTask = uploadBytesResumable(storageRef, file);
    } catch (initErr) {
      console.error("❌ [Firebase Storage] uploadBytesResumable initialization error:", initErr);
      return reject(new Error(`Failed to initiate upload: ${initErr.message}`));
    }

    let isCompleted = false;

    // Watchdog timer: If upload hangs (e.g. bucket doesn't exist or storage unprovisioned),
    // cancel task after 25 seconds instead of waiting 10 minutes in silent retry backoff.
    const timeoutSeconds = 25;
    const watchdogTimer = setTimeout(() => {
      if (!isCompleted) {
        console.warn(`⚠️ [Firebase Storage] Upload timed out after ${timeoutSeconds}s. Cancelling task...`);
        try {
          uploadTask.cancel();
        } catch (cErr) {
          console.error("Task cancel error:", cErr);
        }
        reject(new Error(
          `Firebase Storage upload timed out after ${timeoutSeconds}s. ` +
          `This almost always means Firebase Storage is not yet enabled in the Firebase Console (Build > Storage > "Get Started"), ` +
          `or the bucket "${firebaseConfig.storageBucket}" does not exist.`
        ));
      }
    }, timeoutSeconds * 1000);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const total = snapshot.totalBytes || 1;
        const progress = Math.min(100, Math.round((snapshot.bytesTransferred / total) * 100));
        console.log(`[Firebase Storage] Upload progress: ${progress}% (${snapshot.bytesTransferred}/${snapshot.totalBytes} bytes, state: ${snapshot.state})`);
        if (typeof onProgress === 'function') {
          onProgress(progress, snapshot);
        }
      },
      (error) => {
        isCompleted = true;
        clearTimeout(watchdogTimer);
        console.error("❌ [Firebase Storage] Upload failed with error code:", error.code, error);

        let friendlyMessage = error.message;
        switch (error.code) {
          case 'storage/unauthorized':
            friendlyMessage = "Permission denied (storage/unauthorized). Please verify your Firebase Storage Security Rules allow authenticated writes: `allow write: if request.auth != null;`";
            break;
          case 'storage/bucket-not-found':
            friendlyMessage = `Bucket not found (storage/bucket-not-found). Firebase Storage is not enabled yet in your project, or bucket "${firebaseConfig.storageBucket}" is incorrect. Go to Firebase Console -> Build -> Storage and click "Get Started".`;
            break;
          case 'storage/project-not-found':
            friendlyMessage = `Project not found. Verify your projectId ("${firebaseConfig.projectId}") has Storage activated.`;
            break;
          case 'storage/quota-exceeded':
            friendlyMessage = "Firebase Storage quota exceeded for your project.";
            break;
          case 'storage/canceled':
            friendlyMessage = "Upload was canceled or timed out.";
            break;
          case 'storage/retry-limit-exceeded':
            friendlyMessage = "Maximum retry limit exceeded. Firebase Storage is unresponsive. Ensure Storage is enabled in the Firebase Console.";
            break;
          default:
            if (error.message && error.message.includes('404')) {
              friendlyMessage = `Storage bucket not found (404). Please go to Firebase Console -> Build -> Storage and click "Get Started" to initialize your storage bucket.`;
            }
            break;
        }

        reject(new Error(friendlyMessage));
      },
      async () => {
        isCompleted = true;
        clearTimeout(watchdogTimer);
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("✅ [Firebase Storage] Upload successful. Download URL:", downloadUrl);
          resolve(downloadUrl);
        } catch (urlErr) {
          console.error("❌ [Firebase Storage] Failed to retrieve download URL:", urlErr);
          reject(new Error(`Failed to retrieve download URL: ${urlErr.message}`));
        }
      }
    );
  });
}

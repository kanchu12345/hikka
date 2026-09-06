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
    if (!file) return reject(new Error("No file selected for upload"));
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const cleanFolder = folderPath.replace(/\/+$/, '');
    const fullPath = `${cleanFolder}/${cleanFileName}`;
    const storageRef = ref(storage, fullPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (typeof onProgress === 'function') onProgress(progress);
      },
      (error) => {
        console.error("Firebase Storage upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

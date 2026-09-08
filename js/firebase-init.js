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
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

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

// Authentication Helpers
export async function loginAdmin(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}

export async function resetAdminPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}

export { sendPasswordResetEmail };

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

export const DEFAULT_IMGBB_KEY = "580db6f671331120289dba6d8ec108c2";

// ImgBB 100% Free Image Upload Helper (No Credit Card / Zero-Cost)
export async function uploadImageFile(file, folderName = "uploads", onProgress = null) {
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  // Retrieve ImgBB API Key: user-configured, state, or default key
  const apiKey = (localStorage.getItem('hikka_imgbb_key') || 
                  window.siteState?.settings?.imgbbApiKey || 
                  DEFAULT_IMGBB_KEY).trim();

  // Call onProgress(50) right when the upload starts so the UI immediately updates
  if (typeof onProgress === 'function') {
    try { onProgress(50); } catch (_) {}
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok || !result || !result.success) {
      const errMsg = result?.error?.message || `Upload failed with status ${response.status}`;
      throw new Error(`ImgBB Error: ${errMsg}`);
    }

    // Call onProgress(100) when upload completes
    if (typeof onProgress === 'function') {
      try { onProgress(100); } catch (_) {}
    }

    const downloadUrl = result.data?.url || result.data?.display_url;
    if (!downloadUrl) {
      throw new Error("ImgBB did not return a valid image URL.");
    }

    return downloadUrl;
  } catch (err) {
    console.error("❌ [ImgBB Upload Error]:", err);
    throw new Error(err.message || "Failed to upload image to ImgBB.");
  }
}

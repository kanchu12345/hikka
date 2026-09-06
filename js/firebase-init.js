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
export function uploadImageFile(file, folderPath = "uploads", onProgress = null) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected for upload."));
    }

    // Retrieve ImgBB API Key: user-configured, state, or default key
    let apiKey = localStorage.getItem('hikka_imgbb_key') || 
                 window.siteState?.settings?.imgbbApiKey || 
                 DEFAULT_IMGBB_KEY;

    if (!apiKey || !apiKey.trim()) {
      const promptKey = prompt(
        "🖼️ ImgBB Free Image Upload (No Credit Card Required):\n\n" +
        "Please enter your ImgBB API Key to upload images.\n" +
        "Don't have one? Get it 100% free in 10 seconds at: https://api.imgbb.com/\n\n" +
        "Paste your 32-character key here:"
      );

      if (!promptKey || !promptKey.trim()) {
        return reject(new Error("Upload canceled: ImgBB API key is required. Get one free at https://api.imgbb.com/"));
      }

      apiKey = promptKey.trim();
      localStorage.setItem('hikka_imgbb_key', apiKey);
      if (window.siteState?.settings) {
        window.siteState.settings.imgbbApiKey = apiKey;
        saveSettings(window.siteState.settings).catch(e => console.warn("Failed to auto-save key to firestore:", e));
      }
      const keyInput = document.getElementById('gen-imgbb-key');
      if (keyInput) keyInput.value = apiKey;
    }

    console.group(`🖼️ [ImgBB Upload] Starting: ${file.name}`);
    console.log("Using API Key:", apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length - 4));
    console.log("Size:", `${(file.size / 1024).toFixed(1)} KB`);
    console.log("Type:", file.type || "unknown");
    console.groupEnd();

    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey.trim())}`);

    if (xhr.upload && typeof onProgress === 'function') {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.min(100, Math.round((e.loaded / e.total) * 100));
          console.log(`[ImgBB Upload] ${progress}% (${e.loaded}/${e.total} bytes)`);
          onProgress(progress);
        }
      };
    }

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && res.success && res.data) {
          // ImgBB returns direct URL in data.url and display_url
          const directUrl = res.data.url || res.data.display_url;
          console.log("✅ [ImgBB Upload] Success! Direct URL:", directUrl);
          resolve(directUrl);
        } else {
          let errMsg = res.error?.message || `ImgBB upload failed (Status ${xhr.status})`;
          if (res.error?.code === 103) {
            errMsg = "Access forbidden by ImgBB security filter. Please try again or paste image URL manually.";
          }
          console.error("❌ [ImgBB Upload] Error:", errMsg, res);
          if (res.error?.code === 100) {
            localStorage.removeItem('hikka_imgbb_key');
            if (window.siteState?.settings) window.siteState.settings.imgbbApiKey = '';
          }
          reject(new Error(`ImgBB: ${errMsg}`));
        }
      } catch (parseErr) {
        console.error("❌ [ImgBB Upload] Response parse error:", parseErr, xhr.responseText);
        reject(new Error(`Failed to parse ImgBB response (${xhr.status}).`));
      }
    };

    xhr.onerror = () => {
      console.error("❌ [ImgBB Upload] Network error");
      reject(new Error("Network error connecting to ImgBB. Please check your internet connection or paste image URL manually."));
    };

    xhr.ontimeout = () => {
      console.warn("⚠️ [ImgBB Upload] Request timed out");
      reject(new Error("ImgBB upload timed out after 35 seconds."));
    };

    xhr.timeout = 35000;
    xhr.send(formData);
  });
}

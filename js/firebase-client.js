// Firebase Client & Realtime Sync Engine for Hikka Surf School
// Seamlessly connects with Firestore, Auth, and Storage with automatic local fallback

class FirebaseSyncEngine {
  constructor() {
    this.isConfigured = false;
    this.db = null;
    this.auth = null;
    this.storage = null;
    this.init();
  }

  getStoredConfig() {
    try {
      const cfg = localStorage.getItem('hikka_firebase_config');
      return cfg ? JSON.parse(cfg) : null;
    } catch (e) {
      return null;
    }
  }

  saveConfig(configObj) {
    try {
      localStorage.setItem('hikka_firebase_config', JSON.stringify(configObj));
      this.init();
      return true;
    } catch (e) {
      return false;
    }
  }

  init() {
    const config = this.getStoredConfig();
    if (config && window.firebase && config.apiKey && config.projectId) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.isConfigured = true;
        console.log("🔥 Firebase Firestore connected successfully.");
        this.setupRealtimeListeners();
      } catch (err) {
        console.warn("Firebase init note:", err);
      }
    } else {
      console.log("⚡ Running on fast local sync engine (Zero latency).");
    }
  }

  setupRealtimeListeners() {
    if (!this.isConfigured || !this.db) return;

    // Listen to site_settings
    this.db.collection('site_settings').doc('main').onSnapshot(doc => {
      if (doc.exists) {
        const cloudData = doc.data();
        const currentData = getActiveSiteData();
        currentData.settings = Object.assign({}, currentData.settings, cloudData);
        saveActiveSiteData(currentData);
      }
    }, err => console.log('Firestore settings listener:', err));

    // Listen to activities
    this.db.collection('activities').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const activities = [];
        snapshot.forEach(d => activities.push(d.data()));
        activities.sort((a, b) => (a.order || 0) - (b.order || 0));
        const currentData = getActiveSiteData();
        currentData.activities = activities;
        saveActiveSiteData(currentData);
      }
    }, err => console.log('Firestore activities listener:', err));

    // Listen to reviews
    this.db.collection('reviews').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const reviews = [];
        snapshot.forEach(d => reviews.push(d.data()));
        const currentData = getActiveSiteData();
        currentData.reviews = reviews;
        saveActiveSiteData(currentData);
      }
    }, err => console.log('Firestore reviews listener:', err));
  }

  // Push local data up to Firestore
  async syncLocalToCloud() {
    if (!this.isConfigured || !this.db) {
      throw new Error("Firebase is not configured yet. Please enter your Firebase config in the Admin panel.");
    }
    const data = getActiveSiteData();
    
    // Save settings
    await this.db.collection('site_settings').doc('main').set(data.settings, { merge: true });

    // Save activities
    for (const act of data.activities) {
      await this.db.collection('activities').doc(act.id).set(act, { merge: true });
    }

    // Save reviews
    for (const rev of data.reviews) {
      await this.db.collection('reviews').doc(rev.id).set(rev, { merge: true });
    }

    return true;
  }
}

window.firebaseSync = new FirebaseSyncEngine();

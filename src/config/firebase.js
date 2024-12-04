import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNwxg5h4Qz6YXxR9mz-Ry7vKz9l4Ry7vK",
  authDomain: "task-scheduler-vue.firebaseapp.com",
  projectId: "task-scheduler-vue",
  storageBucket: "task-scheduler-vue.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVhQBlsUMJaFcbKbSGKOi2MbOX_TQzDdc",
  authDomain: "horror-house-app.firebaseapp.com",
  projectId: "horror-house-app",
  storageBucket: "horror-house-app.appspot.com",
  messagingSenderId: "111645674505",
  appId: "1:111645674505:web:6b29907bbb21ad0fb1bcd8",
};

export const app = initializeApp(firebaseConfig);

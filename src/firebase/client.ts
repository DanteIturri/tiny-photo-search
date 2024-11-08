import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZrX8zJSqUSOmJxW3e-qy_VUP62nQu6FU",
  authDomain: "tiny-search-d3a52.firebaseapp.com",
  projectId: "tiny-search-d3a52",
  storageBucket: "tiny-search-d3a52.appspot.com",
  messagingSenderId: "548768957094",
  appId: "1:548768957094:web:978d8dfd278cb827192a67",
  measurementId: "G-R7XDFN2WC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
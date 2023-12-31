import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBY1kXb-eozbwAIS0VYKBcYnb3tcq5wHUg",
  authDomain: "rere-test-66402.firebaseapp.com",
  databaseURL: "https://rere-test-66402-default-rtdb.firebaseio.com",
  projectId: "rere-test-66402",
  storageBucket: "rere-test-66402.appspot.com",
  messagingSenderId: "1017523095990",
  appId: "1:1017523095990:web:85593af384c894d3e6d917",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;

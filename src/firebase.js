import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, get } from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

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
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const logInWithEmailAndPassword = async (auth, email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    window.localStorage.setItem("uid", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   authProvider: "local",
    //   email,
    // });
    window.localStorage.setItem("uid", user.uid);
    await handleNewUserData(user.uid);
    window.localStorage.setItem("uid", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // console.log(user);
    const uid = user.uid;
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // const docs = await getDocs(q);

    window.localStorage.setItem("uid", user.uid);
    window.localStorage.setItem("username", user.displayName);

    const fetchData = async (uid) => {
      try {
        // const db = getDatabase();
        // const starCountRef = ref(db, `users`);
        // const snapshot = await get(starCountRef);
        // const data = snapshot.val();
        // if (data.uid === undefined) {
        //   console.log("data undefined");
        //   await handleNewUserData(user.uid);
        // }
        const db = getDatabase();
        const starCountRef = ref(db, `users/${uid}`);
        const snapshot = await get(starCountRef);
        const data = snapshot.val();
        if (data === null) {
          console.log("User data not found");
          await handleNewUserData(uid);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    await fetchData(uid);
    window.localStorage.setItem("uid", uid);
    // console.log(docs);
    // console.log(docs.docs.length);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

async function handleNewUserData(uid) {
  console.log("handleNewUserData");
  const db = getDatabase();

  const postData = [
    {
      id: 1,
      name: "Sample",
      start: "2024-01-02",
      end: "2024-01-08",
      Chapters: [
        {
          id: "1",
          name: "Ch1 Sample 1",
          start: "2024-01-02",
          end: "2024-01-08",
          content: "sdfgdsf",
        },
        {
          id: "2",
          name: "Ch2 Sample 2",
          start: "2024-01-09",
          end: "2024-01-28",
          content: "RRRR",
        },
      ],
    },
  ];

  // A post entry.
  // const postData = {
  //   id: id,
  //   name: "Default Notebook",
  //   start: defaultStartDate,
  //   end: defaultEndDate,
  //   Chapters: [
  //     {
  //       id: id,
  //       name: "Default Chapter",
  //       start: defaultStartDate,
  //       end: defaultEndDate,
  //       content: "Type something",
  //     },
  //   ],
  // };

  // Get a key for a new Post.
  // const newPostKey = id;
  const updates = {};
  updates["/users/" + uid + "/notebooks"] = postData;

  return update(ref(db), updates);
}

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  database,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyA0q0yLvCPK4-bHGxOoslv-QnTBSjRt22Q",
    authDomain: "worklog-30880.firebaseapp.com",
    projectId: "worklog-30880",
    storageBucket: "worklog-30880w.appspot.com",
    messagingSenderId: "1052554594401",
    appId: "1:1052554594401:web:8eb93d731b458e37510220"
});

export default app;
export const auth = getAuth(app);
export const db = getFirestore();
export const colRef = collection(db, "tasks");
export const projectsColRef = collection(db, "projects");
export const typesRef = collection(db, "types");
export const pauseReasonsRef = collection(db, "pauseReasons");
export const frontendCheckListsRef = collection(db, "frontendCheckLists");
export const backendCheckListsRef = collection(db, "backendCheckLists");
export const figmaCheckListsRef = collection(db, "figmaCheckLists");
export const wordpressCheckListsRef = collection(db, "wordpressCheckLists");
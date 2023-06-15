import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

const app = initializeApp({
    apiKey: "AIzaSyCfPp5NkxhK87vvXiyGCJWFQ1XVdpHWdKA",
    authDomain: "ecobees-66a96.firebaseapp.com",
    projectId: "ecobees-66a96",
    storageBucket: "ecobees-66a96.appspot.com",
    messagingSenderId: "189912216593",
    appId: "1:189912216593:web:7a47400a4bc9eaf284adb0"
})

export default app
export const auth = getAuth(app)
export const db = getFirestore()
export const colRef = collection(db, 'tasks')
export const projectsColRef = collection(db, 'projects')
export const typesRef = collection(db, 'types')
export const pauseReasonsRef = collection(db, 'pauseReasons')
export const frontendCheckListsRef = collection(db, 'frontendCheckLists')
export const backendCheckListsRef = collection(db, 'backendCheckLists')
export const figmaCheckListsRef = collection(db, 'figmaCheckLists')
export const wordpressCheckListsRef = collection(db, 'wordpressCheckLists')
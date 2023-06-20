import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

const app = initializeApp({
    apiKey: "AIzaSyDYm5it0b1tMIZzHeN6PfKEek_Fuwr1nac",
    authDomain: "ecobees-dev.firebaseapp.com",
    projectId: "ecobees-dev",
    storageBucket: "ecobees-dev.appspot.com",
    messagingSenderId: "1036861135661",
    appId: "1:1036861135661:web:db603667360280d3c251a4"
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
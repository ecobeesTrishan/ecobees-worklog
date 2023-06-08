import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

const app = initializeApp({
    apiKey: "AIzaSyDBzcaA_rnprst8jPMFLV6p0sdQxcGSGXY",
    authDomain: "ecobees-work-log-production.firebaseapp.com",
    projectId: "ecobees-work-log-production",
    storageBucket: "ecobees-work-log-production.appspot.com",
    messagingSenderId: "662512444562",
    appId: "1:662512444562:web:c55b5156f220b73912f24b"
})

export default app
export const auth = getAuth(app)
export const db = getFirestore()
export const colRef = collection(db, 'tasks')
export const projectsColRef = collection(db, 'projects')
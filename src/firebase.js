import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const app = initializeApp({
    apiKey: "AIzaSyBbwrEzbncMIg9rRm7INxH7pceVV0NlCP4",
    authDomain: "ecobees-work-log-development.firebaseapp.com",
    projectId: "ecobees-work-log-development",
    storageBucket: "ecobees-work-log-development.appspot.com",
    messagingSenderId: "755825461001",
    appId: "1:755825461001:web:a9e979b400da387ed4b5d8"
})

export default app
export const auth = getAuth(app)
import { useContext } from "react"
import { query, where, onSnapshot } from "firebase/firestore"
import { colRef } from "src/firebase"
import StopWatch from "./StopWatch"
import { AuthContext } from "contexts/AuthContext"

const Home = () => {
    const userContext = useContext(AuthContext)
    const { user, logOut } = userContext

    const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "!=", "completed"))
    user?.displayName && onSnapshot(firebaseQuery, (snapshot) => {
        const allDocs = snapshot.docs
        const tasks = []
        allDocs.map((doc) => {
            tasks.push({ ...doc.data(), id: doc.id })
        })
        console.log(tasks)
    })

    return (
        <div className="flex flex-col items-center font-primary">
            <h1 className="pt-8 text-3xl font-bold text-center font-primary">
                Welcome {user.displayName}
            </h1>

            <p className="py-6">
                {user.email}
            </p>

            <StopWatch />
        </div>
    )
}

export default Home

import { useContext } from "react"
import { query, where, onSnapshot } from "firebase/firestore"
import { AuthContext } from "contexts"
import { colRef } from "src/firebase"
import StopWatch from "./StopWatch"

const Home = () => {
    const userContext = useContext(AuthContext)
    const { user } = userContext

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
        <div className="relative flex flex-col items-center font-primary">
            <h1 className="pt-8 text-3xl font-bold text-center font-primary">
                Welcome {user.displayName}
            </h1>

            <StopWatch />
        </div>
    )
}

export default Home

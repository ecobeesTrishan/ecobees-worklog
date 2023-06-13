import { useContext } from "react"
import { query, where, onSnapshot, orderBy } from "firebase/firestore"
import moment from "moment"
import { colRef } from "src/firebase"
import StopWatch from "./StopWatch"
import { AuthContext } from "contexts/AuthContext"

const Info = () => {
    const userContext = useContext(AuthContext)
    const { user, logOut } = userContext

    const handleLogOut = async () => {
        try {
            await logOut()
        }
        catch (error) {
            console.log(error)
        }
    }

    const firebaseQuery = user?.displayName && query(colRef, where("userId", "==", user.uid), where("status", "==", "in progress"), orderBy("createdAt"))
    user?.displayName && onSnapshot(firebaseQuery, (snapshot) => {
        const allDocs = snapshot.docs
        const tasks = []
        allDocs.map((doc) => {
            tasks.push({ ...doc.data(), id: doc.id })
        })
        tasks.length > 0 && console.log(tasks, moment((tasks[0].createdAt).toDate()).format("LLL"), "Trishan", moment().format("LLL"))
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

            <button
                id="user-action-log-out"
                type="button"
                onClick={handleLogOut}
                className="bg-[#fdb517] p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out absolute bottom-0 right-0 m-6"
            >
                Log Out
            </button>
        </div>
    )
}

export default Info

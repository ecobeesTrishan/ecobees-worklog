import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useContext, useState } from "react"
import { query, where, onSnapshot } from "firebase/firestore"
import { AuthContext } from "contexts"
import { colRef } from "src/firebase"
import StopWatch from "./StopWatch"

const Home = () => {
    const userContext = useContext(AuthContext)
    const { user } = userContext
    const [isHidden, setIsHidden] = useState(false)

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
            <div className={`absolute right-0 top-[-30px] p-4 rounded-md bg-yellow-50 animate-bounce ${isHidden ? "hidden" : null}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-800">Download the PWA to avoid unexpected circumstances.</p>
                    </div>
                    <div className="pl-3 ml-auto">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                onClick={() => setIsHidden(true)}
                                type="button"
                                className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                            >
                                <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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

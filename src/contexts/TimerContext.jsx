import { doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { createContext, useEffect, useState, useContext } from "react"
import { db, colRef } from "src/firebase"
import { AuthContext } from "contexts"

export const TimerContext = createContext()

const TimerProvider = ({ children }) => {
    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [, setStartTime] = useState(0)
    const [tasks, setTasks] = useState([])

    const authContext = useContext(AuthContext)
    const { user } = authContext

    const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "!=", "completed"))
    const getTasks = async () => {
        const snapshot = await getDocs(firebaseQuery)
        const allDocs = snapshot.docs
        const tasksArr = []
        allDocs.map((doc) => {
            tasksArr.push({ ...doc.data(), id: doc.id })
            setTasks(tasksArr)
        })
    }
    user?.displayName && getTasks()

    useEffect(() => {
        const savedTimer = localStorage.getItem('stopwatchTimer')
        if (savedTimer) {
            setTimer(parseInt(savedTimer))
            setIsRunning(false)
            setStartTime(Date.now() - parseInt(savedTimer) * 1000)
        }

        if (user?.displayName) {
            const docRef = user?.displayName && doc(db, "tasks", tasks[0]?.id)
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setTimer(docSnapshot.data().timer)
                }
            })
            return () => unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning])

    useEffect(() => {
        localStorage.setItem('stopwatchTimer', timer.toString())

        if (user?.displayName) {
            const docRef = doc(db, "tasks", tasks[0]?.id)
            updateDoc(docRef, {
                timer: timer
            })
        }
    }, [timer])

    return (
        <TimerContext.Provider value={{ timer, isRunning, setTimer, setIsRunning, setStartTime }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider

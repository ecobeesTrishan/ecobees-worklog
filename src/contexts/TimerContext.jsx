import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import { createContext, useEffect, useState, useContext } from "react"
import { db } from "src/firebase"
import { AuthContext } from "contexts"

export const TimerContext = createContext()

const stopwatchDocRef = doc(collection(db, 'stopwatch'), 'stopwatchTime')

const TimerProvider = ({ children }) => {
    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [, setStartTime] = useState(0)

    const authContext = useContext(AuthContext)
    const { user } = authContext

    useEffect(() => {
        const savedTimer = localStorage.getItem('stopwatchTimer')
        if (savedTimer) {
            setTimer(parseInt(savedTimer))
            setIsRunning(false)
            setStartTime(Date.now() - parseInt(savedTimer) * 1000)
        }

        const unsubscribe = onSnapshot(stopwatchDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setTimer(docSnapshot.data().timer)
            }
        })

        return () => unsubscribe()
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
            setDoc(stopwatchDocRef, { timer, userId: user.uid })
        }
    }, [timer])

    return (
        <TimerContext.Provider value={{ timer, isRunning, setTimer, setIsRunning, setStartTime }}>
            {children}
        </TimerContext.Provider>
    )
}

export default TimerProvider

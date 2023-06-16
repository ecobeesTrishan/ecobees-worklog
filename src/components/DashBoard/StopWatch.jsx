import { useState, useContext } from "react"
import moment from "moment"
import { collection, doc, query, setDoc, updateDoc, where, getDocs } from 'firebase/firestore'
import { db, colRef } from "src/firebase"
import { AuthContext, TimerContext } from "contexts"
import { Pause, Resume, Start, Submit } from "src/buttons"
import { Form } from "./StartWorkForm"
import { PauseForm } from "./PauseWorkForm"
import { SubmitForm } from "./SubmitWorkForm"

const submittedStopWatchDocRef = doc(collection(db, 'stopwatchSaved'), 'stopwatchTime')

const StopWatch = () => {
    const { timer, isRunning, setTimer, setIsRunning, setStartTime } = useContext(TimerContext)
    const [openModal, setOpenModal] = useState(false)
    const [openPauseModal, setOpenPauseModal] = useState(false)
    const [openSubmitModal, setOpenSubmitModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [logs, setLogs] = useState([])

    const userContext = useContext(AuthContext)
    const { user } = userContext

    const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "!=", "completed"))
    const getTasksAndLogs = async () => {
        const snapshot = await getDocs(firebaseQuery)
        const allDocs = snapshot.docs
        const tasksArr = []
        allDocs.map((doc) => {
            tasksArr.push({ ...doc.data(), id: doc.id })
            const logsArr = doc.data().logs
            setTasks(tasksArr)
            setLogs(logsArr)
        })
    }
    user?.displayName && getTasksAndLogs()

    const handleStart = () => {
        setOpenModal(true)
    }

    const setTimerOn = () => {
        if (!isRunning) {
            setIsRunning(true)
            setStartTime(Date.now() - timer * 1000)
        }
    }

    const handlePause = () => {
        setOpenPauseModal(true)
    }

    const handleResume = () => {
        setIsRunning(true)
        setStartTime(Date.now() - timer * 1000)

        const docRef = doc(db, "tasks", tasks[0]?.id)

        const currentTime = moment().format("LLL")
        const tempLogsArr = logs
        tempLogsArr.push(`Resumed at ${currentTime}`)
        setLogs(tempLogsArr)

        updateDoc(docRef, {
            status: "in progress",
            logs: logs
        })
    }

    const handleReset = () => {
        setTimer(0)
        setIsRunning(false)
        setStartTime(0)
        localStorage.removeItem('stopwatchTimer')
    }

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)
        const seconds = time % 60

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const handleSubmit = () => {
        setDoc(submittedStopWatchDocRef, { timer })
        handleReset()
    }

    return (
        <div className="relative flex flex-col items-center justify-center gap-6 my-10 font-primary">
            <h2 className="opacity-50">
                Total Hours Billed
            </h2>

            <div className="flex text-5xl bold">
                <span>
                    {formatTime(timer)}
                </span>
            </div>

            <div className="flex items-center justify-center gap-10">
                {!isRunning && timer === 0 && <Start onClick={handleStart} />}

                {isRunning && <Pause onClick={handlePause} />}

                {!isRunning && timer > 0 && <Resume onClick={handleResume} />}

                {timer > 0 && <Submit onClick={() => setOpenSubmitModal(true)} />}

            </div>

            {openModal && <Form setOpenModal={setOpenModal} setTimerOn={setTimerOn} />}

            {openPauseModal && <PauseForm setOpenPauseModal={setOpenPauseModal} setIsRunning={setIsRunning} isRunning={isRunning} timer={timer} />}

            {openSubmitModal && <SubmitForm setOpenSubmitModal={setOpenSubmitModal} handleFormSubmit={handleSubmit} />}
        </div>
    )
}

export default StopWatch




// import { useState, useEffect, useContext } from "react"
// import { collection, doc, onSnapshot, query, setDoc, updateDoc, where, getDocs } from 'firebase/firestore'
// import { db, colRef } from "src/firebase"
// import { AuthContext } from "contexts/AuthContext"
// import { Pause, Resume, Start, Submit } from "src/buttons"
// import { Form } from "./StartWorkForm"
// import { PauseForm } from "./PauseWorkForm"
// import { SubmitForm } from "./SubmitWorkForm"
// import moment from "moment"

// const stopwatchDocRef = doc(collection(db, 'stopwatch'), 'stopwatchTime')
// const submittedStopWatchDocRef = doc(collection(db, 'stopwatchSaved'), 'stopwatchTime')

// const StopWatch = () => {
//     const [timer, setTimer] = useState(0)
//     const [isRunning, setIsRunning] = useState(false)
//     const [, setStartTime] = useState(0)
//     const [openModal, setOpenModal] = useState(false)
//     const [openPauseModal, setOpenPauseModal] = useState(false)
//     const [openSubmitModal, setOpenSubmitModal] = useState(false)
//     const [tasks, setTasks] = useState([])
//     const [logs, setLogs] = useState([])

//     const userContext = useContext(AuthContext)
//     const { user } = userContext

//     const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "!=", "completed"))
//     const getTasksAndLogs = async () => {
//         const snapshot = await getDocs(firebaseQuery)
//         const allDocs = snapshot.docs
//         const tasksArr = []
//         allDocs.map((doc) => {
//             tasksArr.push({ ...doc.data(), id: doc.id })
//             const logsArr = doc.data().logs
//             setTasks(tasksArr)
//             setLogs(logsArr)
//         })
//     }
//     user?.displayName && getTasksAndLogs()

//     useEffect(() => {
//         const savedTimer = localStorage.getItem('stopwatchTimer')
//         if (savedTimer) {
//             setTimer(parseInt(savedTimer))
//             // setIsRunning(true)
//         }

//         const unsubscribe = onSnapshot(stopwatchDocRef, (docSnapshot) => {
//             if (docSnapshot.exists()) {
//                 setTimer(docSnapshot.data().timer)
//             }
//         })

//         return () => unsubscribe()
//     }, [])

//     useEffect(() => {
//         if (isRunning) {
//             const interval = setInterval(() => {
//                 setTimer((prevTimer) => prevTimer + 1)
//             }, 1000)
//             return () => clearInterval(interval)
//         }
//     }, [isRunning])

//     const handleStart = () => {
//         setOpenModal(true)
//     }

//     const setTimerOn = () => {
//         if (!isRunning) {
//             setIsRunning(true)
//             setStartTime(Date.now() - timer * 1000)
//         }
//     }

//     const handlePause = () => {
//         setOpenPauseModal(true)
//     }

//     const handleResume = () => {
//         setIsRunning(true)
//         setStartTime(Date.now() - timer * 1000)

//         const docRef = doc(db, "tasks", tasks[0]?.id)

//         const currentTime = moment().format("LLL")
//         const tempLogsArr = logs
//         tempLogsArr.push(`Resumed at ${currentTime}`)
//         setLogs(tempLogsArr)

//         updateDoc(docRef, {
//             status: "in progress",
//             logs: logs
//         })
//     }

//     const handleReset = () => {
//         setTimer(0)
//         setIsRunning(false)
//         setStartTime(0)
//     }

//     const formatTime = (time) => {
//         const hours = Math.floor(time / 3600)
//         const minutes = Math.floor((time % 3600) / 60)
//         const seconds = time % 60

//         return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
//     }

//     const handleSubmit = () => {
//         setDoc(submittedStopWatchDocRef, { timer })
//         handleReset()
//     }

//     useEffect(() => {
//         localStorage.setItem('stopwatchTimer', timer.toString())
//         setDoc(stopwatchDocRef, { timer })
//     }, [timer])

//     return (
//         <div className="relative flex flex-col items-center justify-center gap-6 my-10 font-primary">
//             <h2 className="opacity-50">
//                 Total Hours Billed
//             </h2>

//             <div className="flex text-5xl bold">
//                 <span>
//                     {formatTime(timer)}
//                 </span>
//             </div>

//             <div className="flex items-center justify-center gap-10">
//                 {!isRunning && timer === 0 && <Start onClick={handleStart} />}

//                 {isRunning && <Pause onClick={handlePause} />}

//                 {!isRunning && timer > 0 && <Resume onClick={handleResume} />}

//                 {timer > 0 && <Submit onClick={() => setOpenSubmitModal(true)} />}

//             </div>

//             {openModal && <Form setOpenModal={setOpenModal} setTimerOn={setTimerOn} />}

//             {openPauseModal && <PauseForm setOpenPauseModal={setOpenPauseModal} setIsRunning={setIsRunning} isRunning={isRunning} timer={timer} />}

//             {openSubmitModal && <SubmitForm setOpenSubmitModal={setOpenSubmitModal} handleFormSubmit={handleSubmit} />}
//         </div>
//     )
// }

// export default StopWatch
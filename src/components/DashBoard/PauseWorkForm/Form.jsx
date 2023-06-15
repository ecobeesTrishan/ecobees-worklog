import { useContext, useState } from "react"
import { doc, getDocs, query, where, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"
import { db, colRef } from "src/firebase"
import { AuthContext } from "contexts/AuthContext"
import { getPauseReasons } from "src/utils"
import { SelectField, CloseModal } from "components/common"

const pauseReasons = getPauseReasons()

const Form = ({ setOpenPauseModal, setIsRunning, isRunning }) => {
    const [pauseReason, setPauseReason] = useState(pauseReasons[0].value)
    const [tasks, setTasks] = useState([])

    const userContext = useContext(AuthContext)
    const { user } = userContext

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

    const handleFormSubmit = () => {
        setIsRunning(false)
    }

    const updatePauseStates = () => {
        const docRef = doc(db, "tasks", tasks[0]?.id)
        updateDoc(docRef, {
            status: "paused",
            [`pause-${uuidv4().slice(0, 8)}`]: {
                reason: pauseReason ? pauseReason : "",
                pausedAt: moment().format("LLL")
            }
        })
    }
    if (!isRunning) {
        updatePauseStates()
    }

    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 inset-0 bg-opacity-40 ">
            <div className="relative w-[40rem] pb-10 px-10 pt-6 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <CloseModal
                    id="user-action-close-pause-modal"
                    onClick={() => setOpenPauseModal(false)}
                />

                <form
                    onSubmit={handleFormSubmit}
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
                >

                    <SelectField
                        label="Pause reason"
                        options={pauseReasons}
                        onChange={(selectedOption) => setPauseReason(selectedOption.value)}
                    />

                    <div className="flex items-center justify-end mt-6 col-span-full gap-x-6">
                        <button
                            type="submit"
                            id="user-action-submit"
                            className="bg-[#fdb517] font-primary font-medium p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out"
                        >
                            Pause Work
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form

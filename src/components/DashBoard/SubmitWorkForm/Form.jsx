import { useContext, useState } from "react"
import { query, where, orderBy, getDocs } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import formSchema from "./formSchema"
import { InputField, CheckBox, CloseModal } from "components/common"
import { AuthContext } from "contexts/AuthContext"
import { colRef } from "src/firebase"

const Form = ({ setOpenSubmitModal, handleFormSubmit }) => {
    const userContext = useContext(AuthContext)
    const { user } = userContext

    const [tasks, setTasks] = useState([])

    const firebaseQuery = user?.displayName && query(colRef, where("userId", "==", user.uid), orderBy("createdAt"))


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

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    })

    const submitForm = (data) => {
        console.log(data)
        handleFormSubmit()
        setOpenSubmitModal(false)
    }

    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 inset-0 bg-opacity-40 ">
            <div className="relative w-[40rem] pb-10 px-10 pt-6 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <CloseModal
                    id="user-action-close-pause-modal"
                    onClick={() => setOpenSubmitModal(false)}
                />

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
                >

                    {tasks.length > 0 && (
                        <>
                            <InputField
                                label="Project Name"
                                id="project-name"
                                name="projectName"
                                disabled={true}
                                register={register}
                                value={tasks[0].projectName}
                                errorMessage={errors.projectName?.message}
                            />

                            <InputField
                                label="Ticket Title / Ticket Link"
                                id="ticket-details"
                                name="ticketDetails"
                                disabled={true}
                                register={register}
                                value={tasks[0].ticketDetails}
                                errorMessage={errors.ticketDetails?.message}
                            />

                            <InputField
                                label="Estimated Time (in hrs)"
                                id="estimated-time"
                                name="estimatedTime"
                                disabled={true}
                                register={register}
                                value={tasks[0].estimatedTime}
                                errorMessage={errors.estimatedTime?.message}
                            />

                            <InputField
                                label="Work Type"
                                id="work-type"
                                name="workType"
                                disabled={true}
                                register={register}
                                value={tasks[0].workType}
                                errorMessage={errors.workType?.message}
                            />

                            <CheckBox
                                workType={tasks[0].workType}
                                register={register}
                                errorMessage={errors.checkLists?.message}
                            />

                            <InputField
                                label="PR/WP/Figma Link"
                                id="pr-link"
                                name="prLink"
                                register={register}
                                errorMessage={errors.prLink?.message}
                            />
                        </>
                    )}

                    <div className="flex items-center justify-end mt-6 col-span-full gap-x-6">
                        <button
                            type="submit"
                            id="user-action-submit"
                            className="bg-[#fdb517] font-primary font-medium p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out"
                        >
                            Submit Work
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form

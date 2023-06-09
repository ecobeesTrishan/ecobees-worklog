import { useContext, useState } from "react"
import { addDoc, serverTimestamp, getDocs } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { colRef, projectsColRef } from "src/firebase"
import { getWorkTypes } from "src/utils"
import { InputField, SelectField, CloseModal } from "components/common"
import formSchema from "./formSchema"
import { AuthContext } from "contexts/AuthContext"

const projectsList = []
const getProjects = async () => {
    const projectDocs = await getDocs(projectsColRef)
    const allDocs = projectDocs.docs
    allDocs.map((doc) => {
        projectsList.push({ ...doc.data() })
    })
}
getProjects()

const Form = ({ setOpenModal, setTimerOn }) => {
    const [workType, setWorkType] = useState({})
    const [projectName, setProjectName] = useState({})

    const userContext = useContext(AuthContext)
    const { user } = userContext

    const handleFormSubmit = (data) => {
        addDoc(colRef, {
            projectName: projectName,
            ticketDetails: data.ticketDetails,
            estimatedTime: parseInt(data.estimatedTime),
            workType: workType,
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName,
            createdAt: serverTimestamp(),
            status: "in progress"
        })
        setOpenModal(false)
        setTimerOn(true)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    })

    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 inset-0 bg-opacity-40 ">
            <div className="relative w-[40rem] pb-10 px-10 pt-6 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <CloseModal
                    id="user-action-close-modal"
                    onClick={() => setOpenModal(false)}
                />

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
                >
                    <SelectField
                        label="Project Name"
                        options={projectsList}
                        onChange={(selectedOption) => setProjectName(selectedOption.value)}
                    />

                    <InputField
                        label="Ticket Title / Ticket Link"
                        id="ticket-details"
                        name="ticketDetails"
                        register={register}
                        errorMessage={errors.ticketDetails?.message}
                    />

                    <InputField
                        label="Estimated Time (in hrs)"
                        id="estimated-time"
                        name="estimatedTime"
                        register={register}
                        errorMessage={errors.estimatedTime?.message}
                    />

                    <SelectField
                        label="Work Type"
                        options={getWorkTypes()}
                        onChange={(selectedOption) => setWorkType(selectedOption.value)}
                    />

                    <div className="flex items-center justify-end mt-6 col-span-full gap-x-6">
                        <button
                            type="submit"
                            id="user-action-submit"
                            className="bg-[#fdb517] font-primary font-medium p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out"
                        >
                            Start Work
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form

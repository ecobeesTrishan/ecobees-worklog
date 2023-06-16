import { useContext, useState } from "react"
import { addDoc, serverTimestamp } from "firebase/firestore"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { colRef } from "src/firebase"
import { AuthContext } from "contexts/AuthContext"
import { InputField, SelectField, CloseModal } from "components/common"
import { getProjects, getTypes } from "src/utils"
import formSchema from "./formSchema"

const projects = getProjects()
const types = getTypes()

const Form = ({ setOpenModal, setTimerOn }) => {
    const [projectName, setProjectName] = useState(projects[0].value)
    const [workType, setWorkType] = useState(types[0].value)

    const userContext = useContext(AuthContext)
    const { user } = userContext

    const handleFormSubmit = (data) => {
        addDoc(colRef, {
            project: projectName,
            ticket: data.ticketDetails,
            estimation: `${parseInt(data.estimatedTime)} hours`,
            type: workType,
            user: {
                name: user.displayName,
                email: user.email,
                id: user.uid
            },
            createdAt: serverTimestamp(),
            status: "in progress",
            logs: []
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
                        options={projects}
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
                        options={types}
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

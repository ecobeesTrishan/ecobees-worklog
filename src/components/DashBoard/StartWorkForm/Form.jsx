import InputField from "./InputField"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import formSchema from "./formSchema"

const Form = ({ setOpenModal, setTimerOn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    })

    const handleFormSubmit = (data) => {
        console.log(data)
        setOpenModal(false)
        setTimerOn(true)
    }

    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-40 inset-0 bg-transparent">
            <div className="relative w-[40rem] p-10 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <button type="button" onClick={() => setOpenModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-0 mr-8 cursor-pointer w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <InputField
                        label="Project Name"
                        id="project-name"
                        name="projectName"
                        register={register}
                        errorMessage={errors.projectName?.message}
                    />

                    <InputField
                        label="Ticket / Issue Title"
                        id="ticket-title"
                        name="ticketTitle"
                        register={register}
                        errorMessage={errors.ticketTitle?.message}
                    />

                    <InputField
                        label="Ticket / Issue Link"
                        id="ticket-link"
                        name="ticketLink"
                        register={register}
                        errorMessage={errors.ticketLink?.message}
                    />

                    <InputField
                        label="Estimated Time (in hrs)"
                        id="estimated-time"
                        name="estimatedTime"
                        register={register}
                        errorMessage={errors.estimatedTime?.message}
                    />

                    <div className="sm:col-span-3">
                        <label htmlFor="work-type" className="inline text-sm font-semibold leading-6 text-gray-900 bold">
                            *Work Type
                        </label>

                        <div className="mt-2">
                            <select
                                id="work-type"
                                {...register("workType")}
                                className="block w-full p-2 text-gray-900 bg-transparent border-0 rounded-md shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value="frontend">Front End</option>
                                <option value="backend">Back End</option>
                                <option value="figma">Figma</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-6 col-span-full gap-x-6">
                        <button
                            type="submit"
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

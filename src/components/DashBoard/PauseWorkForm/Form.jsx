import { SelectField, CloseModal } from "components/common"
import { getPauseReasons, getPauseDurations } from "src/utils"

const Form = ({ setOpenPauseModal, setIsRunning }) => {
    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 inset-0 bg-opacity-40 ">
            <div className="relative w-[40rem] pb-10 px-10 pt-6 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <CloseModal
                    id="user-action-close-pause-modal"
                    onClick={() => setOpenPauseModal(false)}
                />

                <form
                    onSubmit={() => setIsRunning(false)}
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
                >

                    <SelectField
                        label="Pause reason"
                        options={getPauseReasons()}
                    />

                    <SelectField
                        label="Will resume on"
                        options={getPauseDurations()}
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

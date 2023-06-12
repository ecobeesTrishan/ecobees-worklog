import { getCheckLists } from "src/utils"

const CheckBox = ({ workType, register, errorMessage }) => {
    return (
        <div className="flex flex-col gap-2 col-span-full">
            <p className="text-xl font-bold capitalize">{workType} Checklist</p>

            {getCheckLists(workType).map((checklist) => {
                const { name, value, id } = checklist
                return (
                    <div className="flex items-center gap-2" key={id}>
                        <div>
                            <input
                                type="checkbox"
                                id={id}
                                className="w-full capitalize accent-[#fdb517] rounded cursor-pointer focus:ring-[#fdb517]"
                                {...register(name)}
                            />
                        </div>

                        <label
                            htmlFor={id}
                            className="inline text-sm font-semibold leading-6 text-gray-900 bold"
                        >
                            {value}
                        </label>
                    </div>
                )
            })}

            {errorMessage &&
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errorMessage}
                </p>
            }

            <p className="invisible mt-2 text-sm text-red-600 peer-invalid:visible">
                All checklists must be checked
            </p>
        </div>
    )
}

export default CheckBox

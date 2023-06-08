const InputField = ({ label, id, register, errorMessage, name }) => {
    return (
        <div className="sm:col-span-3">
            <label htmlFor={id} className="inline text-sm font-semibold leading-6 text-gray-900 bold">
                *{label}
            </label>
            <div className="mt-2">
                <input
                    type="text"
                    id={id}
                    className="block w-full rounded-[4px] border-0 py-[19px] h-9 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#2684FF] sm:text-sm sm:leading-6"
                    {...register(name)}
                />
                {errorMessage &&
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errorMessage}
                    </p>
                }
            </div>
        </div>
    )
}

export default InputField

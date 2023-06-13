import Select from 'react-select'

const SelectField = ({ label, options, onChange }) => {
    return (
        <div className="sm:col-span-3">
            <label
                className="inline text-sm font-semibold leading-6 text-gray-900 bold"
            >
                *{label}
            </label>

            <Select
                className="mt-2 rounded-md basic-single"
                classNamePrefix="select"
                defaultValue={options[0]}
                isSearchable={true}
                options={options}
                onChange={onChange}
            />
        </div>
    )
}

export default SelectField

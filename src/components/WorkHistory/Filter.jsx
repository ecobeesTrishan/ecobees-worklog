import PropTypes from "prop-types";
import Select from "react-select";

const defaultProject = {
    label: "All Projects",
    value: "all"
};

const Filter = ({ setTasks, rawTasks, projectsList }) => {
    const handleChange = (selectedOption) => {
        const filteredTasks = rawTasks.filter((task) => {
            return task.project === selectedOption.value;
        });
        setTasks(filteredTasks);

        if (selectedOption.value === "all") {
            setTasks(rawTasks);
        }
    };

    return (
        <div className="mt-10 sm:w-96">
            <label
                className="inline text-xl font-semibold leading-6 text-gray-900 bold"
            >
                Filter by projects
            </label>

            <Select
                className="mt-2 rounded-md basic-single"
                classNamePrefix="select"
                isSearchable={true}
                options={projectsList}
                defaultValue={defaultProject}
                onChange={handleChange}
            />
        </div>
    );
};

export default Filter;

Filter.propTypes = {
    setTasks: PropTypes.func,
    rawTasks: PropTypes.array,
    projectsList: PropTypes.array
};
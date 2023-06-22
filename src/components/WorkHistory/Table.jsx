import PropTypes from "prop-types";
import moment from "moment";

const Table = ({ tasks }) => {
    return (
        <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Date
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Project
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Task
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Time Spent
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Time Worked
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Type
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        PR Link
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {tasks.length > 0
                                    ?
                                    tasks.map((task) => {
                                        const { startedAt } = task;
                                        const date = moment(startedAt).format("LL");

                                        return (
                                            <tr key={task.id}>
                                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                                    {date}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {task.project}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {task.ticket}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {task.hoursSpent}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                    {task.hoursWorked}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-gray-900 capitalize whitespace-nowrap">
                                                    {task.type}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-indigo-600 cursor-pointer whitespace-nowrap hover:text-indigo-900 hover:underline">
                                                    <a href={task.prLink} target="_blank" rel="noreferrer">
                                                        {task.prLink}
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    :
                                    <tr>
                                        <td align="center" className="p-6 opacity-70" colSpan={"6"}>
                                            No any Work History
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;

Table.propTypes = {
    tasks: PropTypes.array
};
import { useContext, useState, useEffect } from "react"
import { getDocs, query, where } from "firebase/firestore"
import Select from 'react-select'
import moment from "moment"
import { colRef, projectsColRef } from "src/firebase"
import { AuthContext } from "contexts"

const defaultProject = {
    label: "All Projects",
    value: "all"
}

const WorkHistory = () => {
    const [projectsList, setProjectsList] = useState([])
    const [tasks, setTasks] = useState([])
    const [rawTasks, setRawTasks] = useState([])
    const userContext = useContext(AuthContext)
    const { user } = userContext

    useEffect(() => {
        const getProjects = async () => {
            const projectDocs = await getDocs(projectsColRef)
            const allDocs = projectDocs.docs
            const newProjectsList = [
                {
                    label: "All Projects",
                    value: "all"
                }
            ]
            allDocs.forEach((doc) => {
                newProjectsList.push({ ...doc.data() })
            })
            setProjectsList(newProjectsList)
        }
        getProjects()
    }, [])

    useEffect(() => {
        const getTasks = async () => {
            if (user?.displayName) {
                const firebaseQuery = query(colRef, where("user.id", "==", user.uid), where("status", "==", "completed"))
                const snapshot = await getDocs(firebaseQuery)
                const allDocs = snapshot.docs
                const tasksArr = []
                allDocs.forEach((doc) => {
                    tasksArr.push({ ...doc.data(), id: doc.id })
                })
                setTasks(tasksArr)
                setRawTasks(tasksArr)
            }
        }
        getTasks()
    }, [user])

    const handleChange = (selectedOption) => {
        const filteredTasks = rawTasks.filter((task) => {
            return task.project === selectedOption.value
        })
        setTasks(filteredTasks)

        if (selectedOption.value === "all") {
            setTasks(rawTasks)
        }
    }

    return (
        <div className="px-4 m-6 sm:px-6 lg:px-8 font-primary">
            <div className="sm:flex sm:items-center">
                <div className="mt-6 sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900 ">
                        Work History
                    </h1>
                </div>
            </div>

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
                                            Hours Billed
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
                                            const { startedAt } = task
                                            const date = moment(startedAt).format("LL")

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
                                                        {task.hoursBilled}
                                                    </td>

                                                    <td className="px-3 py-4 text-sm text-gray-900 capitalize whitespace-nowrap">
                                                        {task.type}
                                                    </td>

                                                    <td className="px-3 py-4 text-sm text-indigo-600 cursor-pointer whitespace-nowrap hover:text-indigo-900 hover:underline">
                                                        <a href={task.prLink} target="_blank">
                                                            {task.prLink}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
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
        </div>
    )
}

export default WorkHistory
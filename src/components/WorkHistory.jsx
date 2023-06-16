import { useContext, useState } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { AuthContext } from "contexts"
import { colRef } from "src/firebase"

export default function WorkHistory() {
    const userContext = useContext(AuthContext)
    const { user } = userContext

    const [tasks, setTasks] = useState([])
    const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "==", "completed"))
    const getTasks = async () => {
        const snapshot = await getDocs(firebaseQuery)
        const allDocs = snapshot.docs
        const tasksArr = []
        allDocs.map((doc) => {
            tasksArr.push({ ...doc.data(), id: doc.id })
            setTasks(tasksArr)
        })
    }
    user?.displayName && getTasks()

    return (
        <div className="px-4 m-6 sm:px-6 lg:px-8 font-primary">
            <div className="sm:flex sm:items-center">
                <div className="mt-6 sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900 ">Work History</h1>
                </div>
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
                                            Hrs Billed
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Task
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Type
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            PR Link
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Project
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                                {task.startedAt}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{task.hoursBilled}</td>
                                            <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{task.ticket}</td>
                                            <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{task.type}</td>
                                            <td className="px-3 py-4 text-sm text-indigo-600 cursor-pointer whitespace-nowrap hover:text-indigo-900 hover:underline">{task.prLink}</td>
                                            <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">{task.project}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
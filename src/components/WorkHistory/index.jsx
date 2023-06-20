import { useContext, useState, useEffect } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { colRef, projectsColRef } from "src/firebase"
import { AuthContext } from "contexts"
import Table from "./Table"
import Filter from "./Filter"

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

    return (
        <div className="px-4 m-6 sm:px-6 lg:px-8 font-primary">
            <div className="sm:flex sm:items-center">
                <div className="mt-6 sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900 ">
                        Work History
                    </h1>
                </div>
            </div>

            <Filter
                setTasks={setTasks}
                rawTasks={rawTasks}
                projectsList={projectsList}
            />

            <Table
                tasks={tasks}
            />
        </div>
    )
}

export default WorkHistory
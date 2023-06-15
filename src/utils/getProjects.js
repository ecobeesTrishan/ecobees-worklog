import { getDocs } from "firebase/firestore"
import { projectsColRef } from "src/firebase"

const projectsList = []
const getProjects = () => {
    getDocs(projectsColRef)
        .then((projectDocs) => {
            const allDocs = projectDocs.docs
            allDocs.map((doc) => {
                projectsList.push({ ...doc.data() })
            })
        })
    return projectsList
}

export default getProjects
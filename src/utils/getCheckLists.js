import { getDocs } from "firebase/firestore"
import { frontendCheckListsRef, backendCheckListsRef, figmaCheckListsRef, wordpressCheckListsRef } from "src/firebase"

const TYPES = {
    fe: "frontend",
    be: "backend",
    fi: "figma",
    wp: "wordpress"
}

const frontendCheckLists = []
const getFrontendCheckLists = () => {
    getDocs(frontendCheckListsRef)
        .then((checklistsDocs) => {
            const allDocs = checklistsDocs.docs
            allDocs.map((doc) => {
                frontendCheckLists.push({ ...doc.data() })
            })
        })
}
getFrontendCheckLists()


const backendCheckLists = []
const getBackendCheckLists = () => {
    getDocs(backendCheckListsRef)
        .then((checklistsDocs) => {
            const allDocs = checklistsDocs.docs
            allDocs.map((doc) => {
                backendCheckLists.push({ ...doc.data() })
            })
        })
}
getBackendCheckLists()


const figmaCheckLists = []
const getFigmaCheckLists = () => {
    getDocs(figmaCheckListsRef)
        .then((checklistsDocs) => {
            const allDocs = checklistsDocs.docs
            allDocs.map((doc) => {
                figmaCheckLists.push({ ...doc.data() })
            })
        })
}
getFigmaCheckLists()


const wordpressCheckLists = []
const getWordpressCheckLists = () => {
    getDocs(wordpressCheckListsRef)
        .then((checklistsDocs) => {
            const allDocs = checklistsDocs.docs
            allDocs.map((doc) => {
                wordpressCheckLists.push({ ...doc.data() })
            })
        })
}
getWordpressCheckLists()


const getCheckLists = (workType) => {
    if (workType === TYPES.fe) {
        return frontendCheckLists
    }
    if (workType === TYPES.be) {
        return backendCheckLists
    }
    if (workType === TYPES.fi) {
        return figmaCheckLists
    }
    if (workType === TYPES.wp) {
        return wordpressCheckLists
    }
}

export default getCheckLists
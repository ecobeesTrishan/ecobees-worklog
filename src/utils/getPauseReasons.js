import { getDocs } from "firebase/firestore"
import { pauseReasonsRef } from "src/firebase"

const pauseReasons = []
const getPauseReasons = () => {
    getDocs(pauseReasonsRef)
        .then((pauseReasonsDocs) => {
            const allDocs = pauseReasonsDocs.docs
            allDocs.map((doc) => {
                pauseReasons.push({ ...doc.data() })
            })
        })
    return pauseReasons
}

export default getPauseReasons
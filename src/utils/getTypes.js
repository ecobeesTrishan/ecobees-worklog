import { getDocs } from "firebase/firestore";
import { typesRef } from "src/firebase";

const types = [];
const getTypes = () => {
    getDocs(typesRef)
        .then((typesDocs) => {
            const allDocs = typesDocs.docs;
            allDocs.map((doc) => {
                types.push({
                    ...doc.data()
                });
            });
        });
    return types;
};

export default getTypes;
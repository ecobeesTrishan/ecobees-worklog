import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "contexts"

const Protected = ({ children }) => {
    const userContext = useContext(AuthContext)
    const { user } = userContext

    if (!user) {
        return <Navigate to="/signin" />
    }

    return children
}

export default Protected

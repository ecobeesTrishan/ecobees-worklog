import React, { useContext } from "react"
import { AuthContext } from "src/contexts/AuthContext"

const Info = () => {
    const userContext = useContext(AuthContext)
    const { user, logOut } = userContext

    const handleLogOut = async () => {
        try {
            await logOut()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center font-primary">
            <h1 className="pt-8 text-3xl font-bold text-center font-primary">Welcome {user.displayName}</h1>
            <p className="py-6">{user.email}</p>

            <button
                id="user-action-log-out"
                type="button"
                onClick={handleLogOut}
                className="bg-[#fdb517] p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out"
            >
                Log Out
            </button>
        </div>
    )
}

export default Info

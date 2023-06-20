import { useContext, useState } from "react"
import { AuthContext } from "contexts"
import Menus from "./Menus"
import NavBar from "./NavBar"

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const userContext = useContext(AuthContext)
    const { user, logOut } = userContext

    const handleLogOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="inset-x-0 top-0 z-50 ">
            <NavBar
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <Menus
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                user={user}
                handleLogOut={handleLogOut}
            />
        </header>
    )
}

export default Header
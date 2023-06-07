import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "contexts/AuthContext"

const NavBar = () => {
    const userContext = useContext(AuthContext)
    const { user } = userContext

    return (
        <nav className="flex items-center justify-between p-6 bg-white shadow font-primary">
            <Link to="/">
                <img
                    className="transition ease-in-out cursor-pointer w-14 hover:scale-105"
                    src="/logo.svg"
                    alt="ecoBees Logo"
                />
            </Link>

            <h1 className="text-2xl font-bold text-center">
                <span className="text-[#fdb517]">
                    e
                </span>
                coB
                <span className="text-[#fdb517]">
                    ee
                </span>
                s
            </h1>

            <ul className="flex items-center gap-6 font-bold">
                {user?.displayName
                    ?
                    <Link to="/info">
                        <li className="cursor-pointer hover:underline">
                            Dashboard
                        </li>
                    </Link>

                    :
                    <Link to="/signin">
                        <li className="cursor-pointer hover:underline">
                            Sign in
                        </li>
                    </Link>
                }
            </ul>
        </nav>
    )
}

export default NavBar

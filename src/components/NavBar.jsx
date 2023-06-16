import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "contexts/AuthContext"
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
    const userContext = useContext(AuthContext)
    const { user, logOut } = userContext

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogOut = async () => {
        try {
            await logOut()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="inset-x-0 top-0 z-50 ">
            <nav
                className="flex items-center justify-between p-6 bg-white shadow font-primary"
            >
                <div className="flex justify-between w-full">
                    <Link to="/">
                        <img
                            className="transition ease-in-out cursor-pointer w-14 hover:scale-105"
                            src="/logo.svg"
                            alt="ecoBees Logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon
                            className="w-6 h-6 hover:bg-[#f5f5f5] rounded-md"
                        />
                    </button>
                </div>
            </nav>

            <Dialog
                as="div"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50" />

                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full max-w-xs px-6 py-6 overflow-y-auto transition ease-in-out bg-white shadow-xl sm:ring-1 sm:ring-white/10"
                >
                    <div className="relative flex items-center justify-between">
                        <a href={"/"} className="-m-1.5 p-1.5 flex items-center gap-4">
                            <p className="mt-6 text-2xl font-bold text-black font-primary">
                                Menus
                            </p>
                        </a>

                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <XMarkIcon
                                className="w-6 h-6 mt-5 hover:bg-[#f5f5f5] rounded-md"
                            />
                        </button>
                    </div>

                    <div className="flow-root mt-6">
                        <div className="-my-6 divide-y divide-gray-500/25">
                            <ul className="py-6 mt-6 space-y-4">
                                {user?.displayName
                                    ?
                                    <div className="flex flex-col space-y-4">
                                        <Link to="/">
                                            <li
                                                className="block px-3 py-2 -mx-3 font-primary bg-[#f5f5f5] text-base font-semibold leading-7 text-black rounded-lg hover:bg-[#c7c6c6] transition ease-in-out"
                                            >
                                                Start Work
                                            </li>
                                        </Link>

                                        <Link to="/">
                                            <li
                                                href={"/"}
                                                className="block px-3 py-2 -mx-3 font-primary bg-[#f5f5f5] text-base font-semibold leading-7 text-black rounded-lg hover:bg-[#c7c6c6] transition ease-in-out"
                                            >
                                                Work History
                                            </li>
                                        </Link>
                                    </div>

                                    :
                                    <li
                                        className="block cursor-pointer px-3 py-2 -mx-3 font-primary bg-[#f5f5f5] text-base font-semibold leading-7 text-black rounded-lg hover:bg-[#c7c6c6] transition ease-in-out"
                                    >
                                        Sign in
                                    </li>
                                }
                            </ul>

                            <button
                                id="user-action-log-out"
                                type="button"
                                onClick={handleLogOut}
                                className="absolute bottom-0 right-0 p-2 px-4 m-6 font-bold text-white transition ease-in-out rounded-md cursor-pointer bg-rose-600 hover:bg-rose-700 font-primary"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default NavBar

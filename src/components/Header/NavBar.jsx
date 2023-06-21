import PropTypes from "prop-types";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NavBar = ({ setMobileMenuOpen }) => {
    return (
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
    );
};

export default NavBar;

NavBar.propTypes = {
    setMobileMenuOpen: PropTypes.func
};
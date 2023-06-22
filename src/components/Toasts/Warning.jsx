import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useState } from "react";

const Warning = ({ message }) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className={`absolute right-0 top-[-30px] p-4 rounded-md rounded-b-md border-l-4 border-l-yellow-600 bg-yellow-50 font-primary animate-slide-in font-bold ${isHidden ? "hidden" : null}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                        className="w-5 h-5 text-yellow-400"
                    />
                </div>

                <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-800">
                        {message}
                    </p>
                </div>

                <div className="pl-3 ml-auto">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={() => setIsHidden(true)}
                            type="button"
                            className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                        >
                            <XMarkIcon
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warning;

Warning.propTypes = {
    message: PropTypes.string
};
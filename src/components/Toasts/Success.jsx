import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useState } from "react";

const Success = ({ message }) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className={`fixed right-0 top-[85px] p-4 rounded-md rounded-b-md border-l-4 border-l-green-600 bg-green-50 font-primary animate-slide-in font-bold ${isHidden ? "hidden" : null}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon
                        className="w-5 h-5 text-green-400"
                    />
                </div>

                <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                        {message}
                    </p>
                </div>

                <div className="pl-3 ml-auto">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            onClick={() => setIsHidden(true)}
                            type="button"
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
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

export default Success;

Success.propTypes = {
    message: PropTypes.string
};
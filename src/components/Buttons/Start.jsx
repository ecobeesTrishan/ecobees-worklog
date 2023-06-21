import PropTypes from "prop-types";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

const Start = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <button
                type="button"
                id="user-action-start"
                onClick={onClick}
            >
                <RocketLaunchIcon
                    className="w-20 p-4 transition ease-in-out rounded-md bg-[#fdb517] hover:bg-[#ecae1d]"
                />
            </button>

            <p className="opacity-70">
                Start Work
            </p>
        </div>
    );
};

export default Start;

Start.propTypes = {
    onClick: PropTypes.func
};
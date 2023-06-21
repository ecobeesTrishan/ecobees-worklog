import PropTypes from "prop-types";
import { XCircleIcon } from "@heroicons/react/24/outline";

const CloseModal = ({ id, onClick }) => {
    return (
        <button
            type="button"
            id={id}
            onClick={onClick}
        >
            <XCircleIcon
                className="absolute right-0 mr-8 cursor-pointer w-7"
            />
        </button>
    );
};

export default CloseModal;

CloseModal.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func
};
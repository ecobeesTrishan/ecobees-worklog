import { TrophyIcon } from "@heroicons/react/24/outline"

const Submit = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <button
                type="button"
                id="user-action-submit-work"
                onClick={onClick}
            >
                <TrophyIcon
                    className="w-20 p-4 transition ease-in-out rounded-md bg-[#fdb517] hover:bg-[#ecae1d]"
                />
            </button>

            <p className="opacity-70">
                Submit Work
            </p>
        </div>
    )
}

export default Submit
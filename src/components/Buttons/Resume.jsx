import { PlayIcon } from "@heroicons/react/24/outline"

const Resume = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <button
                type="button"
                id="user-action-resume"
                onClick={onClick}
            >
                <PlayIcon
                    className="w-20 p-4 transition ease-in-out rounded-md bg-slate-300 hover:bg-slate-200"
                />
            </button>

            <p className="opacity-70">
                Resume Work
            </p>
        </div>
    )
}

export default Resume
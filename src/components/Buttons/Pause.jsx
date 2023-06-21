import { PauseIcon } from "@heroicons/react/24/outline"

const Pause = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <button
                type="button"
                id="user-action-pause"
                onClick={onClick}
            >
                <PauseIcon
                    className="w-20 p-4 transition ease-in-out rounded-md bg-slate-300 hover:bg-slate-200"
                />
            </button>

            <p className="opacity-70">
                Pause Work
            </p>
        </div>
    )
}

export default Pause
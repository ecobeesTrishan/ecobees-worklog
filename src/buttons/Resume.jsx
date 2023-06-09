const Resume = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <button
                type="button"
                id="user-action-resume"
                onClick={onClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-20 p-4 transition ease-in-out rounded-md bg-slate-300 hover:bg-slate-200"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                </svg>
            </button>

            <p className="opacity-70">
                Resume Work
            </p>
        </div>
    )
}

export default Resume

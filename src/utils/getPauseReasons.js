const getPauseReasons = () => {
    const pauseReasons = [
        { label: "Tiffin Break", value: "tiffin" },
        { label: "Rest", value: "rest" },
        { label: "End of the Day", value: "eod" },
        { label: "Blockers", value: "blockers" },
        { label: "Refreshment", value: "Refreshment" },
    ]
    return pauseReasons
}

export default getPauseReasons
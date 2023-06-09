const getPauseDurations = () => {
    const pauseDuration = [
        { label: "40 minutes", value: "30min" },
        { label: "20 minutes", value: "20min" },
        { label: "10 minutes", value: "10min" },
        { label: "Next Day", value: "nextDay" },
    ]
    return pauseDuration
}

export default getPauseDurations
import { useState, useEffect } from "react"
import { Pause, Resume, Start } from "src/buttons"
import { Form } from "./StartWorkForm"

const StopWatch = () => {
    const [time, setTime] = useState(0)
    const [timerOn, setTimerOn] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        let interval = null

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else if (!timerOn) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timerOn])

    return (
        <div className="relative flex flex-col items-center justify-center gap-6 my-10 font-primary">
            <h2 className="opacity-50">
                Total Hours Billed
            </h2>

            <div className="flex text-5xl bold">
                <span>
                    {("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:
                </span>

                <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>

                <span>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
            </div>

            <div className="flex items-center justify-center gap-10">
                {!timerOn && time === 0 && <Start onClick={() => setOpenModal(true)} />}

                {timerOn && <Pause onClick={() => setTimerOn(false)} />}

                {!timerOn && time > 0 && <Resume onClick={() => setTimerOn(true)} />}
            </div>

            {openModal && <Form setOpenModal={setOpenModal} setTimerOn={setTimerOn} />}
        </div>
    )
}

export default StopWatch
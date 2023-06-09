import { useState, useEffect } from "react"
import { Pause, Resume, Start, Submit } from "src/buttons"
import { Form } from "./StartWorkForm"
import { PauseForm } from "./PauseWorkForm"
import { db } from "src/firebase"
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

const stopwatchDocRef = doc(collection(db, 'stopwatche'), 'stopwatchTime');
const submittedStopWatchDocRef = doc(collection(db, 'stopwatchSaved'), 'stopwatchTime');

const StopWatch = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [, setStartTime] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [openPauseModal, setOpenPauseModal] = useState(false)

    useEffect(() => {
        const savedTimer = localStorage.getItem('stopwatchTimer');
        if (savedTimer) {
            setTimer(parseInt(savedTimer));
        }

        const unsubscribe = onSnapshot(stopwatchDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setTimer(docSnapshot.data().timer);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isRunning]);

    const handleStart = () => {
        setOpenModal(true)
    };

    const setTimerOn = () => {
        if (!isRunning) {
            setIsRunning(true);
            setStartTime(Date.now() - timer * 1000);
        }
    }

    const handlePause = () => {
        setOpenPauseModal(true)
    };

    const handleResume = () => {
        setIsRunning(true);
        setStartTime(Date.now() - timer * 1000);
    };

    const handleReset = () => {
        setTimer(0);
        setIsRunning(false);
        setStartTime(0);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        setDoc(submittedStopWatchDocRef, { timer })
        handleReset()
    };

    useEffect(() => {
        localStorage.setItem('stopwatchTimer', timer.toString());
        setDoc(stopwatchDocRef, { timer });
    }, [timer]);


    return (
        <div className="relative flex flex-col items-center justify-center gap-6 my-10 font-primary">
            <h2 className="opacity-50">
                Total Hours Billed
            </h2>

            <div className="flex text-5xl bold">
                <span>
                    {formatTime(timer)}
                </span>
            </div>

            <div className="flex items-center justify-center gap-10">
                {!isRunning && timer === 0 && <Start onClick={handleStart} />}

                {isRunning && <Pause onClick={handlePause} />}

                {!isRunning && timer > 0 && <Submit onClick={handleSubmit} />}

                {!isRunning && timer > 0 && <Resume onClick={handleResume} />}
            </div>

            {openModal && <Form setOpenModal={setOpenModal} setTimerOn={setTimerOn} />}
            {openPauseModal && <PauseForm setOpenPauseModal={setOpenPauseModal} setIsRunning={setIsRunning} />}
        </div>
    )
}

export default StopWatch
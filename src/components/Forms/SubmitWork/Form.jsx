import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { db, colRef } from "src/firebase";
import formSchema from "./formSchema";
import { InputField, CheckBox, CloseModal } from "components/Common";
import { AuthContext } from "contexts";

const Form = ({ setOpenSubmitModal, handleFormSubmit }) => {
    const [tasks, setTasks] = useState([]);

    const userContext = useContext(AuthContext);
    const { user } = userContext;

    const firebaseQuery = user?.displayName && query(colRef, where("user.id", "==", user.uid), where("status", "!=", "completed"));
    const getTasks = async () => {
        const snapshot = await getDocs(firebaseQuery);
        const allDocs = snapshot.docs;
        const tasksArr = [];
        allDocs.map((doc) => {
            tasksArr.push({
                ...doc.data(), id: doc.id
            });
            setTasks(tasksArr);
        });
    };
    user?.displayName && getTasks();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const submitForm = (data) => {
        handleFormSubmit();
        setOpenSubmitModal(false);
        const docRef = doc(db, "tasks", tasks[0]?.id);

        getDoc(docRef)
            .then((doc) => {
                const hoursBilled = [];
                hoursBilled.push(doc.data());

                const taskStartedDate = moment((tasks[0].createdAt).toDate()).format("LLL");
                const taskSubmittedDate = moment().format("LLL");

                const totalHoursSpent = moment(taskSubmittedDate).diff(moment(taskStartedDate), "hours", "minutes", "seconds");
                const totalMinutesSpent = moment(taskSubmittedDate).diff(moment(taskStartedDate), "minutes");

                const totalSecondsWorked = hoursBilled[0].savedTimer;
                const totalHoursWorked = totalSecondsWorked / 3600;
                const totalMinutesWorked = totalHoursWorked * 60;

                const hoursDifference = totalMinutesSpent - totalMinutesWorked;

                let pauseTime = 0;
                if (hoursDifference >= 0) {
                    pauseTime = hoursDifference;
                }

                let totalTimeWorked;
                if (totalHoursWorked < 1) {
                    totalTimeWorked = `${Math.round(totalMinutesWorked)} minutes`;
                }
                if (totalHoursWorked >= 1) {
                    totalTimeWorked = `${Math.round(totalHoursWorked)} hours`;
                }

                let totalTimeSpent;
                if (totalHoursSpent < 1) {
                    totalTimeSpent = `${Math.round(totalMinutesSpent)} minutes`;
                }
                if (totalHoursSpent >= 1) {
                    totalTimeSpent = `${Math.round(totalHoursSpent)} hours`;
                }

                updateDoc(docRef, {
                    status: "completed",
                    prLink: data.prLink,
                    startedAt: taskStartedDate,
                    submittedAt: taskSubmittedDate,
                    hoursWorked: totalTimeWorked,
                    hoursSpent: totalTimeSpent,
                    totalPause: `${Math.round(pauseTime)} minutes`
                });
            });
    };

    return (
        <div className="fixed z-50 flex items-center w-[100vw] h-[100vh] justify-center overflow-x-hidden overflow-y-auto bg-gray-500 inset-0 bg-opacity-40 ">
            <div className="relative w-[40rem] pb-10 px-10 pt-6 rounded-md shadow-2xl m-auto bg-white border-gray-900/10 font-primary">
                <CloseModal
                    id="user-action-close-pause-modal"
                    onClick={() => setOpenSubmitModal(false)}
                />

                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6"
                >

                    {tasks.length > 0 && (
                        <>
                            <InputField
                                label="Project Name"
                                id="project-name"
                                name="projectName"
                                disabled={true}
                                register={register}
                                value={tasks[0].project}
                                errorMessage={errors.projectName?.message}
                            />

                            <InputField
                                label="Ticket Title / Ticket Link"
                                id="ticket-details"
                                name="ticketDetails"
                                disabled={true}
                                register={register}
                                value={tasks[0].ticket}
                                errorMessage={errors.ticketDetails?.message}
                            />

                            <InputField
                                label="Estimated Time (in hrs)"
                                id="estimated-time"
                                name="estimatedTime"
                                disabled={true}
                                register={register}
                                value={tasks[0].estimation}
                                errorMessage={errors.estimatedTime?.message}
                            />

                            <InputField
                                label="Work Type"
                                id="work-type"
                                name="workType"
                                disabled={true}
                                register={register}
                                value={tasks[0].type}
                                errorMessage={errors.workType?.message}
                            />

                            <CheckBox
                                workType={tasks[0].type}
                                register={register}
                                errorMessage={errors.checkLists?.message}
                            />

                            <InputField
                                label="PR/WP/Figma Link"
                                id="pr-link"
                                name="prLink"
                                register={register}
                                errorMessage={errors.prLink?.message}
                            />
                        </>
                    )}

                    <div className="flex items-center justify-end mt-6 col-span-full gap-x-6">
                        <button
                            type="submit"
                            id="user-action-submit"
                            className="bg-[#fdb517] font-primary font-medium p-2 px-4 rounded-md cursor-pointer hover:bg-[#ecae1d] transition ease-in-out"
                        >
                            Submit Work
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;

Form.propTypes = {
    setOpenSubmitModal: PropTypes.func,
    handleFormSubmit: PropTypes.func
};
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db, colRef } from "src/firebase";
import formSchema from "./formSchema";
import { InputField, CheckBox, CloseModal } from "components/Common";
import { AuthContext } from "contexts";
import spinnerImage from "../../../assets/load.gif";

const Form = ({ setOpenSubmitModal, handleFormSubmit }) => {
    const [tasks, setTasks] = useState([]);

    const userContext = useContext(AuthContext);
    const { user } = userContext;

    useEffect(() => {
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
    }, [user?.displayName]);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            prLinks: [{
                link: ""
            }]
        },
        resolver: yupResolver(formSchema)
    });

    const { fields, append, remove } = useFieldArray({
        name: "prLinks",
        control,
        rules: {
            required: "Please add at least 1 PR/WP/Figma Link"
        }
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

                let totalPause;
                if (pauseTime >= 60) {
                    totalPause = `${(pauseTime / 60).toFixed(2)} hours`;
                }
                if (pauseTime < 60) {
                    totalPause = `${pauseTime.toFixed(2)} minutes`;
                }

                let totalTimeWorked;
                if (totalHoursWorked < 1) {
                    totalTimeWorked = `${totalMinutesWorked.toFixed(2)} minutes`;
                }
                if (totalHoursWorked >= 1) {
                    totalTimeWorked = `${totalHoursWorked.toFixed(2)} hours`;
                }

                let totalTimeSpent;
                if (totalHoursSpent < 1) {
                    totalTimeSpent = `${totalMinutesSpent.toFixed(2)} minutes`;
                }
                if (totalHoursSpent >= 1) {
                    totalTimeSpent = `${totalHoursSpent.toFixed(2)} hours`;
                }

                updateDoc(docRef, {
                    status: "completed",
                    prLinks: data.prLinks,
                    startedAt: taskStartedDate,
                    submittedAt: taskSubmittedDate,
                    hoursWorked: totalTimeWorked,
                    hoursSpent: totalTimeSpent,
                    totalPause: totalPause,
                    hoursWorkedForExcel: `${totalHoursWorked.toFixed(2)}`
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
                    className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8"
                >

                    {tasks.length > 0 ? (
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

                            {fields.length > 0 && fields.map((field, index) => (
                                <div key={field.id}>
                                    <InputField
                                        label={`PR/WP/Figma Link ${index + 1}`}
                                        id="pr-link"
                                        name={`prLinks.${index}.link`}
                                        register={register}
                                        errorMessage={errors.prLinks?.root?.message}
                                        required={true}
                                    />

                                    {index > 0 &&
                                        <button onClick={() => remove(index)} type="button" className="px-6 my-4 w-full py-2 bg-[#f5f5f5] rounded-sm flex items-center justify-center gap-3">
                                            <TrashIcon className="w-4" />

                                            <p>
                                                Remove Link
                                            </p>
                                        </button>
                                    }
                                </div>
                            ))}

                            <button onClick={() => append({
                                link: ""
                            })} type="button" className="px-6 py-2 bg-[#f5f5f5] rounded-sm flex items-center justify-center gap-3">
                                <PlusIcon className="w-4" />

                                <p>
                                    Add more Links
                                </p>
                            </button>
                        </>
                    )
                        : (
                            <div className="flex items-center justify-center">
                                <img src={spinnerImage} alt="Loading" className="mt-16" />
                            </div>
                        )
                    }

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
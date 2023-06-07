import * as yup from "yup"

const formSchema = yup.object().shape({
    projectName: yup
        .string()
        .required("Project Name is required")
        .min(3, "Project Name can't be less than 3 characters"),
    ticketTitle: yup
        .string()
        .required("Ticket / Issue Title is Required")
        .min(3, "Ticket / Issue Title can't be less than 3 characters"),
    ticketLink: yup
        .string()
        .required("Ticket / Issue Link is required"),
    estimatedTime: yup
        .string()
        .required("Estimated time is required")
        .matches("^[0-9]", "Estimated Time can't contain any letters or special characters"),
    workType: yup
        .string()
        .required("Work Type is required"),
});

export default formSchema;
import * as yup from "yup";

const formSchema = yup.object().shape({
    ticketDetails: yup
        .string()
        .required("Ticket Title / Ticket Link is required")
        .min(3, "Ticket Title / Ticket Link can't be less than 3 characters"),
    estimatedTime: yup
        .string()
        .required("Estimated time is required")
        .matches("^[0-9]", "Estimated Time can't contain any letters or special characters")
});

export default formSchema;
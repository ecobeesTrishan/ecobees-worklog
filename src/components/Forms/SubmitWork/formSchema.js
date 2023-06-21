import * as yup from "yup";

const formSchema = yup.object().shape({
    projectName: yup
        .string(),
    ticketDetails: yup
        .string(),
    estimatedTime: yup
        .string(),
    workType: yup
        .string(),
    checkLists: yup
        .array()
        .min(6, "All checklists must be checked")
        .required(),
    prLink: yup
        .string()
        .required("PR/WP/Figma link is required")
        .min(5, "PR/WP/Figma link can't be less than 5 characters")
});

export default formSchema;
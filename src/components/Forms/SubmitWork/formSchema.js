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
    prLinks: yup
        .mixed()
});

export default formSchema;
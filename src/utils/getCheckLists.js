const frontendCheckLists = [
    { name: "checkLists", value: "Test all the cases and edge cases of your changes.", id: "1" },
    { name: "checkLists", value: "Breaking changes testing (Test all side effects).", id: "2" },
    { name: "checkLists", value: "Confirm you have not leaked any sensitive information of this project (console logs, responses, env variables etc).", id: "3" },
    { name: "checkLists", value: "Confirm that you are folowing ecoBees code quality standard.", id: "4" },
    { name: "checkLists", value: "Responsive UI across all screen and browser cross compatibility.", id: "5" },
    { name: "checkLists", value: "Multiple browsers functionality/design testing.", id: "6" },
    { name: "checkLists", value: "Double validation of the feature you are working on (BE/FE).", id: "7" },
]

const backendCheckLists = [
    { name: "checkLists", value: "Test all the cases and edge cases of your changes.", id: "1" },
    { name: "checkLists", value: "Breaking changes testing (Test all side effects).", id: "2" },
    { name: "checkLists", value: "Confirm you have not leaked any sensitive information of this project (console logs, responses, env variables etc).", id: "3" },
    { name: "checkLists", value: "Confirm that you are folowing ecoBees code quality standard.", id: "4" },
    { name: "checkLists", value: "Provide proper routes and payload information (eg: query/params/body) to your team.", id: "5" },
    { name: "checkLists", value: "Double validation of the feature you are working on. (BE/FE)", id: "6" },
]

const figmaCheckLists = [
    { name: "checkLists", value: "Have you checked the main flow of the task by going through all the pages?", id: "1" },
    { name: "checkLists", value: "Does the design meet all the task requirements or (client review requirements if any)?", id: "2" },
    { name: "checkLists", value: "Have you tested the prototyping flow by checking all the interactive elements? (if the design requires prototyping)", id: "3" },
    { name: "checkLists", value: `Have you added "Developer notes" or "Client notes" in the design where necessary? (Use sticky notes or comments where suitable)`, id: "4" },
    { name: "checkLists", value: "Does the design follow all the ecoBees Design Standards? (refer to ecoBees design docs)", id: "5" },
    { name: "checkLists", value: `Have you created the "Presentation View" of the design and tested if it works on different screens?`, id: "6" },
    { name: "checkLists", value: `Have you tested the navigation of pages in "Presentation View"? (check arrow navigation)`, id: "7" },
    { name: "checkLists", value: `Have you checked and removed all the external links from the design? (Design must not contain any external link that may compromise the information of ecoBees or the client)`, id: "8" },
    { name: "checkLists", value: `Have you verified all the links access (edit or view) before sharing them to administration or the client? (Client must not get edit access of the design)`, id: "9" },
]

const wordpressCheckLists = [
    { name: "checkLists", value: "Did we backup before and after working on it?", id: "1" },
    { name: "checkLists", value: "Do CTA's and links work properly?", id: "2" },
    { name: "checkLists", value: "Does the form submit and show a success message?", id: "3" },
    { name: "checkLists", value: "Did we use an email template for the form?", id: "4" },
    { name: "checkLists", value: "Checked if we changed or added additional stuff other than the assigned tasks into the site?", id: "5" },
    { name: "checkLists", value: "Are semantic headings and meta tags used properly?", id: "6" },
    { name: "checkLists", value: "Did we use optimized images?", id: "7" },
    { name: "checkLists", value: "Have we maintained all the existing internal links and contents?", id: "8" },
    { name: "checkLists", value: "Checked if the changes affected the SEO score?", id: "9" },
    { name: "checkLists", value: "Checked if any new plugin broke the site or its features?", id: "10" },
    { name: "checkLists", value: "Also, check sitemap.xml. Is it okay?", id: "11" },
    { name: "checkLists", value: "Checked whether the debug mode is on or not?", id: "12" },
    { name: "checkLists", value: "Did we categorize the blog?", id: "13" },
    { name: "checkLists", value: "Is the new blog being rendered properly in list or collection?", id: "14" },
    { name: "checkLists", value: "Is the new page's name being shown in the navigation menu?", id: "15" },
    { name: "checkLists", value: "Checked if we added any custom code, and does it affect the overall site?", id: "16" },
    { name: "checkLists", value: "Asked the client before updating the live site?", id: "17" }
]

const getCheckLists = (workType) => {
    if (workType === "frontend") {
        return frontendCheckLists
    }
    if (workType === "backend") {
        return backendCheckLists
    }
    if (workType === "figma") {
        return figmaCheckLists
    }
    if (workType === "wordpress") {
        return wordpressCheckLists
    }
}

export default getCheckLists
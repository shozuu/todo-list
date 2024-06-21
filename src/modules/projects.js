import { renderProjects } from "./domManipulation";

const projects = {
    Default: {}
};

export const getProjects = () => projects;

export function createProject(projectTitle) {
    if (!projectTitle) return;

    for (const key in projects) {
        if (projects.hasOwnProperty(key) && key.toLowerCase() === projectTitle.toLowerCase()) {
            alert(`${projectTitle} already exists`);
            return;
        }
    }
    projects[projectTitle] = {};
    renderProjects();
}
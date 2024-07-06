import { getTasks } from "./displayTasks";
import { renderProjects } from "./domManipulation";
import { tasks } from "./tasks";

export const projects = ['Default', 'Sample']

export function createProject(projectTitle) {
    if (!projectTitle) return;

    let flag = false;
    projects.forEach(project => {
        if (project.toLowerCase() === projectTitle.toLowerCase()) {
            alert(`${projectTitle} already exists`);
            flag = true;
            return;
        }
    });

    if (flag) return;
    projects.push(projectTitle);
    renderProjects();
}

export function renameProj(oldProjectTitle, newProjectTitle) {
    let indexToRemove;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].toLowerCase() === newProjectTitle.toLowerCase()) {
            alert(`Project ${newProjectTitle} already exists`)
            return;
        }
        if (projects[i] === oldProjectTitle) {
            indexToRemove = i;
        }
    }

    projects.splice(indexToRemove, 1, newProjectTitle);

    Object.keys(tasks).forEach(task => {
        if (tasks[task].taskProject === oldProjectTitle) {
            tasks[task].taskProject = newProjectTitle;
        }
        console.log(tasks[task])
    })

    renderProjects();
    getTasks(newProjectTitle);
}
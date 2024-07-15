import { getTasks } from "./displayTasks";
import { highlightSelected, renderProjects } from "./domManipulation";
import { storeData } from "./localStorage";
import { tasks } from "./tasks";

export const projects = ['Default']

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
    storeData('storedProjects', projects);
    renderProjects();
}

export function renameProj(oldProjectTitle, newProjectTitle) {
    let indexToRemove;

    projects.forEach((project, index) => {
        if (project.toLowerCase() === newProjectTitle.toLowerCase()) {
            alert(`Project ${newProjectTitle} already exists`)
            return;
        }
        if (project === oldProjectTitle) {
            indexToRemove = index;
        }
    });

    projects.splice(indexToRemove, 1, newProjectTitle);

    Object.keys(tasks).forEach(task => {
        if (tasks[task].taskProject === oldProjectTitle) {
            tasks[task].taskProject = newProjectTitle;
        }
    })

    storeData('storedProjects', projects);
    renderProjects();
    getTasks(newProjectTitle); 

    const navProjects = document.querySelectorAll('.nav-projects');
    navProjects.forEach(project => {
        if (project.querySelector('.name').dataset.value === newProjectTitle) {
            highlightSelected(project);
        }
    });
}

export function deleteProj(projectTitle) {
    let projectTitleIndex;

    projects.forEach((project, index) => {
        if (project.toLowerCase() === projectTitle.toLowerCase()) { //check if existing
           projectTitleIndex = index;

            Object.keys(tasks).forEach(task => {
                if (tasks[task].taskProject === projectTitle) { //delete tasks
                    delete tasks[task];
                }
            })

            projects.splice(projectTitleIndex, 1);
        }
    });
    storeData('storedProjects', projects);
    renderProjects();
    getTasks('Today');

    const navTasks = document.querySelectorAll('.nav-tasks');
    highlightSelected(navTasks[0]);
}
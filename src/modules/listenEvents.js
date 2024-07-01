import { setDuePlaceholder, setProjectOption } from "./domManipulation.js";
import { dateFormatter } from "./dateHandler.js";
import { createProject, projects as projectsArray } from "./projects.js";
import { tasks, createTask } from "./tasks.js";
import { getTasks } from "./displayTasks.js";

export const tasksNav = ['Today', 'Tomorrow', 'This Week', 'Planned', 'Completed'];

export function sidebarListener() {
    const sidebarButton = document.querySelector('.sidebar-icon');
    const navTasks = document.querySelectorAll('.nav-tasks');
    const navProjects = document.querySelectorAll('.nav-projects');
    const addProject = document.querySelector('.add-project');

    sidebarButton.addEventListener('click', () => {
        console.log('this is sidebar')
    })

    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);
            getTasks(tasksNav[taskIndex]);
        });
    });

    navProjects.forEach(project => {
        project.addEventListener('click', (e) => {
            const projectIndex = Array.from(navProjects).indexOf(e.currentTarget)
            getTasks(projectsArray[projectIndex]);
            setProjectOption(projectsArray[projectIndex]);
        })
    });

    addProject.addEventListener('click', () => {
        const addProjectPopup = document.querySelector('.add-project-popup');
        const addProjectButton = document.querySelector('.add-project');
        const addButton = document.querySelector('.add-project-confirm');
        const cancelButton = document.querySelector('.add-project-cancel');
        const projectTitle = document.querySelector('.project-title');

        addProjectPopup.classList.remove('hidden');
        addProjectButton.classList.add('hidden');

        addButton.addEventListener('click', () => {
            createProject(projectTitle.value);
            addProjectPopup.classList.add('hidden');
            addProjectButton.classList.remove('hidden');
            projectTitle.value = '';
        })

        cancelButton.addEventListener('click', () => {
            addProjectPopup.classList.add('hidden');
            addProjectButton.classList.remove('hidden');
            projectTitle.value = '';
        })
    });
}

export function taskListener() {
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const form = document.querySelector('.form');
    const dueDate = document.querySelector('.due-date');

    addTask.addEventListener('click', () => {
        modalBackdrop.classList.remove('hidden');
        addModal.classList.remove('hidden');

        modalBackdrop.addEventListener('click', () => {
            modalBackdrop.classList.add('hidden');
            addModal.classList.add('hidden');
        });
    });

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            return;
        }

        const taskTitle = document.querySelector('.task-title').value;
        const taskDesc = document.querySelector('.task-desc').value;
        const taskPriority = document.querySelector('.task-priority').value;
        const taskDue = document.querySelector('.date-picker').value;
        const taskProject = document.querySelector('.projects').value;
        const taskComplete = document.querySelector('.hidden-checkbox').checked;

        const task = createTask(taskTitle, taskDesc, taskPriority, taskDue, taskProject, taskComplete);
        tasks[task.taskTitle] = task;
        console.log(tasks)
        getTasks(document.querySelector('.tag').dataset.value);

        modalBackdrop.classList.add('hidden');
        addModal.classList.add('hidden');
        
        form.reset();
    });

    dueDate.addEventListener('click', () => {
        const datePicker = document.querySelector('.date-picker');
        
        datePicker.showPicker();
        datePicker.addEventListener('change', () => {
            setDuePlaceholder(dateFormatter(datePicker.value));
        })
    })    
}
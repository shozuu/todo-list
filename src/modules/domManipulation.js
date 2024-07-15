import { dateFormatter, getToday, getTom, getMin } from "./dateHandler";
import { displayTaskCount } from "./displayTasks";
import { setImgs, imgObjects } from "./imageHandler";
import { sidebarListener } from "./listenEvents";
import { projects as projectsArray } from "./projects";
import { retrieveProjects } from "./localStorage";
let deserializedProjects;

export function createElement(elementType, elementClass = [], elementAttribute = {}) {
    const element = document.createElement(elementType);

    if (elementClass.length) {
        elementClass.forEach(_class => {
            element.classList.add(_class);
        });
    }
    
    const attributeGroup = Object.entries(elementAttribute);

    attributeGroup.forEach(group => {
        const key = group[0];
        const value = group[1];
        
        if (key === 'textContent') {
            element.textContent = value;
        }
        else {
            element.setAttribute(key, value)
        }
    });

    return element;
}

export function appendElement(parentElement, childElement = []) {
    if (childElement.length) {
        childElement.forEach(child => {
            parentElement.appendChild(child);
        });
    }
}

export function highlightSelected(value) {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const navProjects = document.querySelectorAll('.nav-projects');

    navTasks.forEach(nav => { //remove existing selected
        nav.classList.remove('selected');
    })
    navProjects.forEach(project => { //remove existing selected
        project.classList.remove('selected');
    })

    value.classList.add('selected');

    navProjects.forEach(project => {
        if (project.classList.contains('selected')) {
            project.querySelector('.options').classList.remove('hidden');
            project.querySelector('.count').classList.add('hidden');
            return;
        }

        project.querySelector('.options').classList.add('hidden');
        project.querySelector('.option-group').classList.add('hidden');
        project.querySelector('.count').classList.remove('hidden');
        project.classList.remove('on-view');
        document.querySelector('.transparent-backdrop').classList.add('hidden');
    })
}

export function setDuePlaceholder(value) {
    const placeholder = document.querySelector('.placeholder');
    placeholder.textContent = value;
}

export function setTomorrow() {
    const datePicker = document.querySelector('.date-picker');
    datePicker.setAttribute('value', getTom());
    setDuePlaceholder(dateFormatter(getTom()));
}

export function setDefault() {
    const datePicker = document.querySelector('.date-picker');
    datePicker.setAttribute('value', getMin());
    setDuePlaceholder(dateFormatter(getToday()));
}

export function setProjectOption(value) {
    const projectOptions = document.querySelectorAll('.project-option');

    projectOptions.forEach(option => {
        if (option.value === value) {
            option.setAttribute('selected', '');
        }
    });
}

export function renderProjects() {
    const projectGroup = document.querySelector('.project-group');
    const addProjectPopup = document.querySelector('.add-project-popup');
    const navProjects = document.querySelectorAll('.nav-projects');

    navProjects.forEach(projects => { //clears the projectGroup in the sidebar which also removes its eventListeners
        projects.remove();
    });

    deserializedProjects = retrieveProjects();

    projectsArray.forEach(project => { //create the projectGroup with new added project
        const navProjects = createElement('div', ['nav-projects']);
        const projectImg = createElement('img', ['projectImg'], {src: "", alt: 'Project'});
        const name = createElement('div', ['name'], {textContent: project, 'data-value': project});
        const count = createElement('div', ['count'], {textContent: 0});

        const options = createElement('div', ['options','hidden'], {textContent: '•••'});
        const optionGroup = createElement('div', ['option-group', 'hidden']);
        const rename = createElement('div', ['rename-project'], {textContent: 'Rename'});
        const _delete = createElement('div', ['delete-project'], {textContent: 'Delete'});

        appendElement(optionGroup, [rename, _delete]);
        appendElement(options, [optionGroup]);
        appendElement(navProjects, [projectImg, name, count, options]);
        projectGroup.insertBefore(navProjects, addProjectPopup);
    });

    updateProjectOptions();

    //clone, delete, and re attach the cloned navTasks to reset the eventListeners since it increments if not done
    const clone = cloneNavTasks();
    clearNavTasks();
    insertNavTask(clone);

    sidebarListener();
    setImgs(imgObjects);
    displayTaskCount();
}

function updateProjectOptions() { //for projects in the add modal
    const projects = document.querySelector('.projects');
    projects.innerHTML = '';

    projectsArray.forEach(project => {
        const projectOption = createElement('option', ['project-option'], {textContent: project, value: project});

        appendElement(projects, [projectOption])
    });
}

function cloneNavTasks() {
    const taskGroup = document.querySelector('.task-group');
    return taskGroup.cloneNode(true);
}

function clearNavTasks() {
    const taskGroup = document.querySelector('.task-group');
    taskGroup.innerHTML = '';
    taskGroup.remove();
}

function insertNavTask(clone) {
    const sidebarGroup = document.querySelector('.sidebar-group');
    const projectGroup = document.querySelector('.project-group');
    //include navIcon next time
    sidebarGroup.insertBefore(clone, projectGroup);
}

export function displayModal(task) {
    const form = document.querySelector('.form');
    const addModalButton = document.querySelector('.addModal-button');
    addModalButton.remove();

    const buttonGroup = createElement('div', ['button-group']);
    const deleteButton = createElement('div', ['deleteTask-button'], {textContent: 'Delete Task'});
    const editButton = createElement('div', ['editTask-button'], {textContent: 'Save Changes'});
    
    appendElement(buttonGroup, [deleteButton, editButton]);
    appendElement(form, [buttonGroup]);

    const h2 = document.querySelector('.h2');
    const taskTitle = document.querySelector('.task-title');
    const taskDesc = document.querySelector('.task-desc');
    const taskPriority = document.querySelector('.task-priority');
    const taskDue = document.querySelector('.date-picker');
    const taskProject = document.querySelector('.projects');

    h2.innerText = 'Edit Task';
    taskTitle.value = task.taskTitle;
    taskDesc.value = task.taskDesc;
    taskPriority.value = task.taskPriority;
    taskDue.value = task.taskDue;
    taskProject.value = task.taskProject;
}

export function cloneAddModal() {
    const h2 = document.querySelector('.h2');
    const form = document.querySelector('.form');

    const clonedH2 = h2.cloneNode(true);
    const clonedForm =form.cloneNode(true);

    return {clonedH2, clonedForm};
}

export function resetAddModal(clone) {
    const addModal = document.querySelector('.add-modal');
    addModal.innerHTML = '';

    appendElement(addModal, [clone.clonedH2, clone.clonedForm]);
    updateProjectOptions();
}

export function createRenameModal(projectTitle) {
    const renameBackdrop = createElement('div', ['rename-backdrop']);
    const renameModal = createElement('div', ['rename-modal']);
    const h2 = createElement('h2', ['h2'], {textContent: 'Rename Project'});
    const input = createElement('input', ['new-project-title'], {type: 'text', value: projectTitle});
    const buttonGroup = createElement('div', ['rename-buttons']);
    const cancel = createElement('div', ['rename-project-cancel'], {textContent: 'Cancel'});
    const confirm = createElement('div', ['rename-project-confirm'], {textContent: 'Confirm'});

    appendElement(buttonGroup, [cancel, confirm]);
    appendElement(renameModal, [h2, input, buttonGroup]);
    appendElement(document.body, [renameBackdrop, renameModal]);
}

export function createDeleteModal(projectTitle) {
    const deleteBackdrop = createElement('div', ['delete-backdrop']);
    const deleteModal = createElement('div', ['delete-modal']);
    const h2 = createElement('h2', ['h2'], {textContent: 'Delete Project?'});
    const subtext = createElement('div', ['delete-subtext'], {textContent: `This will delete all the tasks under ${projectTitle}`});
    const buttonGroup = createElement('div', ['delete-buttons']);
    const cancel = createElement('div', ['delete-project-cancel'], {textContent: 'Cancel'});
    const confirm = createElement('div', ['delete-project-confirm'], {textContent: 'Confirm'});

    appendElement(buttonGroup, [cancel, confirm]);
    appendElement(deleteModal, [h2, subtext, buttonGroup]);
    appendElement(document.body, [deleteBackdrop, deleteModal]);
}
import { sidebarListener } from "./listenEvents.js";
import { createElement, appendElement } from "./domManipulation.js";
import { getToday, getMin } from "./dateHandler.js";
import { projects as projectsArray } from "./projects.js";
import { getTasks } from "./displayTasks.js";

export function renderUI() {
    createAddPopup();
    getTasks('Today');
    sidebarListener();
}

function createAddPopup() {
    const modalBackdrop = createElement('div', ['modal-backdrop', 'hidden']);
    const addModal = createElement('div', ['add-modal', 'hidden']);

    const h2 = createElement('h2', ['h2'], {textContent: 'Add Task'});
    const form = createElement('form', ['form'], {action: '#'});
    
    const group = createElement('div', ['group']);
    const taskTitle = createElement('textarea', ['task-title'], {placeholder: 'Title', required: ''});
    const taskDesc = createElement('textarea', ['task-desc'], {placeholder: 'Description', required: ''});

    const configGroup = createElement('div', ['config-group']);

    const priorityGroup = createElement('div', ['modal-group']);
    const priorityImg = createElement('img', ['priorityImg']);
    const name = createElement('div', ['name'], {textContent: 'Priority'});
    const taskPriority = createElement('select', ['task-priority'], {required: ''});
    const priorityOption0 = createElement('option', ['priority-option'], {textContent: 'No Priority', value: '', selected: '', disabled: '', hidden: ''});
    const priorityOption1 = createElement('option', ['priority-option'], {textContent: 'Low Priority', value: 'Low Priority'});
    const priorityOption2 = createElement('option', ['priority-option'], {textContent: 'Medium Priority', value: 'Medium Priority'});
    const priorityOption3 = createElement('option', ['priority-option'], {textContent: 'High Priority', value: 'High Priority'});

    const dueGroup = createElement('div', ['modal-group']);
    const dueImg = createElement('img', ['plannedImg']);
    const name1 = createElement('div', ['name'], {textContent: 'Due Date'});
    const temp = createElement('div', ['due-date']);
    const tempPlaceholder = createElement('div', ['placeholder'], {textContent: `${getToday()}`})
    const datePicker = createElement('input', ['date-picker'], {type: 'date', min: `${getMin()}`, value: `${getMin()}`});

    const projectGroup = createElement('div', ['modal-group']);
    const projectsImg = createElement('img', ['projectImg']);
    const name2 = createElement('div', ['name'], {textContent: 'Projects'});
    const projects = createElement('select', ['projects'], {required: ''});
    const checkbox = createElement('input', [ 'hidden', 'hidden-checkbox'], {type: 'checkbox'});
    
    projectsArray.forEach(project => {
        const projectOption = createElement('option', ['project-option'], {textContent: project, value: project});

        appendElement(projects, [projectOption])
    });

    const addModalButton = createElement('button', ['addModal-button'], {type: 'submit', textContent: 'Add Task'});
    
    appendElement(group, [taskTitle, taskDesc]);
    appendElement(taskPriority, [priorityOption0, priorityOption1, priorityOption2, priorityOption3]);
    appendElement(priorityGroup, [priorityImg, name, taskPriority]);
    appendElement(temp, [tempPlaceholder, datePicker]);
    appendElement(dueGroup, [dueImg, name1, temp]);
    appendElement(projectGroup, [projectsImg, name2, projects]);
    appendElement(configGroup, [priorityGroup, dueGroup, projectGroup, checkbox]);
    appendElement(form, [group, configGroup, addModalButton]);
    appendElement(addModal, [h2, form]);
    appendElement(document.body, [modalBackdrop, addModal]);
}
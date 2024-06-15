import { imgObjects, setImgs } from "./imageHandler.js";
import { listenEvents } from "./listenEvents.js";
import { createElement, appendElement } from "./domManipulation.js";

export function renderUI() {
    createAddPopup();
    renderToday();
    listenEvents();
    setImgs(imgObjects);
}

export function renderToday() {
    setRender('Today', 0, 0)
    //function calls to retrieve tasks under today
}

export function renderTommorrow() {
    setRender('Tommorrow', 0, 0)
}

export function renderWeek() {
    setRender('This Week', 0, 0)
}

export function renderPlanned() {
    setRender('Planned', 0, 0)
}

export function renderCompleted() {
    setRender('Completed', 0, 0)
}

function setRender(sched, pendingCount, completedTask) {
    const schedule = document.querySelector('.schedule');
    const toCompleteCount = document.querySelector('.toComplete');
    const completedCount = document.querySelector('.completed');

    schedule.textContent = sched;
    toCompleteCount.textContent = pendingCount;
    completedCount.textContent = completedTask;
}

function createAddPopup() { //can be a function that just takes parameters like setRender
    const modalBackdrop = createElement('div', ['modal-backdrop', 'hidden']);
    const addModal = createElement('div', ['add-modal', 'hidden']);

    const h2 = createElement('h2', [], {textContent: 'Add Task'});
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
    const temp = createElement('date', ['due-date'], {textContent: '6/10/2024'});

    const projectGroup = createElement('div', ['modal-group']);
    const projectsImg = createElement('img', ['projectImg']);
    const name2 = createElement('div', ['name'], {textContent: 'Projects'});
    const temp1 = createElement('div', ['projects'], {textContent: 'Default'});

    const addModalButton = createElement('button', ['addModal-button'], {type: 'submit', textContent: 'Add Task'});
    
    appendElement(group, [taskTitle, taskDesc]);
    appendElement(taskPriority, [priorityOption0, priorityOption1, priorityOption2, priorityOption3]);
    appendElement(priorityGroup, [priorityImg, name, taskPriority]);
    appendElement(dueGroup, [dueImg, name1, temp]);
    appendElement(projectGroup, [projectsImg, name2, temp1]);
    appendElement(configGroup, [priorityGroup, dueGroup, projectGroup]);
    appendElement(form, [group, configGroup, addModalButton]);
    appendElement(addModal, [h2, form]);
    appendElement(document.body, [modalBackdrop, addModal]);
}

//avoid using text content to set the value
//instead, use value to set text content


//retain the placeholder to dynamically change. 
//whenever user clicks the placeholder, it activates the date picker hidden
import { appendElement, createElement, setDefault, setTomorrow } from "./domManipulation";
import { listenEvents } from "./listenEvents";

export function displayTasks(value) {
    if (value === 'Tomorrow') {
        setTomorrow(); //for date-picker in modal
        createTemplate(value); 
    }
    else {
        setDefault();
        createTemplate(value);
    }
    listenEvents();
}

function createTemplate(value) {
    const taskView = document.querySelector('.task-view')
    taskView.innerHTML = '';

    const tag = createElement('div', ['tag'], {value: value, textContent: value});
    const taskCounter = createElement('div', ['task-counter']);

    const card = createElement('div', ['card']);
    const toComplete = createElement('div', ['toComplete'], {textContent: '0'}); //should be dynamic value
    const cardName = createElement('div', ['card-name'], {textContent: 'Tasks to be Completed'});

    const card2 = createElement('div', ['card']);
    const completed = createElement('div', ['completed'], {textContent: '0'});
    const cardName2 = createElement('div', ['card-name'], {textContent: 'Completed Tasks'});

    const addTask = createElement('div', ['add-task']);
    const addTaskContent = createElement('div', [], {textContent: '+ Add Task'});

    appendElement(addTask, [addTaskContent]);

    appendElement(card, [toComplete, cardName]);
    appendElement(card2, [completed, cardName2]);

    appendElement(taskCounter, [card, card2]);

    appendElement(taskView, [tag, taskCounter, addTask]);
}
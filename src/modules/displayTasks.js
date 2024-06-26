import { appendElement, createElement, setDefault, setTomorrow } from "./domManipulation";
import { taskListener } from "./listenEvents";
import { tasks } from "./tasks";

export function getTasks(value) {
    if (value === 'Tomorrow') {
        setTomorrow(); //for date-picker in modal
        displayTasks(value); 
    }
    else {
        setDefault();
        displayTasks(value);
    }
    taskListener();
}

function displayTasks(value) {
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

    //above are task counters

    Object.keys(tasks).forEach(key => {
        console.log(tasks[key])
    })


    // console.log(tasks['sample task'])

    const addTask = createElement('div', ['add-task']);
    const addTaskContent = createElement('div', [], {textContent: '+ Add Task'});

    appendElement(addTask, [addTaskContent]);

    appendElement(card, [toComplete, cardName]);
    appendElement(card2, [completed, cardName2]);

    appendElement(taskCounter, [card, card2]);

    appendElement(taskView, [tag, taskCounter, addTask]);
}
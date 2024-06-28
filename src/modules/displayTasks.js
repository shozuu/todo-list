import { dateFormatter, getToday, getTom, getWeekRange } from "./dateHandler";
import { appendElement, createElement, setDefault, setTomorrow } from "./domManipulation";
import { taskListener, tasksNav } from "./listenEvents";
import { projects } from "./projects";
import { tasks } from "./tasks";

export function getTasks(value) {
    tasksNav.forEach(nav => {
        if (value === nav) {
            if (value === 'Tomorrow') {
                setTomorrow();
                handleTaskNav(value); 
            }
            else {
                setDefault();
                handleTaskNav(value);
            }
            taskListener();
        }
    });

    projects.forEach(project => {
        if (value === project) {
            setDefault();
            handleProjectNav(value);
        }
        taskListener();
    });
}

function handleTaskNav(value) {
    const taskView = document.querySelector('.task-view')
    taskView.innerHTML = '';
    const tag = createElement('div', ['tag'], {'data-value': value, textContent: value});
    const taskCounter = createTaskCounter(value);

    //above are task counters
    const taskContainer = createElement('div', ['task-container']);

    switch (value) {
        case 'Today':
            Object.keys(tasks).forEach(key => {
                if (tasks[key].taskDue === getToday()) {
                    appendElement(taskContainer, [createTaskCard(tasks[key])])
                }
            }) 
            break;
        case 'Tomorrow':
            Object.keys(tasks).forEach(key => {
                if (tasks[key].taskDue === getTom()) {
                    appendElement(taskContainer, [createTaskCard(tasks[key])])
                }
            })
            break;
        case 'This Week':
            Object.keys(tasks).forEach(key => {
                if (getWeekRange(tasks[key].taskDue)) {
                    appendElement(taskContainer, [createTaskCard(tasks[key])])
                }
            })
            break;
        case 'Planned':
            Object.keys(tasks).forEach(key => {
                if (!getWeekRange(tasks[key].taskDue)) {
                    appendElement(taskContainer, [createTaskCard(tasks[key])])
                }
            })
            break;
        case 'Completed':
            Object.keys(tasks).forEach(key => {
                //function call that passes all the checked value in task
                console.log('working on completed')
            })
            break;
        default:
            break;
    }

    const addTask = createAddTask();
    appendElement(taskView, [tag, taskCounter, taskContainer, addTask]);
}

function handleProjectNav(value) {
    const taskView = document.querySelector('.task-view')
    taskView.innerHTML = '';
    const tag = createElement('div', ['tag'], {'data-value': value, textContent: value});
    const taskCounter = createTaskCounter(value);

    //above are task counters
    const taskContainer = createElement('div', ['task-container']);
    
    Object.keys(tasks).forEach(key => {
        if (value === tasks[key].taskProject) {
            appendElement(taskContainer, [createTaskCard(tasks[key])])
        }
    })

    const addTask = createAddTask();
    appendElement(taskView, [tag, taskCounter, taskContainer, addTask]);
}

function createTaskCounter(value) {
    //logic to retrieve the count of tasks under projectName/taskNav

    const taskCounter = createElement('div', ['task-counter']);
    const card = createElement('div', ['card']);
    const toComplete = createElement('div', ['toComplete'], {textContent: '0'});
    const cardName = createElement('div', ['card-name'], {textContent: 'Tasks to be Completed'});
    const card2 = createElement('div', ['card']);
    const completed = createElement('div', ['completed'], {textContent: '0'}); //should be dynamic value
    const cardName2 = createElement('div', ['card-name'], {textContent: 'Completed Tasks'});

    appendElement(card, [toComplete, cardName]);
    appendElement(card2, [completed, cardName2]);
    appendElement(taskCounter, [card, card2]);
    return taskCounter;
}

function createTaskCard(task) {
    const taskCard = createElement('div', ['taskCard'], {'data-value': task.taskTitle});
    const checkbox = createElement('input', [], {type: 'checkbox'});
    const taskTitle = createElement('div', [], {textContent: task.taskTitle});
    const taskDue = createElement('div', ['taskCard-due'], {textContent: dateFormatter(task.taskDue)})

    appendElement(taskCard, [checkbox, taskTitle, taskDue]);
    return taskCard;
}

function createAddTask() {
    const addTask = createElement('div', ['add-task']);
    const addTaskContent = createElement('div', [], {textContent: '+ Add Task'});

    appendElement(addTask, [addTaskContent]);
    return addTask;
}
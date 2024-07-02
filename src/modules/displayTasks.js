import { dateFormatter, getToday, getTom, getWeekRange } from "./dateHandler";
import { appendElement, createElement, setDefault, setTomorrow } from "./domManipulation";
import { imgObjects, setImgs } from "./imageHandler";
import { taskListener, tasksNav } from "./listenEvents";
import { projects } from "./projects";
import { tasks } from "./tasks";

export function getTasks(value) {
    tasksNav.forEach(nav => {
        if (value === nav) {
            if (value === 'Tomorrow') {
                setTomorrow();
                displayTasks(value, 'nav'); 
            }
            else {
                setDefault();
                displayTasks(value, 'nav');
            }
        }
    });

    projects.forEach(project => {
        if (value === project) {
            setDefault();
            displayTasks(value, 'project');
        }
    });
}

function displayTasks(value, type) {
    const taskView = document.querySelector('.task-view')
    taskView.innerHTML = '';
    const tag = createElement('div', ['tag'], {'data-value': value, textContent: value});
    let taskCounter;
    let pendingTaskCount = 0;
    let completedTaskCount = 0;

    //above are task counters
    const taskContainer = createElement('div', ['task-container']);
    
    if (type === 'nav') {
        switch (value) {
            case 'Today':
                Object.keys(tasks).forEach(key => {
                    if (tasks[key].taskDue === getToday()) {
                        appendElement(taskContainer, [createTaskCard(tasks[key])])
                        pendingTaskCount++;
                    }
                }) 
                taskCounter = createTaskCounter(pendingTaskCount);
                break;
            case 'Tomorrow':
                Object.keys(tasks).forEach(key => {
                    if (tasks[key].taskDue === getTom()) {
                        appendElement(taskContainer, [createTaskCard(tasks[key])])
                        pendingTaskCount++;
                    }
                })
                taskCounter = createTaskCounter(pendingTaskCount);
                break;
            case 'This Week':
                Object.keys(tasks).forEach(key => {
                    if (getWeekRange(tasks[key].taskDue)) {
                        appendElement(taskContainer, [createTaskCard(tasks[key])])
                        pendingTaskCount++;
                    }
                })
                taskCounter = createTaskCounter(pendingTaskCount);
                break;
            case 'Planned':
                Object.keys(tasks).forEach(key => {
                    if (!getWeekRange(tasks[key].taskDue)) {
                        appendElement(taskContainer, [createTaskCard(tasks[key])])
                        pendingTaskCount++;
                    }
                })
                taskCounter = createTaskCounter(pendingTaskCount);
                break;
            case 'Completed':
                Object.keys(tasks).forEach(key => {
                    //function call that passes all the checked value in task
                    console.log('working on completed')
                })
                taskCounter = createTaskCounter(pendingTaskCount);
                break;
            default:
                break;
        }
    }
    else if (type === 'project') {
        Object.keys(tasks).forEach(key => {
            if (value === tasks[key].taskProject) {
                appendElement(taskContainer, [createTaskCard(tasks[key])])
                pendingTaskCount++;
            }
        })
        taskCounter = createTaskCounter(pendingTaskCount);
    }

    const addTask = createAddTask();
    appendElement(taskView, [tag, taskCounter, taskContainer, addTask]);
    taskListener();
    setImgs(imgObjects);
}

function createTaskCounter(value) {
    //logic to retrieve the count of tasks under projectName/taskNav

    const taskCounter = createElement('div', ['task-counter']);
    const card = createElement('div', ['card']);
    const toComplete = createElement('div', ['toComplete'], {textContent: value});
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
    const checkbox = createElement('input', ['taskCard-checkbox'], {type: 'checkbox'});
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
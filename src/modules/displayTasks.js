import { dateFormatter, getToday, getTom, getWeekRange } from "./dateHandler";
import { appendElement, createElement, setDefault, setTomorrow } from "./domManipulation";
import { imgObjects, setImgs } from "./imageHandler";
import { taskListener, tasksNav } from "./listenEvents";
import { retrieveTasks } from "./localStorage";
import { projects } from "./projects";
import { tasks } from "./tasks";
let deserializedTasks;

export function getTasks(value) {
    tasksNav.forEach(nav => {
        if (value === nav) {
            if (value === 'Tomorrow') {
                setTomorrow();
                displayTasks(value); 
            }
            else {
                setDefault();
                displayTasks(value);
            }
        }
    });

    projects.forEach(project => {
        if (value === project) {
            setDefault();
            displayTasks(value);
        }
    });
    displayTaskCount();
}

function displayTasks(value) {
    const taskView = document.querySelector('.task-view');
    taskView.innerHTML = '';
    const tag = createElement('div', ['tag'], {'data-value': value, textContent: value});
    let taskCounter, result;
    let completeFlag = false;

    deserializedTasks = retrieveTasks();

    switch (value) {
        case 'Today':
            result = filterTasks(task => task.taskDue === getToday());
            break;
        case 'Tomorrow':
            result = filterTasks(task => task.taskDue  === getTom());
            break;
        case 'This Week':
            result = filterTasks(task => getWeekRange(task.taskDue));
            break;
        case 'Planned':
            result = filterTasks(task => !getWeekRange(task.taskDue));
            break;
        case 'Completed':
            result = filterTasks(task => task.taskComplete === true, value);
            completeFlag = true;
            break;
        default:
            result = filterTasks(task => value === task.taskProject);
            break;
    }
    
    taskCounter = createTaskCounter(result.pendingTaskCount, result.completedTaskCount, completeFlag);
    const addTask = createAddTask(completeFlag);
    appendElement(taskView, [tag, taskCounter, result.taskContainer, addTask]);
    taskListener();
    setImgs(imgObjects);
}

function filterTasks(condition, value) {
    let pendingTaskCount = 0;
    let completedTaskCount = 0;
    const taskContainer = createElement('div', ['task-container']);

    Object.keys(tasks).forEach(key => {
        const task = tasks[key];

        if (condition(task)) { 
            if (task.taskComplete && value === 'Completed') {
                completedTaskCount++;
                appendElement(taskContainer, [createTaskCard(task)])
                return;
            }
            else if (task.taskComplete) {
                completedTaskCount++;
                return;
            }
            appendElement(taskContainer, [createTaskCard(task)])
            pendingTaskCount++;
        }
    }) 

    // Inside filterTasks, the condition(task) function is defined to apply a specific condition to each task object as we loop through them.

    // When we pass the condition function from displayTasks to filterTasks, it changes the logic or condition that the function evaluates for each task in the tasks object.

    // Each time filterTasks receives a condition from displayTasks, it applies this condition to the current task in the loop, determining whether the task meets the criteria defined by that condition function.

    return {taskContainer, pendingTaskCount, completedTaskCount};
}

function createTaskCounter(pending, complete, completeFlag) {
    const taskCounter = createElement('div', ['task-counter']);
    let card, toComplete, cardName;

    if (completeFlag) {
        card = createElement('div', ['card', 'hidden']);
        toComplete = createElement('div', ['toComplete', 'hidden'], {textContent: pending});
        cardName = createElement('div', ['card-name', 'hidden'], {textContent: 'Pending'});
    } 
    else {
        card = createElement('div', ['card']);
        toComplete = createElement('div', ['toComplete'], {textContent: pending});
        cardName = createElement('div', ['card-name'], {textContent: 'Pending'});
    }

    const card2 = createElement('div', ['card']);
    const completed = createElement('div', ['completed'], {textContent: complete});
    const cardName2 = createElement('div', ['card-name'], {textContent: 'Completed'});

    appendElement(card, [toComplete, cardName]);
    appendElement(card2, [completed, cardName2]);
    appendElement(taskCounter, [card, card2]);
    return taskCounter;
}

function createTaskCard(task) {
    let taskCard;
    let checkbox;
    if (task.taskComplete) {
        taskCard = createElement('s', ['taskCard'], {'data-value': task.taskTitle});
        checkbox = createElement('input', ['taskCard-checkbox'], {type: 'checkbox', id: 'checkbox', checked: '', disabled: ''});
    }
    else {
        taskCard = createElement('div', ['taskCard'], {'data-value': task.taskTitle});
        checkbox = createElement('input', ['taskCard-checkbox'], {type: 'checkbox', id: 'checkbox', disabled: ''});
    }
    const checkboxLabel = createElement('label', ['custom-checkbox'], {for: 'checkbox', 'data-value': task.taskTitle})
    const taskTitle = createElement('div', [], {textContent: task.taskTitle});
    const taskDue = createElement('div', ['taskCard-due'], {textContent: dateFormatter(task.taskDue)})

    appendElement(taskCard, [checkbox, checkboxLabel, taskTitle, taskDue]);
    return taskCard;
}

function createAddTask(completeFlag) {
    let addTask;

    if (completeFlag) {
        addTask = createElement('div', ['add-task', 'hidden']);
    } 
    else {
        addTask = createElement('div', ['add-task']);
    }

    const addTaskContent = createElement('div', [], {textContent: '+ Add Task'});
    appendElement(addTask, [addTaskContent]);
    return addTask;
}

export function displayTaskCount() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const navProjects = document.querySelectorAll('.nav-projects');

    navTasks.forEach(nav => {
        const name = nav.querySelector('.name').dataset.value;
        const count = nav.querySelector('.count');

        if (name === 'Completed') return;
        setCount(name, count)
    })

    navProjects.forEach(project => {
        const name = project.querySelector('.name').dataset.value;
        const count = project.querySelector('.count');
        setCount(name, count)
    })
}

function setCount(name, count) {
    let pendingTaskCount;

    switch (name) {
        case 'Today':
            pendingTaskCount = taskChecker(task => task.taskDue === getToday());
            break;
        case 'Tomorrow':
            pendingTaskCount = taskChecker(task => task.taskDue === getTom());
            break;
        case 'This Week':
            pendingTaskCount = taskChecker(task => getWeekRange(task.taskDue));
            break;
        case 'Planned':
            pendingTaskCount = taskChecker(task => !getWeekRange(task.taskDue));
            break;
        default:
            pendingTaskCount = taskChecker(task => name === task.taskProject);
            break;
    }
    count.dataset.value = pendingTaskCount;
    count.textContent = pendingTaskCount;
}

function taskChecker(condition) {
    let pendingTaskCount = 0;

    Object.keys(tasks).forEach(key => {
        const task = tasks[key];

        if (condition(task)) {
            if (!task.taskComplete) {
                pendingTaskCount++;
            }
        }
    })

    return pendingTaskCount;
}
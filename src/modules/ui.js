import { imgObjects, setImgs } from "./imageHandler.js";

export function renderUI() {
    // renderSidebar();
    createAddPopup();
    renderToday();
    listenEvents();
    setImgs(imgObjects);
}

function renderSidebar() {
    //need function call to retrieve/show pending task 
    //need functionality to create and show projects dynamically
}

function renderToday() {
    setRender('Today', 0, 0)
    //function calls to retrieve tasks under today
}

function renderTommorrow() {
    setRender('Tommorrow', 0, 0)
}

function renderWeek() {
    setRender('This Week', 0, 0)
}

function renderPlanned() {
    setRender('Planned', 0, 0)
}

function renderCompleted() {
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
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop');
    modalBackdrop.classList.add('hidden');

    const addModal = document.createElement('div'); //h1, group, config group
    addModal.classList.add('add-modal');
    addModal.classList.add('hidden');

    const h1 = document.createElement('h2');
    h1.textContent = 'Add Task';

    const group = document.createElement('div'); //title and desc
    group.classList.add('group');

    const taskTitle = document.createElement('textarea');
    taskTitle.classList.add('task-title');
    taskTitle.placeholder = 'Title';

    const taskDesc = document.createElement('textarea');
    taskDesc.classList.add('task-desc');
    taskDesc.placeholder = 'Description';

    group.appendChild(taskTitle);
    group.appendChild(taskDesc);

    const configGroup = document.createElement('div'); //priority, duedate, project
    configGroup.classList.add('config-group');

    const priorityGroup = document.createElement('div'); //priority
    priorityGroup.classList.add('modal-group');

    const priorityImg = document.createElement('img');
    priorityImg.classList.add('priorityImg');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = 'Priority';

    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority');
    taskPriority.textContent = 'Medium Priority';
    
    priorityGroup.appendChild(priorityImg);
    priorityGroup.appendChild(name);
    priorityGroup.appendChild(taskPriority);

    const dueGroup = document.createElement('div'); //due date
    dueGroup.classList.add('modal-group');

    const dueImg = document.createElement('img');
    dueImg.classList.add('plannedImg');

    const name1 = document.createElement('div');
    name1.classList.add('name');
    name1.textContent = 'Due Date';

    const temp = document.createElement('div');
    temp.classList.add('due-date');
    temp.textContent = '6/10/2024';
    
    dueGroup.appendChild(dueImg);
    dueGroup.appendChild(name1);
    dueGroup.appendChild(temp);

    const projectGroup = document.createElement('div'); //project
    projectGroup.classList.add('modal-group');

    const projectsImg = document.createElement('img');
    projectsImg.classList.add('projectImg');

    const name2 = document.createElement('div');
    name2.classList.add('name');
    name2.textContent = 'Projects';

    const temp1 = document.createElement('div');
    temp1.classList.add('projects');
    temp1.textContent = 'Default';
    
    projectGroup.appendChild(projectsImg);
    projectGroup.appendChild(name2);
    projectGroup.appendChild(temp1);

    configGroup.appendChild(priorityGroup);
    configGroup.appendChild(dueGroup);
    configGroup.appendChild(projectGroup);
    
    const addModalButton = document.createElement('div');
    addModalButton.classList.add('addModal-button');
    addModalButton.textContent = 'Add Task';

    addModal.appendChild(h1);
    addModal.appendChild(group);
    addModal.appendChild(configGroup);
    addModal.appendChild(addModalButton);


    document.body.appendChild(modalBackdrop);
    document.body.appendChild(addModal);
}

function listenEvents() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const addModalButton = document.querySelector('.addModal-button');

    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);

            switch (taskIndex) {
                case 0:
                    renderToday();
                    break;
                case 1:
                    renderTommorrow();
                    break;
                case 2:
                    renderWeek();
                    break;
                case 3:
                    renderPlanned();
                    break;
                case 4:
                    renderCompleted();
                    break;
                default:
                    break;
            }
        })
    });

    addTask.addEventListener('click', () => {
        modalBackdrop.classList.remove('hidden');
        addModal.classList.remove('hidden');

        modalBackdrop.addEventListener('click', () => {
            modalBackdrop.classList.add('hidden');
            addModal.classList.add('hidden');
        })
    });

    addModalButton.addEventListener('click', () => {
        const taskTitle = document.querySelector('.task-title').value;
        const taskDesc = document.querySelector('.task-desc').value;
        const taskPriority = document.querySelector('.task-priority');
        const taskDue = document.querySelector('.due-date');
        const taskProject = document.querySelector('.projects');
    
        console.log(taskTitle, taskDesc, taskPriority, taskDue, taskProject)
    });

    const modalGroup = document.querySelectorAll('.modal-group');

    modalGroup.forEach(group => {
        group.addEventListener('click', (e) => {
            const groupIndex = Array.from(modalGroup).indexOf(e.currentTarget);
            console.log(groupIndex)
        })
    });    
}
import logoImgs from '../assets/logo.svg';
import sidebarImgs from '../assets/sidebar.svg';
import todayImgs from '../assets/today.svg';
import tomImgs from '../assets/tommorrow.svg';
import weekImgs from '../assets/week.svg';
import plannedImgs from '../assets/planned.svg';
import completedImgs from '../assets/completed.svg';
import projectImgs from '../assets/project.svg';
import addImgs from '../assets/add.svg';
import priorityImgs from '../assets/priority.svg';

export function renderUI() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const addTask = document.querySelector('.add-task');
    
    renderSidebar();
    renderToday();

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

    addTask.addEventListener('click', createAddPopup);
}

function renderSidebar() {
    const sidebarImg = document.querySelector('.sidebarImg');
    const todayImg = document.querySelector('.todayImg');
    const tomImg = document.querySelector('.tomImg');
    const weekImg = document.querySelector('.weekImg');
    const plannedImg = document.querySelector('.plannedImg');
    const completedImg = document.querySelector('.completedImg');
    const projectImg = document.querySelector('.projectImg');
    const addImg = document.querySelector('.addImg');
    const logoImg = document.querySelector('.logoImg');

    sidebarImg.src = sidebarImgs;
    todayImg.src = todayImgs;
    tomImg.src = tomImgs;
    weekImg.src = weekImgs;
    plannedImg.src = plannedImgs;
    completedImg.src = completedImgs;
    projectImg.src = projectImgs;
    addImg.src = addImgs;
    logoImg.src = logoImgs;

    //need functionality to retrieve/show pending task 
    //need functionality to create and show projects dynamically
}

function renderToday() {
    setRender('Today', 0, 0)
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

    const addModal = document.createElement('div'); //h1, group, config group
    addModal.classList.add('add-modal');

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
    priorityImg.src = priorityImgs;

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
    dueImg.src = plannedImgs;

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
    projectsImg.src = projectImgs;

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

    addModal.appendChild(h1);
    addModal.appendChild(group);
    addModal.appendChild(configGroup);


    document.body.appendChild(modalBackdrop);
    document.body.appendChild(addModal);
    // document.body.appendChild(addButton);
}
import logoImgs from '../assets/logo.svg';
import sidebarImgs from '../assets/sidebar.svg';
import todayImgs from '../assets/today.svg';
import tomImgs from '../assets/tommorrow.svg';
import weekImgs from '../assets/week.svg';
import plannedImgs from '../assets/planned.svg';
import completedImgs from '../assets/completed.svg';
import projectImgs from '../assets/project.svg';
import addImgs from '../assets/add.svg';

export function renderUI() {
    renderSidebar();

    const navTasks = document.querySelectorAll('.nav-tasks');
    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);

            switch (taskIndex) { //depending on how to retrieve data, we can pack it all inside switch statements and not standalone functions
                case 0:
                    // renderToday();
                    setRender('Today', 0, 0)
                    break;
                case 1:
                    // renderTommorrow();
                    setRender('Tommorrow', 0, 0)
                    break;
                case 2:
                    // renderWeek();
                    setRender('This Week', 0, 0)
                    break;
                case 3:
                    // renderPlanned();
                    setRender('Planned', 0, 0)
                    break;
                case 4:
                    // renderCompleted();
                    setRender('Completed', 0, 0)
                    break;
                default:
                    break;
            }
        })
    });
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
}

// function renderToday() {

// }

// function renderTommorrow() {

// }

// function renderWeek() {

// }

// function renderPlanned() {

// }

// function renderCompleted() {

// }

function setRender(sched, pendingCount, completedTask) {
    const schedule = document.querySelector('.schedule');
    const toCompleteCount = document.querySelector('.toComplete');
    const completedCount = document.querySelector('.completed');

    schedule.textContent = sched;
    toCompleteCount.textContent = pendingCount;
    completedCount.textContent = completedTask;
}
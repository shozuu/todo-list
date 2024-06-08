import logoImgs from '../assets/logo.svg';
import sidebarImgs from '../assets/sidebar.svg';
import todayImgs from '../assets/today.svg';
import tomImgs from '../assets/tommorrow.svg';
import weekImgs from '../assets/week.svg';
import plannedImgs from '../assets/planned.svg';
import completedImgs from '../assets/completed.svg';
import projectImgs from '../assets/project.svg';
import addImgs from '../assets/add.svg';

export function createUI() {
    renderSidebar();
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
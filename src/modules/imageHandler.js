import logoImg from '../assets/logo.svg';
import sidebarImg from '../assets/sidebar.svg';
import todayImg from '../assets/today.svg';
import tomImg from '../assets/tommorrow.svg';
import weekImg from '../assets/week.svg';
import plannedImg from '../assets/planned.svg';
import completedImg from '../assets/completed.svg';
import projectImg from '../assets/project.svg';
import addImg from '../assets/add.svg';
import priorityImg from '../assets/priority.svg';

export const imgObjects = { 
    //property value shorthand
    //logoImg(class): logoImg(src link)
    logoImg,
    sidebarImg,
    todayImg,
    tomImg,
    weekImg,
    plannedImg,
    completedImg,
    projectImg,
    addImg,
    priorityImg
}

export function setImgs(imgObjects) {
    const imgGroups = Object.entries(imgObjects);
    
    imgGroups.forEach(group => {
        const key = group[0];
        const value = group[1];
        const imgElement = document.querySelectorAll(`.${key}`);

        if (imgElement.length) { //if imgElement != 0
            imgElement.forEach(element => {
                element.src = value;
            });
        }
    });
}
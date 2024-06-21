import { dateFormatter, getToday, getTom, getMin } from "./dateHandler";
import { setImgs, imgObjects } from "./imageHandler";
import { getProjects } from "./projects";

export function createElement(elementType, elementClass = [], elementAttribute = {}) {
    const element = document.createElement(elementType);

    if (elementClass.length) {
        elementClass.forEach(_class => {
            element.classList.add(_class);
        });
    }
    
    const attributeGroup = Object.entries(elementAttribute);

    attributeGroup.forEach(group => {
        const key = group[0];
        const value = group[1];
        
        if (key === 'textContent') {
            element.textContent = value;
        }
        else {
            element.setAttribute(key, value)
        }
    });

    return element;
}

export function appendElement(parentElement, childElement = []) {
    if (childElement.length) {
        childElement.forEach(child => {
            parentElement.appendChild(child);
        });
    }
}

export function setDuePlaceholder(value) {
    const placeholder = document.querySelector('.placeholder');
    placeholder.textContent = value;
}

export function setRender(sched, pendingCount, completedTask) {
    const schedule = document.querySelector('.schedule');
    const toCompleteCount = document.querySelector('.toComplete');
    const completedCount = document.querySelector('.completed');

    schedule.textContent = sched;
    toCompleteCount.textContent = pendingCount;
    completedCount.textContent = completedTask;
}

export function setTomorrow() {
    const datePicker = document.querySelector('.date-picker');
    datePicker.setAttribute('value', getTom());
    setDuePlaceholder(dateFormatter(getTom()));
}

export function setDefault() {
    const datePicker = document.querySelector('.date-picker');
    datePicker.setAttribute('value', getMin());
    setDuePlaceholder(getToday());
}

export function renderProjects() {
    const projects = getProjects();
    const projectGroup = document.querySelector('.project-group');
    const addProjectPopup = document.querySelector('.add-project-popup');
    const navProjects = document.querySelectorAll('.nav-projects');
    navProjects.forEach(projects => {
        projects.remove();
    });

    Object.keys(projects).forEach(key => {
        const navProjects = createElement('div', ['nav-projects']);
        const projectImg = createElement('img', ['projectImg'], {src: "", alt: 'Project'});
        const name = createElement('div', ['name'], {textContent: key});
        const count = createElement('div', ['count'], {textContent: 0});
        appendElement(navProjects, [projectImg, name, count]);
        projectGroup.insertBefore(navProjects, addProjectPopup);
    });

    setImgs(imgObjects);
}
import { dateFormatter, getToday, getTom, getMin } from "./dateHandler";
import { setImgs, imgObjects } from "./imageHandler";
import { projects as projectsArray } from "./projects";

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

export function setRender(label, pendingCount, completedTask) { //will retrieve here infos from the objs?
    const tag = document.querySelector('.tag');
    const toCompleteCount = document.querySelector('.toComplete');
    const completedCount = document.querySelector('.completed');

    tag.textContent = label;
    tag.value = label;
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

export function renderProjects() { //for sidebar display
    const projectGroup = document.querySelector('.project-group');
    const addProjectPopup = document.querySelector('.add-project-popup');
    const navProjects = document.querySelectorAll('.nav-projects');
    navProjects.forEach(projects => {
        projects.remove();
    });

    projectsArray.forEach(project => {
        const navProjects = createElement('div', ['nav-projects']);
        const projectImg = createElement('img', ['projectImg'], {src: "", alt: 'Project'});
        const name = createElement('div', ['name'], {textContent: project});
        const count = createElement('div', ['count'], {textContent: 0});
        appendElement(navProjects, [projectImg, name, count]);
        projectGroup.insertBefore(navProjects, addProjectPopup);
    });

    updateProjectOptions();
    setImgs(imgObjects);
    //reactivate event listen
}

function updateProjectOptions() {
    const projects = document.querySelector('.projects');
    projects.innerHTML = '';

    projectsArray.forEach(project => {
        const projectOption = createElement('option', ['project-option'], {textContent: project, value: project});

        appendElement(projects, [projectOption])
    });
    
    // Object.keys(getProjects()).forEach(key => {
    //     const projectOption = createElement('option', ['project-option'], {textContent: key, value: key});

    //     appendElement(projects, [projectOption])
    // })
}
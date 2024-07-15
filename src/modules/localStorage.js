import { projects } from "./projects";
import { tasks } from "./tasks";

export function storeData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveProjects() {
    let storedProjects = localStorage.getItem('storedProjects');
    let deserializedProjects;

    if (storedProjects) { //if may laman
        deserializedProjects = JSON.parse(storedProjects);

        projects.length = 0;
        //ensures that projects === deserializedProjects even after reloading
        deserializedProjects.forEach(project => {
            projects.push(project);
        });
    } 
    else { //if null
        deserializedProjects = projects;
        storeData('storedProjects', projects); //initial storage
    }

    return deserializedProjects;
}

export function retrieveTasks() {
    let storedTasks = localStorage.getItem('storedTasks');
    let deserializedTasks;

    if (storedTasks) { //if may laman
        deserializedTasks = JSON.parse(storedTasks);

        Object.keys(tasks).forEach(task => {
            delete tasks[task];
        })
        //ensures that tasks === deserializedTasks
        Object.keys(deserializedTasks).forEach(task => {
            tasks[task] = deserializedTasks[task];
        })
    } 
    else { //if null
        deserializedTasks = tasks;
        storeData('storedTasks', tasks); //initial storage
    }

    return deserializedTasks;
}
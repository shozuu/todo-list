export const tasks = {};

export function createTask(taskTitle, taskDesc, taskPriority, taskDue, taskProject) {
    return {
        taskTitle, 
        taskDesc, 
        taskPriority, 
        taskDue, 
        taskProject
    }
}

//maybe create a function for every retrieval? like for today, tommorrow, all the completed, etc
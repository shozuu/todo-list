export const tasks = {
    'sample task': {
        taskDesc: 'description',
        taskDue: '2024-06-25',
        taskPriority: 'Low Priority',
        taskProject: 'Default',
        taskTitle: 'sample task'
    },
    'sample task2': {
        taskDesc: 'description2',
        taskDue: '2024-06-26',
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'sample task2'
    },
    'sample task3': {
        taskDesc: 'description3',
        taskDue: '2024-06-27',
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'sample task3'
    },
};

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
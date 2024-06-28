export const tasks = {
    'sample task': {
        taskDesc: 'description',
        taskDue: '2024-06-26',
        taskPriority: 'Low Priority',
        taskProject: 'Default',
        taskTitle: 'sample task'
    },
    'sample task2': {
        taskDesc: 'description2',
        taskDue: '2024-06-27',
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'sample task2'
    },
    'sample task3': {
        taskDesc: 'description3',
        taskDue: '2024-06-28',
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'sample task3'
    },
    'sample task4': {
        taskDesc: 'description4',
        taskDue: '2024-06-28',
        taskPriority: 'Medium Priority',
        taskProject: 'Sample',
        taskTitle: 'sample task4'
    },
    'sample task5': {
        taskDesc: 'description5',
        taskDue: '2024-06-29',
        taskPriority: 'High Priority',
        taskProject: 'Sample',
        taskTitle: 'sample task5'
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
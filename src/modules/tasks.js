export const tasks = {
    'sample task': {
        taskComplete: false,
        taskDesc: 'description',
        taskDue: '2024-07-03',
        taskPriority: 'Low Priority',
        taskProject: 'Default',
        taskTitle: 'sample task'
    },
    'sample task2': {
        taskComplete: false,
        taskDesc: 'description2',
        taskDue: '2024-07-03',
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'sample task2'
    },
    'sample task3': {
        taskComplete: false,
        taskDesc: 'description3',
        taskDue: '2024-07-04',
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'sample task3'
    },
    'sample task4': {
        taskComplete: false,
        taskDesc: 'description4',
        taskDue: '2024-07-04',
        taskPriority: 'Medium Priority',
        taskProject: 'Sample',
        taskTitle: 'sample task4'
    },
    'sample task5': {
        taskComplete: false,
        taskDesc: 'description5',
        taskDue: '2024-07-10',
        taskPriority: 'High Priority',
        taskProject: 'Sample',
        taskTitle: 'sample task5'
    },

};

export function createTask(taskTitle, taskDesc, taskPriority, taskDue, taskProject, taskComplete) {
    return {
        taskTitle, 
        taskDesc, 
        taskPriority, 
        taskDue, 
        taskProject,
        taskComplete
    }
}

//maybe create a function for every retrieval? like for today, tommorrow, all the completed, etc
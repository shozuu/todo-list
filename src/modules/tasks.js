import { getToday, getTom, getWithinMonth } from "./dateHandler";

export const tasks = {
    'Submit Project Report': {
        taskComplete: false,
        taskDesc: 'Finalize the project report and send it to the manager for review.',
        taskDue: getToday(),
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'Submit Project Report'
    },
    'Sprint Planning Meeting': {
        taskComplete: false,
        taskDesc: 'Conduct a team meeting to discuss the upcoming sprint tasks and timelines.',
        taskDue: getToday(),
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'Sprint Planning Meeting'
    },
    'Client Update and Prototype Delivery': {
        taskComplete: false,
        taskDesc: 'Update the client on the project status and deliver the initial prototype.',
        taskDue: getToday(),
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'Client Update and Prototype Delivery'
    },
    'Quarterly Financial Report': {
        taskComplete: false,
        taskDesc: 'Prepare and present the quarterly financial report to the board of directors.',
        taskDue: getTom(),
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'Quarterly Financial Report'
    },
    'Software Tools Training': {
        taskComplete: false,
        taskDesc: 'Organize and lead a training session on the new software tools for the team.',
        taskDue: getTom(),
        taskPriority: 'Low Priority',
        taskProject: 'Default',
        taskTitle: 'Software Tools Training'
    },
    'Marketing Strategy Meeting': {
        taskComplete: false,
        taskDesc: 'Develop and discuss the marketing strategy for the upcoming product launch.',
        taskDue: getTom(),
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'Marketing Strategy Meeting'
    },
    'Code Review Session': {
        taskComplete: true,
        taskDesc: 'Review the latest code changes with the development team.',
        taskDue: getTom(),
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'Code Review Session'
    },
    'Product Launch Preparation': {
        taskComplete: false,
        taskDesc: 'Prepare all materials and plans necessary for the product launch event.',
        taskDue: getWithinMonth(),
        taskPriority: 'High Priority',
        taskProject: 'Default',
        taskTitle: 'Product Launch Preparation'
    },
    'Employee Feedback Collection': {
        taskComplete: false,
        taskDesc: 'Collect feedback from employees regarding the new work-from-home policy.',
        taskDue: getWithinMonth(),
        taskPriority: 'Low Priority',
        taskProject: 'Default',
        taskTitle: 'Employee Feedback Collection'
    },
    'Website Maintenance': {
        taskComplete: false,
        taskDesc: 'Perform routine maintenance and updates on the company website.',
        taskDue: getWithinMonth(),
        taskPriority: 'Medium Priority',
        taskProject: 'Default',
        taskTitle: 'Website Maintenance'
    }   
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
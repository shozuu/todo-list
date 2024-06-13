import { renderToday, renderTommorrow, renderWeek, renderPlanned, renderCompleted } from "./ui.js";

export function listenEvents() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const addModalButton = document.querySelector('.addModal-button');

    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);

            switch (taskIndex) {
                case 0:
                    renderToday();
                    break;
                case 1:
                    renderTommorrow();
                    break;
                case 2:
                    renderWeek();
                    break;
                case 3:
                    renderPlanned();
                    break;
                case 4:
                    renderCompleted();
                    break;
                default:
                    break;
            }
        });
    });

    addTask.addEventListener('click', () => {
        modalBackdrop.classList.remove('hidden');
        addModal.classList.remove('hidden');

        modalBackdrop.addEventListener('click', () => {
            modalBackdrop.classList.add('hidden');
            addModal.classList.add('hidden');
        });
    });

    addModalButton.addEventListener('click', () => {
        const taskTitle = document.querySelector('.task-title').value;
        const taskDesc = document.querySelector('.task-desc').value;
        const taskPriority = document.querySelector('.task-priority');
        const taskDue = document.querySelector('.due-date');
        const taskProject = document.querySelector('.projects');

        console.log(taskTitle, taskDesc, taskPriority, taskDue, taskProject);
    });

    const modalGroup = document.querySelectorAll('.modal-group');

    modalGroup.forEach(group => {
        group.addEventListener('click', (e) => {
            const groupIndex = Array.from(modalGroup).indexOf(e.currentTarget);
            console.log(groupIndex);
        });
    });
}

import { renderToday, renderTommorrow, renderWeek, renderPlanned, renderCompleted } from "./ui.js";
import { setValue } from "./domManipulation.js";

export function listenEvents() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const addModalButton = document.querySelector('.addModal-button');
    const modalGroup = document.querySelectorAll('.modal-group');
    const priorityOptions = document.querySelector('.priority-options');
    const priorityOption = document.querySelectorAll('.priority-option');
    const taskPriority = document.querySelectorAll('.task-priority');

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

    modalGroup.forEach(group => {
        group.addEventListener('click', (e) => {
            const groupIndex = Array.from(modalGroup).indexOf(e.currentTarget);
            console.log(groupIndex);

            switch (groupIndex) {
                case 0:
                    // priorityOptions.classList.remove('hidden');
                    // priorityOption.forEach(option => {
                    //     option.addEventListener('click', () => {
                    //         // setValue(taskPriority, option.textContent)
                    //         console.log(taskPriority.textContent)
                    //     })
                    // });
                    // setPriority(currentSchedule); 
                    break;
                case 1:
                    // setDueDate(currentSchedule);
                    break;
                case 2:
                    // setProject(currentSchedule);
                    break;
                default:
                    break;
            }
        });
    });

    addModalButton.addEventListener('click', () => {
        const taskTitle = document.querySelector('.task-title').value;
        const taskDesc = document.querySelector('.task-desc').value;
        const taskPriority = document.querySelector('.task-priority').value;
        const taskDue = document.querySelector('.due-date');
        const taskProject = document.querySelector('.projects');

        console.log(taskTitle, taskDesc, taskPriority, taskDue, taskProject);


    });
}

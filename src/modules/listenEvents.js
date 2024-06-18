import { renderToday, renderTomorrow, renderWeek, renderPlanned, renderCompleted } from "./ui.js";
import { setDefault, setDuePlaceholder, setTomorrow } from "./domManipulation.js";
import { dateFormatter } from "./dateHandler.js";

export function listenEvents() {
    const navTasks = document.querySelectorAll('.nav-tasks');
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const form = document.querySelector('.form');
    const dueDate = document.querySelector('.due-date');
    const datePicker = document.querySelector('.date-picker');

    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);

            switch (taskIndex) {
                case 0:
                    renderToday();
                    setDefault();
                    break;
                case 1:
                    renderTomorrow();
                    setTomorrow();
                    break;
                case 2:
                    renderWeek();
                    setDefault();
                    break;
                case 3:
                    renderPlanned();
                    setDefault();
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

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            return;
        }

        const taskTitle = document.querySelector('.task-title').value;
        const taskDesc = document.querySelector('.task-desc').value;
        const taskPriority = document.querySelector('.task-priority').value;
        const taskDue = document.querySelector('.date-picker').value;
        const taskProject = document.querySelector('.projects');

        console.log(taskTitle, taskDesc, taskPriority, taskDue, taskProject);
    });

    dueDate.addEventListener('click', () => {
        datePicker.showPicker();
        datePicker.addEventListener('change', () => {
            setDuePlaceholder(dateFormatter(datePicker.value));
        })
    })
}
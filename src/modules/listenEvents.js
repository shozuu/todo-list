import { cloneAddModal, createDeleteModal, createRenameModal, displayModal, highlightSelected, resetAddModal, setDuePlaceholder, setProjectOption } from "./domManipulation.js";
import { dateFormatter } from "./dateHandler.js";
import { createProject, renameProj, projects as projectsArray, deleteProj, } from "./projects.js";
import { tasks, createTask } from "./tasks.js";
import { getTasks } from "./displayTasks.js";
import { storeData } from "./localStorage.js";

export const tasksNav = ['Today', 'Tomorrow', 'This Week', 'Planned', 'Completed'];

export function sidebarListener() {
    const sidebarButton = document.querySelector('.sidebar-icon');
    const secSidebarButton = document.querySelector('.second-sidebar-icon');
    const sidebar = document.querySelector('.sidebar');
    const navTasks = document.querySelectorAll('.nav-tasks');
    const navProjects = document.querySelectorAll('.nav-projects');
    const options = document.querySelectorAll('.options');
    const addProject = document.querySelector('.add-project');
    const backdrop = document.querySelector('.transparent-backdrop');
    const content = document.querySelector('.content');
    const contentBackdrop = document.querySelector('.content-backdrop');

    
    sidebarButton.addEventListener('click', () => {
        const currentWidth = window.innerWidth;

        if (currentWidth < 770) {
            contentBackdrop.classList.add('hidden');
        }

        sidebar.classList.add('hidden');
        content.classList.remove('inactive');
        secSidebarButton.classList.remove('hidden');
    })

    secSidebarButton.addEventListener('click', () => {
        const currentWidth = window.innerWidth;
        
        if (currentWidth > 770) {
            content.classList.add('inactive');
        }
        else { //if less than 770
            contentBackdrop.classList.remove('hidden');
        }
        
        sidebar.classList.remove('hidden');
        secSidebarButton.classList.add('hidden');
    })

    contentBackdrop.addEventListener('click', () => {
        sidebar.classList.add('hidden');
        contentBackdrop.classList.add('hidden');
        secSidebarButton.classList.remove('hidden');
    })

    navTasks.forEach(navTask => {
        navTask.addEventListener('click', (e) => {
            highlightSelected(e.currentTarget)
            const taskIndex = Array.from(navTasks).indexOf(e.currentTarget);
            getTasks(tasksNav[taskIndex]);
        });
    });

    navProjects.forEach(project => {
        project.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-group') || e.target.classList.contains('options') || e.target.classList.contains('rename-project') || e.target.classList.contains('delete-project')) return;

            highlightSelected(e.currentTarget);
            if(e.target.classList.contains('options')) return;
            const projectIndex = Array.from(navProjects).indexOf(e.currentTarget)
            getTasks(projectsArray[projectIndex]);
            setProjectOption(projectsArray[projectIndex]);
        })
        project.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('selected')) return;
            const options = e.target.querySelector('.options');
            const count = e.target.querySelector('.count');

            options.classList.remove('hidden');
            count.classList.add('hidden');
        })
        project.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('selected')) return;
            const options = e.target.querySelector('.options');
            const count = e.target.querySelector('.count');
            
            if (!e.target.querySelector('.option-group').classList.contains('hidden')) return;

            options.classList.add('hidden');
            count.classList.remove('hidden');
        })
    });

    options.forEach(option => { //the 3 bullet points
        let listenEventFlag = false;
        option.addEventListener('click', (e) => {
            if (e.target.classList.contains('rename-project') || e.target.classList.contains('delete-project') || e.target.classList.contains('option-group')) return; 
            //to make sure all the declaration works

            const currentOptionIndex = Array.from(options).indexOf(e.target);

            Array.from(options).forEach((option, index) => {
                if (currentOptionIndex === index) return; 
                //this will skip when option is clicked 2nd time to close
                
                if (option.closest('.nav-projects').classList.contains('selected')) {
                    //this will prevent hiding the option icon
                    option.querySelector('.option-group').classList.add('hidden');
                    return;
                }

                if (!option.classList.contains('hidden')) {
                    //closes all the opened optionGroup of other projects except the current target
                    option.classList.add('hidden');
                    option.querySelector('.option-group').classList.add('hidden');
                    option.parentElement.querySelector('.count').classList.remove('hidden');
                    option.parentElement.classList.remove('on-view');
                }
            });

            const optionGroup = e.target.children[0];
            const renameProject = e.target.querySelector('.rename-project');
            const deleteProject = e.target.querySelector('.delete-project');

            e.target.closest('.nav-projects').classList.add('on-view');

            if (!optionGroup.classList.contains('hidden')) { //hides the option on 2nd click
                e.target.closest('.nav-projects').classList.remove('on-view')
                optionGroup.classList.add('hidden');
                backdrop.classList.add('hidden');
                return;
            }

            optionGroup.classList.remove('hidden'); //contains rename/delete of current target
            updateOptionGroupPosition(); //initial position
            backdrop.classList.remove('hidden');

            function updateOptionGroupPosition() {
                const option = e.target.getBoundingClientRect();
                //this returns an object containing the position of ••• relative to the viewport

                optionGroup.style.top = `${option.bottom + window.scrollY}px`;
                optionGroup.style.left = `${option.left + window.scrollX}px`;
            }
            
            function reset() {
                navProjects.forEach(project => {
                    if (project.classList.contains('selected')) {
                        return;
                    }
                    project.querySelector('.options').classList.add('hidden');
                    project.querySelector('.count').classList.remove('hidden');
                })

                optionGroup.classList.add('hidden');
                backdrop.classList.add('hidden');
                e.target.closest('.nav-projects').classList.remove('on-view');
            }
            
            if (listenEventFlag) return; //this prevents duplicating of 
            listenEventFlag = true; //event listeners to the elements below

            sidebar.addEventListener('scroll', updateOptionGroupPosition);

            backdrop.addEventListener('click', () => {
                reset();
                if (!contentBackdrop.classList.contains('hidden')) {
                    contentBackdrop.classList.add('hidden');
                    sidebar.classList.add('hidden');
                    secSidebarButton.classList.remove('hidden');
                }
            });

            renameProject.addEventListener('click', (e) => {
                const parentElement = e.target.closest('.options').parentElement;
                const oldProjectTitle = parentElement.querySelector('.name').dataset.value;

                reset();
                createRenameModal(oldProjectTitle);

                const confirm = document.querySelector('.rename-project-confirm');
                const cancel = document.querySelector('.rename-project-cancel');
                const renameBackdrop = document.querySelector('.rename-backdrop');
                const renameModal = document.querySelector('.rename-modal');

                confirm.addEventListener('click', () => {
                    const newProjectTitle = document.querySelector('.new-project-title').value;

                    if (newProjectTitle === '') return;
                    renameProj(oldProjectTitle, newProjectTitle);

                    renameBackdrop.remove();
                    renameModal.remove();
                })
                cancel.addEventListener('click', () => {
                    renameBackdrop.remove();
                    renameModal.remove();
                })

            })

            deleteProject.addEventListener('click', (e) => {
                const parentElement = e.target.closest('.options').parentElement;
                const projectTitle = parentElement.querySelector('.name').dataset.value;
                
                reset();
                createDeleteModal(projectTitle);

                const confirm = document.querySelector('.delete-project-confirm');
                const cancel = document.querySelector('.delete-project-cancel');
                const deleteBackdrop = document.querySelector('.delete-backdrop');
                const deleteModal = document.querySelector('.delete-modal');

                confirm.addEventListener('click', () => {
                    deleteProj(projectTitle);
                    deleteBackdrop.remove();
                    deleteModal.remove();
                })
                cancel.addEventListener('click', () => {
                    deleteBackdrop.remove();
                    deleteModal.remove();
                })
            })
        })
    })

    addProject.addEventListener('click', () => {
        const addProjectPopup = document.querySelector('.add-project-popup');
        const addProjectButton = document.querySelector('.add-project');
        const addButton = document.querySelector('.add-project-confirm');
        const cancelButton = document.querySelector('.add-project-cancel');
        const projectTitle = document.querySelector('.project-title');

        addProjectPopup.classList.remove('hidden');
        addProjectButton.classList.add('hidden');

        addButton.addEventListener('click', () => {
            createProject(projectTitle.value);
            addProjectPopup.classList.add('hidden');
            addProjectButton.classList.remove('hidden');
            projectTitle.value = '';
        })

        cancelButton.addEventListener('click', () => {
            addProjectPopup.classList.add('hidden');
            addProjectButton.classList.remove('hidden');
            projectTitle.value = '';
        })
    });
}

export function taskListener() {
    const addTask = document.querySelector('.add-task');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const addModal = document.querySelector('.add-modal');
    const form = document.querySelector('.form');
    const dueDate = document.querySelector('.due-date');
    const taskCard = document.querySelectorAll('.taskCard');
    const checkboxLabels = document.querySelectorAll('.custom-checkbox');

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
        const taskProject = document.querySelector('.projects').value;
        const taskComplete = document.querySelector('.hidden-checkbox').checked;

        let taskFlag = false;
        Object.keys(tasks).forEach(task => {
            if (task === taskTitle) {
                alert(`Task "${taskTitle}" already exist`);
                taskFlag = true;
            }
        })
        if (taskFlag) {
            form.reset();
            modalBackdrop.classList.add('hidden');
            addModal.classList.add('hidden');
            return;
        }

        const task = createTask(taskTitle, taskDesc, taskPriority, taskDue, taskProject, taskComplete);
        tasks[task.taskTitle] = task;
        storeData('storedTasks', tasks);
        form.reset();
        getTasks(document.querySelector('.tag').dataset.value);

        modalBackdrop.classList.add('hidden');
        addModal.classList.add('hidden');
    });

    dueDate.addEventListener('click', () => {
        const datePicker = document.querySelector('.date-picker');

        datePicker.showPicker();
        datePicker.addEventListener('change', () => {
            setDuePlaceholder(dateFormatter(datePicker.value));
        })
    })

    const clone = cloneAddModal();

    checkboxLabels.forEach(label => {
        label.addEventListener('click', (e) => {
            const checkbox = e.target.previousElementSibling;
            const checkboxIndex = Array.from(checkboxLabels).indexOf(e.currentTarget);
            const value = checkboxLabels[checkboxIndex].dataset.value;

            if (!tasks[value].taskComplete) { //if false
                tasks[value].taskComplete = true;
                checkbox.checked = true;
            }
            else {
                tasks[value].taskComplete = false;
                checkbox.checked = false;
            }
            storeData('storedTasks', tasks);
            setTimeout(() => {
                getTasks(document.querySelector('.tag').dataset.value);
            }, 300);
        })
    })

    taskCard.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName != 'DIV' && e.target.tagName != 'S') return; //prevents the trigger of modal
            const currentTask = e.currentTarget.dataset.value;
            displayModal(tasks[currentTask]);
            modalBackdrop.classList.remove('hidden');
            addModal.classList.remove('hidden');

            modalBackdrop.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
                addModal.classList.add('hidden');
                resetAddModal(clone);
                getTasks(document.querySelector('.tag').dataset.value);
            });

            const deleteButton = document.querySelector('.deleteTask-button');
            const editButton = document.querySelector('.editTask-button');

            editButton.addEventListener('click', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    alert('Task Title and/or Description cannot be empty')
                    return;
                }

                const taskTitle = document.querySelector('.task-title').value;
                const taskDesc = document.querySelector('.task-desc').value;
                const taskPriority = document.querySelector('.task-priority').value;
                const taskDue = document.querySelector('.date-picker').value;
                const taskProject = document.querySelector('.projects').value;
                const taskComplete = document.querySelector('.hidden-checkbox').checked;

                const task = createTask(taskTitle, taskDesc, taskPriority, taskDue, taskProject, taskComplete);

                if (currentTask != task.taskTitle) {//the title has been edited
                    tasks[task.taskTitle] = task;
                    delete tasks[currentTask];
                }
                else {
                    tasks[task.taskTitle] = task;
                }
                storeData('storedTasks', tasks);
                resetAddModal(clone);
                modalBackdrop.classList.add('hidden');
                addModal.classList.add('hidden');
                getTasks(document.querySelector('.tag').dataset.value);
            })

            deleteButton.addEventListener('click', () => {
                delete tasks[currentTask];
                storeData('storedTasks', tasks);
                resetAddModal(clone);
                modalBackdrop.classList.add('hidden');
                addModal.classList.add('hidden');
                getTasks(document.querySelector('.tag').dataset.value);
            })
        })
    })
}
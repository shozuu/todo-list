export function initializeMediaQuery() {
    const mediaQuery = window.matchMedia('(min-width: 770px)');

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery); //initial run to check the current width
}

function handleMediaQueryChange(event) {
    const content = document.querySelector('.content');
    const contentBackdrop = document.querySelector('.content-backdrop');
    const sidebar = document.querySelector('.sidebar');
    const secSidebarButton = document.querySelector('.second-sidebar-icon');
    const transparentBackdrop = document.querySelector('.transparent-backdrop');

    if (event.matches) { //more than 770px
        if (!sidebar.classList.contains('hidden')) { //if sidebar is active
            content.classList.add('inactive');
            contentBackdrop.classList.add('hidden'); //enclose in if
        }
    } 
    else { //less than 770px
        content.classList.remove('inactive');
        sidebar.classList.add('hidden');
        secSidebarButton.classList.remove('hidden');
        transparentBackdrop.classList.add('hidden'); //need also to reset opened options
    }
}

//min-width: 770 = true if 770 or more && false if below 770
//max-width: 770 = true if 770 or less && false if more than 770
import sidebarIcon from '../assets/Vector.svg';

export function test() {
    const element = document.createElement('div');
    const myIcon = new Image();
    myIcon.src = sidebarIcon;
    
    element.appendChild(myIcon)
    document.body.appendChild(element);
}


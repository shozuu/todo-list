import { format, add } from 'date-fns';

export function dateFormatter(value) {
    return format(value, 'EEE, dd MMM');
}

export function getToday() { //no need to format
    const today = new Date();
    return format(today, 'EEE, dd MMM');
}

export function getMin() { //need to be passed to dateFormatter
    const today = new Date();
    return format(today, 'yyyy-MM-dd');
}

export function getTom() { //need to be passed to dateFormatter
    const today = new Date();
    const tomorrow = add(today, { days: 1 });
    return format(tomorrow, 'yyyy-MM-dd');
}
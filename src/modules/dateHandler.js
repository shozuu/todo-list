import { format, add, startOfWeek, endOfWeek, parse, isWithinInterval } from 'date-fns';

export function dateFormatter(value) {
    return format(value, 'EEE, dd MMM');
}

export function getToday() { //no need to format
    const today = new Date();
    return format(today, 'yyyy-MM-dd');
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

export function getWeekRange(value) {
    const today = new Date(); 
    
    //starts on monday (change to 0 if sunday)
    const weekStart = startOfWeek(today, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 })

    //convert string 'value' to Date object
    const checkDate = parse(value, 'yyyy-MM-dd', new Date());

    const isInThisWeek = isWithinInterval(checkDate, { start: weekStart, end: weekEnd })

    return isInThisWeek;
}
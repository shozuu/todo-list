import { format } from 'date-fns';
import { setDuePlaceholder } from "./domManipulation.js";

export function dateFormatter(value) {
    const date = format(value, 'EEE, dd MMM');
    setDuePlaceholder(date);
}
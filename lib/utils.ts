import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** "Aakash Warke" -> "AW" */
export function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

/** Splits a string into words, each word into characters — for staggered text animation. */
export function splitIntoWords(text: string) {
    return text.split(' ').map((word) => ({ word, chars: Array.from(word) }));
}

import { writable } from 'svelte/store';
import { formatDateToString } from '$lib/date';

export const currentDate = writable(formatDateToString(new Date()));
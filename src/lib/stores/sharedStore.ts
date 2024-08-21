import { writable } from 'svelte/store';
import { formatDateToString } from '$lib/utils/date';
import { browser } from '$app/environment';

export const currentDate = writable(formatDateToString(new Date()));
console.log('currentDate', currentDate);
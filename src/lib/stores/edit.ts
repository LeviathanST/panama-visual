import { writable } from 'svelte/store';

export const selectedItem = writable<string>("Project Manager");

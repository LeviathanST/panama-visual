import {
	derived,
	fromStore,
	get,
	readable,
	readonly,
	toStore,
	writable
} from 'svelte/store';

// Create a store to control language (Vietnamese and English)
export type Language = 'vi' | 'en';
export const language = writable<Language>('en');

// Helper functions to change language
export const setVietnamese = () => language.set('vi');
export const setEnglish = () => language.set('en');
export const toggleLanguage = () => {
	const currentLang = get(language);
	language.set(currentLang === 'en' ? 'vi' : 'en');
};

// Readonly version for components that should only read the language
export const currentLanguage = readonly(language);

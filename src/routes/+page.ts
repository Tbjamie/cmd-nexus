import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('https://fdnd-agency.directus.app/items/CMD_Base');
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = await res.json();
	const items = data.data;

	return {
		items
	};
};

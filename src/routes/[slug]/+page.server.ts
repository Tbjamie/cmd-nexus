import type { Item } from '$lib/types/itemType';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await fetch('https://fdnd-agency.directus.app/items/CMD_Base');

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	const data = await res.json();
	const items = data.data;

	const item = items.find(
		(item: Item) =>
			item.naam
				?.toLowerCase()
				.replace(/[\s:]+/g, '-')
				.replace(/[^\w-]+/g, '') === params.slug
	);

	return {
		item
	};
};

import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import Fuse from 'fuse.js';
import type { Item } from '$lib/types/itemType';

async function fetchItems(fetchUrl: string) {
	try {
		const response = await fetch(fetchUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch data from the API');
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const searchInput = data.get('search-bar');

		if (!searchInput || typeof searchInput !== 'string') {
			return fail(400, { message: 'Invalid search input' });
		}

		const allItems = await fetchItems('https://fdnd-agency.directus.app/items/CMD_Base');
		const items: Item[] = allItems.data;

		if (!items || items.length === 0) {
			return fail(500, { message: 'No items available for search' });
		}

		// Split the search input into words/phrases for partial matching
		const searchParts = searchInput.split(/\s+/).filter((part) => part.length > 2); // Ignore very short words

		const fuse = new Fuse(items, {
			keys: [
				'naam',
				'alternatieve_naam',
				'soort',
				'ondertitel',
				'korte_beschrijving',
				'toepassing',
				'meer_bij_personen',
				'meer_bij_vak',
				'rel_thema',
				'rel_beroepstaak',
				'rel_methode',
				'rel_vakgebied',
				'rel_vak'
			],
			includeScore: true,
			threshold: 0.3
		});

		// Direct substring match on 'naam' field for any part of the search
		const directMatches = items.filter((item) =>
			searchParts.some(
				(part) =>
					typeof item.naam === 'string' && item.naam.toLowerCase().includes(part.toLowerCase())
			)
		);

		let filteredItems: Item[] = [];
		let resultsLength = 0;

		// If direct matches found, prioritize them
		if (directMatches.length > 0) {
			filteredItems = directMatches;
			resultsLength = filteredItems.length;
		} else if (searchParts.length > 1) {
			const phraseResults = fuse.search(searchInput);
			const phraseMap = new Map<string, Item>();
			for (const result of phraseResults) {
				if (result.item.id !== undefined) {
					phraseMap.set(String(result.item.id), result.item);
				}
			}
			filteredItems = Array.from(phraseMap.values());
			resultsLength = filteredItems.length;

			// If not enough results, fall back to partial matching
			if (resultsLength < 3) {
				const resultsMap = new Map<string, Item>(phraseMap);
				for (const part of searchParts) {
					const partResults = fuse.search(part);
					for (const result of partResults) {
						if (result.item.id !== undefined) {
							resultsMap.set(String(result.item.id), result.item);
						}
					}
				}
				filteredItems = Array.from(resultsMap.values());
				resultsLength = filteredItems.length;
			}
		} else {
			// Single word search
			const resultsMap = new Map<string, Item>();
			for (const part of searchParts) {
				const partResults = fuse.search(part);
				for (const result of partResults) {
					if (result.item.id !== undefined) {
						resultsMap.set(String(result.item.id), result.item);
					}
				}
			}
			filteredItems = Array.from(resultsMap.values());
			resultsLength = filteredItems.length;
		}

		if (resultsLength === 0) {
			return { noResults: true };
		}

		if (resultsLength > 0 && resultsLength <= 3) {
			console.log('Total Items:', resultsLength);
			return { resultFound: true, results: filteredItems };
		} else {
			return {
				allResults: filteredItems
			};
		}
	}
};

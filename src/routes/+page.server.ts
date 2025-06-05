import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import Fuse from 'fuse.js';
import type { Item } from '$lib/types/itemType';

let questionIndex = 0;

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

export const actions = {
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

		const fuse = new Fuse(items, {
			keys: [
				'naam',
				'alternatieve_naam',
				'soort',
				'ondertitel',
				'korte_beschrijving',
				'toepassing',
				'meer_bij_personen',
				'meer_bij_vak'
			],
			includeScore: true,
			threshold: 0.2
		});

		const searchItem = fuse.search(searchInput);

		const filteredItems = searchItem.map((result) => {
			return result.item;
		});

		const resultsLength = filteredItems.length;
		const followUpQuestion = [
			{
				type: 'vakgebied',
				text: `We hebben ${resultsLength} resultaten gevonden. In welk vakgebied valt het onderwerp waar je naar zoekt?`
			},
			{
				type: 'thema',
				text: `We hebben ${resultsLength} resultaten gevonden. Binnen welk thema valt het onderwerp dat je zoekt?`
			},
			{
				type: 'soort',
				text: `We hebben ${resultsLength} resultaten gevonden. Kan je specifieker zijn over het soort item waar je naar zoekt?`
			}
		];

		function getFollowUpQuestion() {
			const question = followUpQuestion[questionIndex].text;
			questionIndex = (questionIndex + 1) % followUpQuestion.length;
			return question;
		}

		if (resultsLength <= 5) {
			console.log('Total Items:', resultsLength);
			return { resultFound: true, results: filteredItems };
		} else {
			const feedbackMessage = getFollowUpQuestion();
			console.log(feedbackMessage);
			return {
				resultFound: false,
				feedbackMessage
			};
		}
	}
} satisfies Actions;

// GET DATA FROM URL AND FETCH IT > SHOW DATA
// GET DATA FROM URL AND FETCH IT >  APPLY FILTERS > SHOW DATA
// GET DATA FROM URL AND FETCH IT > IF DATA.LENGTH > 12 FOLLOW UP QUESTION > APPLY FILTERS > SHOW DATA

// GET DATA FROM BACKEND & FILTER IN THE FRONTEND

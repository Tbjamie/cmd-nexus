<script lang="ts" module>
	import { onMount } from 'svelte';
	import Searchbar from '$lib/components/inputs/Searchbar.svelte';
	import { page } from '$app/state';
	import type { Item } from '$lib/types/itemType';
	import Fuse from 'fuse.js';

	// straks verwijderen
	import Card from '$lib/components/cards/Card.svelte';
</script>

<script lang="ts">
	let prompt = $state('');
	let filteredItems: Item[] = $state([]);
	let items: Item[];

	// test item
	const testItemsArray = (page.data?.items || []).slice(0, 5);
	const testItem = page.data?.items?.[1]
	console.log('item', testItem);

	// Transform the difficulty rating to a more readable format
	function getRating(moeilijkheid: string) {
		switch (moeilijkheid) {
			case '*':
				return 'Easy';
			case '**':
				return 'Medium';
			case '***':
				return 'Moeilijk';
			default:
				return moeilijkheid;
		}
	}

	onMount(() => {
		items = page.data?.items;
		console.log('items', items);

		$effect(() => {
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
				minMatchCharLength: 2,
				threshold: 0.3
			});

			let searchItem = fuse.search(prompt, {
				limit: 3
			});

			filteredItems = searchItem.map((item) => {
				return item.item;
			});
		});
	});
</script>

<svelte:head>
	<title>CMD Nexus</title>
	<meta
		name="description"
		content="CMD Nexus is hét platform voor alle CMD studenten van de Hogeschool van Amsterdam. Vind hier alle kennis, tools, tutorials en resources die je nodig hebt voor je Communication and Multimedia Design opleiding."
	/>
	<meta
		name="keywords"
		content="CMD, Nexus, platform, studenten, kennis, hulp, CMD Kennis, kennisbank, CMD Kennisbank, HvA, Hogeschool van Amsterdam, Communication and Multimedia Design, digital design, interactie ontwerp, UX, UI, web development, frontend"
	/>
	<meta property="og:title" content="CMD Nexus" />
	<meta
		property="og:description"
		content="CMD Nexus is hét platform voor alle CMD studenten van de Hogeschool van Amsterdam. Vind hier alle kennis, tools, tutorials en resources die je nodig hebt voor je Communication and Multimedia Design opleiding."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<section class="main-page-spacing">
	<div class="overview-page-wrapper">
		<Searchbar bind:value={prompt} relatedItems={filteredItems} promptPlaceholder="Zoek naar kennis, tools, tutorials en meer..." />
		<div class="prompt-header-information-wrapper">
			<section class="prompt-header-search-wrapper">
				<p class="">gezocht op:</p>
				<h2>{prompt}</h2>
			</section>
			<span>resultaten gevonden</span>
		</div>
		<!-- filter comp -->
		<div class="grid-page">
			{#each testItemsArray as item}
				<Card
					id={item.id}
					href={`/tools/${item.id}`}
					variant="normal"
					tag={item.rel_vakgebied}
					title={item.naam}
					labelType={item.soort}
					description={item.korte_beschrijving}
					rating={getRating(item.moeilijkheid)}
					mostRelevant={item.soort === 'Beroepstaak'}
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	.main-page-spacing {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		padding-bottom: 20vh;
		position: relative;
	}

	.overview-page-wrapper {
		width: 100%;
		/* max-width: 1200px; */
		display: grid;
		grid-template-columns: minmax(300px, 360px) 1fr;
		grid-template-rows: 1fr 1fr;
		column-gap: 3rem;
		row-gap: 3.5rem;
	}

	.prompt-header-information-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;

		span {
			display: flex;
			align-self: baseline;
		}
	}
	
	.prompt-header-search-wrapper {
		display: flex;
		gap: 0.2rem;
		flex-direction: column;
		align-items: flex-start;
		align-self: baseline;
	}

	.grid-page {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding: 0 1rem;
	}
</style>
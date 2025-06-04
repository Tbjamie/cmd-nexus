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

	let searchQuery = page.url.searchParams.get('search-bar') || '';
	console.log('searchQuery', searchQuery);

	// test item
	const testItemsArray = (page.data?.items || []).slice(0, 4);

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
				<h2>{searchQuery}</h2>
			</section>
			<span>resultaten gevonden</span>
		</div>
		<!-- filter comp -->
		<div class="grid-page-container">
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
						mostRelevant={item.soort === 'Principe'}
					/>
				{/each}
			</div>
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
		padding-top: 6rem;
		position: relative;
	}

	.overview-page-wrapper {
		width: 100%;
		height: 100%;
		padding-top: 2rem;
		/* max-width: 1200px; */
		display: grid;
		grid-template-columns: minmax(300px, 360px) 1fr;
		grid-template-rows: minmax(60px, 64px) minmax(400px, 700px);
		column-gap: 2rem;
		row-gap: 2.6rem;
	}

	.prompt-header-information-wrapper {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		padding-left: 1.4rem;

		span {
			display: flex;
			align-self: baseline;
			text-align: right;
		}
	}

	:global(.search-wrapper) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.prompt-header-search-wrapper {
		display: flex;
		gap: 0.2rem;
		flex-direction: column;
		align-items: flex-start;
		align-self: baseline;

		> h2 {
			text-align: left;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			width: 100%;
		}
	}

	.grid-page-container {
		container-type: inline-size;
		container-name: grid-page;
		grid-column: 2 / 3;
		grid-row: 2 / 3;
  height: 100vh;
  overflow-y: auto;
		width: 100%;
		position: relative;
	}

	.grid-page {
		display: grid;
	}

	:global(footer) {
		display: none;
		opacity: 0;
	}

	:global(header.s-7IPF32Wcq3s8) {
		padding: 2rem 4rem;
	}

	@container grid-page (max-width: 800px) {
		.grid-page {
			grid-template-columns: 1fr;
			gap: 1.5rem;

			&::after {
				content: '<- Nog 2 resultaten';
				color: var(--white);
				position: absolute;
				bottom: 2rem;
				right: -6rem;
				transform: rotate(-90deg);
			}
		}
	}

	@container grid-page (min-width: 801px) {
		.grid-page {
			grid-template-columns: repeat(2, minmax(200px, 1fr));
			gap: 1.5rem;
		}
	}

	@media screen and (max-width: 768px) {
	}

	@media screen and (max-width: 1000px) {
		.overview-page-wrapper {
			grid-template-rows: 60px 0fr 460px;
		}

		:global(.search-wrapper) {
			grid-column: 1 / 3;
			grid-row: 1 / 2;
		}

		.prompt-header-information-wrapper {
			grid-row: 2 / 3;
			grid-column: 1 / 3;
			padding: 0 1.4rem;
		}

		.grid-page-container {
			grid-column: 1 / 3;
			grid-row: 3 / 4;
		}
	}

</style>
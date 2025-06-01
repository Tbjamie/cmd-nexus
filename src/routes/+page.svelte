<script lang="ts" module>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import AiStarIcon from '$lib/assets/icons/ai-star-icon.svg?component';
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
	const testItemsArray = (page.data?.items || []).slice(0, 6);
	const testItem = page.data?.items?.[1]
	console.log('item', testItem);

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
		const heading = document.querySelector('h1');
		const paragraph = document.querySelector('p');
		const aiStarIcon = document.querySelector('.ai-star-icon');

		items = page.data?.items;

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

		gsap.fromTo(
			aiStarIcon,
			{
				opacity: 0
			},
			{
				opacity: 1,
				duration: 1,
				ease: 'power2.out'
			}
		);

		gsap.fromTo(
			[paragraph, heading],
			{
				opacity: 0,
				y: 10
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: 'power2.out',
				stagger: 0.2
			}
		);
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
	
	<AiStarIcon class="ai-star-icon" />

	<p>Welkom bij CMD Nexus</p>
	<h1 class="h1">Hoe kan ik je helpen?</h1>

	<div class="search-autocomplete-wrapper">
		<Searchbar bind:value={prompt} relatedItems={filteredItems} />
	</div>

</section>
<!-- straks verwijderen -->
<section class="main-page-spacing">
	<div class="grid-page">
	{#each testItemsArray as item}
		<Card
			id="{item.id}"
			href={`/tools/${item.id}`}
			variant="normal"
			tag="{item.rel_vakgebied}"
			title="{item.naam}"
			labelType="{item.soort}"
			description="{item.korte_beschrijving}"
			rating="{getRating(item.moeilijkheid)}"
		/>
	{/each}
	</div>
</section>

<style>
	.grid-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding: 0 1rem;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		padding-bottom: 20vh;
		position: relative;
	}

	section::after {
		content: '';
		position: absolute;
		top: -50%;
		width: 100%;
		/* background: radial-gradient(ellipse at center, var(--purple-light), var(--purple-dark)); */
		border-radius: 9999px;
		aspect-ratio: 1 / 1;
		opacity: 0.4;
		filter: blur(100px);
		z-index: -1;
	}

	:global(.ai-star-icon) {
		width: 3.5rem;
		height: 3.5rem;
		margin-bottom: 1.5rem;

		color: var(--purple-white);
	}

	p {
		margin-bottom: 0.75rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.search-autocomplete-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media screen and (min-width: 768px) {
		section::after {
			top: -100%;
			width: 75%;
		}
	}
</style>

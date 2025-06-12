<script lang="ts" module>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import Searchbar from '$lib/components/inputs/Searchbar.svelte';
	import { page } from '$app/state';
	import type { Item } from '$lib/types/itemType';
	import Fuse from 'fuse.js';
	import { pageView } from '$lib/stores/pageView.svelte';
	import NexusLogoFull from '$lib/assets/icons/logo-full-name-icon.svg?component';
	import QuestionComponent from '$lib/components/inputs/QuestionComponent.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import FilterBar from '$lib/components/inputs/FilterBar.svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import AnimatingStar from '$lib/components/AnimatingStar.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import FilterIcon from '$lib/assets/icons/filter-icon.svg?component';
</script>

<script lang="ts">
	let prompt = $state('');
	let screenWidth = $state(0);
	let filterOpen = $state(false);
	let filteredItems: Item[] = $state([]);
	let items: Item[] = $state([]);
	let starAnimationTimeout: ReturnType<typeof setTimeout> | null = null;
	let formResult: any;
	let searchResults: any = $state(null);
	let allResults: any = $state(null);
	let resultsFound = $state(false);
	let viewResults = $state([]);
	let submit = $state(false);

	function filterToggle() {
		filterOpen = !filterOpen;
	}

	$effect(() => {
		screenWidth >= 1024 ? (filterOpen = false) : (filterOpen = false);
	});

	$effect(() => {
		formResult = page.form;

		searchResults = formResult?.results;
		allResults = formResult?.allResults;
	});

	$effect(() => {
		resultsFound = searchResults && searchResults.length > 0;

		if (resultsFound) {
			pageView.view = 'overview';
		} else {
			pageView.view = 'nexus';
		}
	});

	onMount(() => {
		const heading = document.querySelector('h1');
		const paragraph = document.querySelector('p');

		document.addEventListener('resize', () => {
			screenWidth = window.innerWidth;
		});

		document.addEventListener('submit', () => {
			submit = true;
			setTimeout(() => {
				submit = false;
			}, 2000);
		});

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

		if (pageView.view === 'nexus') {
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
		}
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

{#key pageView.view}
	<div in:fly={{ y: 50, duration: 500, delay: 100, easing: cubicOut }}>
		{#if pageView.view === 'nexus'}
			<section class="main-page-spacing nexus-section">
				<AnimatingStar {submit} {prompt} />

				<QuestionComponent bind:prompt {filteredItems} {allResults} bind:viewResults />
				{#if page.form?.noResults}
					<p>
						Geen resultaten gevonden voor "{page.url.searchParams
							.get('search')
							?.replace(/-/g, ' ')
							.replace(/\b\w/g, (c) => c.toUpperCase())}"
					</p>
				{/if}
			</section>

			<footer>
				<p>copyright</p>
				<NexusLogoFull class="logo" />
			</footer>
		{/if}

		{#if pageView.view === 'overview'}
			<section class="main-page-spacing relative">
				<div class="overview-page-wrapper">
					<div class="overview-page-header">
						<Searchbar style="overview" bind:value={prompt} relatedItems={filteredItems} />
						<IconButton on:click={filterToggle} class="filter-icon">
							<FilterIcon class="filter-icon-button" />
						</IconButton>
						<div class="prompt-header-information-wrapper">
							<section class="prompt-header-search-wrapper">
								<p>gezocht op:</p>
								<h2>
									{resultsFound
										? page.url.searchParams
												.get('search')
												?.replace(/-/g, ' ')
												.replace(/\b\w/g, (c) => c.toUpperCase())
										: 'Alle resultaten'}
								</h2>
							</section>
							<span
								>{resultsFound
									? searchResults.length
									: viewResults.length > 0
										? viewResults.length
										: items.length}
								resultaten gevonden</span
							>
						</div>
					</div>
					<div class="overview-page-content">
						<FilterBar className={filterOpen ? 'is-active' : ''} {items} />
						<div class="grid-page-container">
							<div class="grid-page">
								{#each searchResults ? searchResults : viewResults.length > 0 ? viewResults : items as item}
									<Card
										id={item.id as string | undefined}
										href="/{item.naam
											? item.naam
													.toLowerCase()
													.replace(/[\s:]+/g, '-')
													.replace(/[^\w-]+/g, '')
											: ''}"
										variant="normal"
										mostRelevant={searchResults ? true : viewResults.length > 0 ? true : false}
										tag={item.rel_vakgebied as string | undefined}
										title={item.naam}
										labelType={item.soort as 'methode' | 'principe' | 'beroepstaak'}
										description={item.korte_beschrijving}
									/>
									<!-- TODO: If there is more than x items load more based on scroll: JAMIE BOAT TEST -->
								{/each}
							</div>
						</div>
					</div>
				</div>
			</section>
		{/if}
	</div>
{/key}

<style>
	:global(.search-wrapper.overview) {
		padding: 1rem;
		flex: 0 0 calc(90% - 2.4rem);
	}

	:global(.icon-button.filter-icon) {
		display: none;
		rotate: -90deg;
	}

	:global(.filterbar-spacing) {
		grid-row: 2;
	}

	@view-transition {
		navigation: auto;
	}

	/* OVERVIEW */
	.overview-page-wrapper {
		width: 100%;
		height: 100%;
	}

	.prompt-header-information-wrapper {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		/* padding-left: 2.4rem; */

		span {
			display: flex;
			align-self: baseline;
			text-align: right;
			font-weight: 300;
		}
	}

	:global(.search-wrapper) {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.overview-page-header {
		width: 100%;
		height: 100%;
		padding: 2rem 0rem;

		display: grid;
		grid-template-columns: minmax(300px, 360px) 1fr;
		column-gap: 1rem;

		position: sticky;
		background-color: var(--black);
		top: 0;
		left: 0;
		z-index: 10;

		@media screen and (max-width: 1024px) {
			padding: 2rem 1rem;

			display: flex;
			flex-wrap: wrap;
			gap: 2em;
			align-items: center;
			justify-content: space-between;
		}

		@media screen and (max-width: 768px) {
			padding: 1em 0;
		}
	}

	.overview-page-content {
		display: grid;
		grid-template-columns: minmax(300px, 360px) 1fr;
		grid-template-rows: 1fr;
		column-gap: 1rem;
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
			font-weight: 500;
		}

		p {
			margin: 0;
			font-weight: 300;
		}
	}

	.grid-page-container {
		container-type: inline-size;
		container-name: grid-page;
		grid-column: 2 / 3;
		width: 100%;
		position: relative;

		/* padding: 1rem; */
	}

	.grid-page {
		display: grid;
	}

	@container grid-page (max-width: 768px) {
		.grid-page {
			display: flex;
			flex-direction: column;
			align-items: baseline;
			gap: 1.5rem;
			position: relative;
			padding: 1rem;
		}
	}

	@container grid-page (min-width: 769px) {
		.grid-page {
			grid-template-columns: repeat(2, minmax(200px, 1fr));
			gap: 1.5rem;
		}
	}

	@media screen and (max-width: 1024px) {
		:global(.icon-button.filter-icon) {
			visibility: visible;
			display: flex;
			flex: 0 0 calc(10% - 2.4rem);
			width: 2.5rem;
			height: 2.5rem;
			max-width: 3rem;
			max-height: 3rem;
		}

		.overview-page-wrapper {
			grid-template-rows: 60px 80px 1fr;
		}

		:global(.search-wrapper) {
			grid-column: 1 / 3;
			grid-row: 1 / 2;
		}

		.prompt-header-information-wrapper {
			width: 100%;
			grid-row: 2 / 3;
			grid-column: 1 / 3;
			/* padding: 0 1.4rem; */
		}

		.grid-page-container {
			grid-column: 1 / 3;
			grid-row: 3 / 4;
		}
	}

	@media screen and (max-width: 443px) {
		.overview-page-header {
			gap: 1em;
		}
	}

	.nexus-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-bottom: 20vh;
		position: relative;
		height: 100dvh;
		width: 100vw;
	}

	:global(.logo) {
		margin-top: 0.25rem;
		height: 2rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 4rem;
		width: 100%;
	}

	/* section::after {
		content: '';
		position: absolute;
		top: -50%;
		width: 100%;
		background: radial-gradient(ellipse at center, var(--purple-light), var(--purple-dark));
		border-radius: 9999px;
		aspect-ratio: 1 / 1;
		opacity: 0.4;
		filter: blur(100px);
		z-index: -1;
	} */

	:global(.ai-star-icon) {
		width: 3.5rem;
		height: 3.5rem;
		margin-bottom: 1.5rem;

		color: var(--purple-white);
	}

	p {
		margin-bottom: 0.75rem;
	}

	@media screen and (min-width: 768px) {
		section::after {
			top: -100%;
			width: 75%;
		}
	}
</style>

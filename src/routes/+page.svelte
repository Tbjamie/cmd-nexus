<script lang="ts" module>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	// import AiStarIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import Searchbar from '$lib/components/inputs/Searchbar.svelte';
	import { page } from '$app/state';
	import type { Item } from '$lib/types/itemType';
	import Fuse from 'fuse.js';
	import { pageView } from '$lib/stores/pageView.svelte';
	import NexusLogoFull from '$lib/assets/icons/logo-full-name-icon.svg?component';
	import QuestionComponent from '$lib/components/inputs/QuestionComponent.svelte';
</script>

<script lang="ts">
	let prompt = $state('');
	let filteredItems: Item[] = $state([]);
	let items: Item[];
	let formResult: any;
	let searchResults: any = $state(null);
	let resultsFound = $state(false);
	let followUpQuestionData: any;
	let followUpQuestion: string = $state('');
	let followUpMessage: string = $state('');

	$effect(() => {
		formResult = page.form;

		searchResults = formResult?.results;
		followUpQuestionData = formResult?.feedbackMessage;

		followUpQuestion = followUpQuestionData ? followUpQuestionData.split('.')[1] : '';
		followUpMessage = followUpQuestionData ? followUpQuestionData.split('.')[0] : '';
	});

	$effect(() => {
		resultsFound = searchResults && searchResults.length > 0;

		if (resultsFound) {
			pageView.view = 'overview';
		} else {
			pageView.view = 'nexus';
		}
	});

	// $effect(() => {
	// 	console.log('SEARCHPARAMS', page.url.searchParams.get('search'));
	// });

	onMount(() => {
		const heading = document.querySelector('h1');
		const paragraph = document.querySelector('p');
		// const aiStarIcon = document.querySelector('.ai-star-icon');

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

			// main timeline waar alles op draait
			const tl = gsap.timeline({ repeat: -1, paused: true });

			// Ster 2 wiggle code
			// komende 4 code secties
			for (let i = 0; i < 8; i++) {
				tl.to('.star2', {
					scale: 1.1,
					x: -14,
					y: 36,
					duration: 0.1,
					rotation: i % 2 === 0 ? 2 : -2,
					ease: 'circ.ease'
				});
			}

			// start van de right sweep v/d ster
			tl.to('.star2', {
				scale: 1.2,
				x: -14,
				y: 36,
				duration: 0.5,
				rotation: 10,
				ease: 'circ.easeIn'
			})
				.to(
					'.star1',
					{
						scale: 1,
						duration: 1,
						rotation: 0,
						ease: 'circ.ease',
						filter: 'drop-shadow(1px 2px 20px #6E56FF40)'
					},
					'<'
				) // start van de drop-shadow glow gelijktijdig aan het vorige keyframe op de timeline door: "<"
				.to('.star2', {
					scale: 1,
					x: -15,
					y: 35,
					duration: 0.5,
					ease: 'circ.ease',
					rotation: 0
				})
				.to(
					'.star1',
					{
						scale: 1.1,
						duration: 0.3,
						rotation: -1,
						ease: 'circ.ease',
						filter: 'drop-shadow(1px 2px 20px #6E56FF)'
					},
					'<'
				)
				.to('.star1', {
					scale: 1,
					duration: 1,
					rotation: 0,
					ease: 'circ.ease',
					filter: 'drop-shadow(1px 2px 20px #6E56FF40)'
				});

			$effect(() => {
				if (prompt) {
					setTimeout(() => {
						tl.play();
					}, 500);
				} else {
					tl.restart(true).pause();
				}
			});
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

<div>
	{#if pageView.view === 'nexus'}
		<section class="main-page-spacing nexus-section">
			<!-- <AiStarIcon class="ai-star-icon" /> -->

			<div class="block">
				<svg class="star1" viewBox="0 0 46 45" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
							<stop offset="0%" stop-color="#C8BFFF" />
							<stop offset="70%" stop-color="#6E56FF" />
							<stop offset="100%" stop-color="#351FB7" />
						</linearGradient>

						<linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="0%">
							<stop offset="0%" stop-color="yellow" />
							<stop offset="100%" stop-color="rgba(255, 0, 220,1)" />
						</linearGradient>
					</defs>

					<path
						d="M27.817 38.2253L25.5475 43.423C24.6756 45.4212 21.9102 45.4212 21.0383 43.423L18.7689 38.2253C16.7487 33.5998 13.1139 29.9173 8.58019 27.9049L2.33369 25.1317C0.347104 24.2508 0.347104 21.3613 2.33369 20.4791L8.38515 17.7924C13.0364 15.7283 16.7358 11.9102 18.7211 7.12585L21.0202 1.58718C21.8727 -0.467862 24.7131 -0.467862 25.5669 1.58718L27.8661 7.12585C29.8514 11.9089 33.552 15.7271 38.202 17.7924L44.2534 20.4791C46.24 21.36 46.24 24.2495 44.2534 25.1317L38.0069 27.9049C33.4719 29.9186 29.8371 33.5998 27.817 38.2253Z"
						fill="url(#grad1)"
					/>
				</svg>
				<svg class="star2" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M13.6773 19.7922L12.5425 22.391C12.1066 23.3902 10.7238 23.3902 10.2879 22.391L9.15313 19.7922C8.14303 17.4794 6.32562 15.6381 4.05871 14.6319L0.935411 13.2452C-0.0578973 12.8048 -0.0578973 11.36 0.935411 10.9189L3.96119 9.57556C6.28687 8.5435 8.13657 6.63439 9.12923 4.24218L10.2788 1.4728C10.7051 0.445264 12.1253 0.445264 12.5522 1.4728L13.7018 4.24218C14.6945 6.63374 16.5448 8.54285 18.8699 9.57556L21.8956 10.9189C22.8889 11.3594 22.8889 12.8041 21.8956 13.2452L18.7723 14.6319C16.5048 15.6387 14.6874 17.4794 13.6773 19.7922Z"
						fill="url(#grad2)"
					/>
				</svg>
			</div>

			<!-- <p>Welkom bij CMD Nexus</p>
			<h1 class="h1">Hoe kan ik je helpen?</h1>

			<div class="search-autocomplete-wrapper">
				<Searchbar bind:value={prompt} relatedItems={filteredItems} />
			</div> -->

			<QuestionComponent
				feedback={followUpMessage ? followUpMessage : 'Welkom bij CMD Nexus'}
				message={followUpQuestion ? followUpQuestion : 'Hoe kan ik je helpen?'}
			>
				<Searchbar bind:value={prompt} relatedItems={filteredItems} />
			</QuestionComponent>
		</section>

		<footer>
			<p>copyright</p>
			<NexusLogoFull class="logo" />
		</footer>
	{/if}

	{#if pageView.view === 'overview'}
		<!-- Make sure that all items are shown when the button is clicked. If a search result redirect is done then only show those items -->
		<section class="main-page-spacing">
			{#if !resultsFound}
				<h1>Show all cards here</h1>
			{/if}
			{#if searchResults}
				<h1 class="h1">Zoekresultaten voor {prompt}</h1>
				<p>Hier zijn de resultaten voor je zoekopdracht.</p>
				{#each searchResults as result}
					<article class="search-result-item">
						<a
							href="/{result.naam
								.toLowerCase()
								.replace(/[\s:]+/g, '-')
								.replace(/[^\w-]+/g, '')}"
						>
							<h2>{result.naam}</h2>
							<p>{result.korte_beschrijving}</p>
						</a>
					</article>
				{/each}
			{/if}
		</section>
	{/if}
</div>

<style>
	.block {
		height: 4rem;
		width: 4rem;
		position: relative;
		scale: 1;
		margin-bottom: 1rem;

		& .star1 {
			width: 45px;
			height: 45px;
			filter: drop-shadow(1px 2px 20px #6e56ff30);
		}

		& .star2 {
			width: 25px;
			height: 25px;
			filter: drop-shadow(1px 2px 20px #6e56ff30);
			transform: translatex(-15px) translatey(35px);
			position: absolute;
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
		/* background: radial-gradient(ellipse at center, var(--purple-light), var(--purple-dark)); */
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

	h1 {
		margin-bottom: 2rem;
	}

	@media screen and (min-width: 768px) {
		section::after {
			top: -100%;
			width: 75%;
		}
	}
</style>

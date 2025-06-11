<script lang="ts" module>
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import type { Item } from '$lib/types/itemType';
	import { onMount } from 'svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import UserIcon from '$lib/assets/icons/user-icon.svg?component';
	import KeyIcon from '$lib/assets/icons/key-icon.svg?component';
</script>

<script lang="ts">
	let activeTab: 'all' | 'collections' = $state('all');
	let bookmarksId = $state([]);
	let bookmarks: Item[] = $state([]);

	async function fetchBookmarksData() {
		if (bookmarksId.length === 0) {
			bookmarks = [];
			return;
		}
		const ids = bookmarksId.join(',');
		const url = `https://fdnd-agency.directus.app/items/CMD_Base?filter[id][_in]=${ids}`;
		const res = await fetch(url);
		const data = await res.json();
		bookmarks = data.data || [];
	}

	function getRating(moeilijkheid: string) {
		switch (moeilijkheid) {
			case '*':
				return 'Makkelijk';
			case '**':
				return 'Medium';
			case '***':
				return 'Moeilijk';
			default:
				return moeilijkheid;
		}
	}

	$effect(() => {
		fetchBookmarksData();
	});

	onMount(() => {
		activeTab = (localStorage.getItem('activeTab') as 'all' | 'collections') || 'all';
		bookmarksId = JSON.parse(localStorage.getItem('bookmarks') || '[]');

		fetchBookmarksData();
	});

	$inspect(bookmarks);

	$effect(() => {
		bookmarksId = JSON.parse(localStorage.getItem('bookmarks') || '[]');
	});
</script>

<svelte:head>
	<title>Account | CMD Nexus</title>
	<meta
		name="description"
		content="Bekijk details over  binnen CMD Nexus. Lees de kern, toepassing en vind relevante links en personen voor dit principe of onderwerp binnen Communication and Multimedia Design aan de Hogeschool van Amsterdam."
	/>
	<meta
		name="keywords"
		content="CMD, Nexus, platform, studenten, kennis, hulp, CMD Kennis, kennisbank, CMD Kennisbank, HvA, Hogeschool van Amsterdam, Communication and Multimedia Design, digital design, interactie ontwerp, UX, UI, web development, frontend"
	/>
	<meta property="og:title" content="CMD Nexus" />
	<meta
		property="og:description"
		content="Bekijk details over  binnen CMD Nexus. Lees de kern, toepassing en vind relevante links en personen voor dit principe of onderwerp binnen Communication and Multimedia Design aan de Hogeschool van Amsterdam."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="main-page-spacing">
	<h1 class="h1">Account</h1>
	<section>
		<h2 class="h1">{activeTab === 'all' ? 'Alle bookmarks' : 'Collecties'}</h2>

		<div class="flex-wrapper">
			<IconButton
				class={activeTab === 'all' ? 'active-tab' : ''}
				variant="text"
				theme="tertiary"
				on:click={() => {
					activeTab = 'all';
					localStorage.setItem('activeTab', 'all');
				}}>Alle bookmarks</IconButton
			>
			<IconButton
				class={activeTab === 'collections' ? 'active-tab' : ''}
				variant="text"
				theme="tertiary"
				on:click={() => {
					activeTab = 'collections';
					localStorage.setItem('activeTab', 'collections');
				}}>Collecties</IconButton
			>
		</div>

		<div>
			{#if activeTab === 'all'}
				{#await fetchBookmarksData()}
					<p class="loading-text">Bookmarks laden...</p>
				{:then}
					{#if bookmarks.length > 0}
						<div class="card-wrapper">
							{#each bookmarks as item}
								<Card
									id={item.id as string | undefined}
									href="/{item.naam
										? item.naam
												.toLowerCase()
												.replace(/[\s:]+/g, '-')
												.replace(/[^\w-]+/g, '')
										: ''}"
									variant="normal"
									tag={item.rel_vakgebied as string | undefined}
									title={item.naam}
									labelType={item.soort as 'methode' | 'principe' | 'beroepstaak'}
									description={item.korte_beschrijving}
									rating={getRating(item.moeilijkheid)}
									mostRelevant={item.soort === 'methode'}
								/>
							{/each}
						</div>
					{:else}
						<p>Geen bookmarks gevonden.</p>
					{/if}
				{:catch error}
					<p>Fout met het laden van de bookmarks: {error.message}</p>
				{/await}
			{:else if activeTab === 'collections'}
				<div class="not-logged-in-message-wrapper">
					<p class="not-logged-in-message">
						Om collecties te kunnen maken en beheren, moet je ingelogd zijn. Log in of maak
						eenaccount aan om deze functionaliteit te gebruiken.
					</p>
					<div class="flex-wrapper">
						<IconButton href="/register" theme="secondary" variant="text">
							<KeyIcon class="user-icon" />
							Registreren
						</IconButton>
						<IconButton href="/login" theme="primary" variant="text">
							<UserIcon class="user-icon" />
							Inloggen
						</IconButton>
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	:global(.active-tab) {
		color: red;
	}

	.flex-wrapper {
		display: flex;
		gap: 1rem;
	}

	.card-wrapper {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		margin-top: 2rem;

		@media screen and (min-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (min-width: 1440px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media screen and (min-width: 2000px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.loading-text {
		text-align: center;
		margin-top: 4rem;
		font-size: 1.2rem;
		color: var(--text-color-secondary);
	}

	.not-logged-in-message-wrapper {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		height: 50vh;
	}
</style>

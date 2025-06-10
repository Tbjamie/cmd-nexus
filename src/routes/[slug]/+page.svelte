<script lang="ts" module>
	import { page } from '$app/state';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import CategoryLabel from '$lib/components/labels/CategoryLabel.svelte';
	import type { Item } from '$lib/types/itemType';
	import LinkIcon from '$lib/assets/icons/open-link.svg?component';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	const item: Item = page.data?.item;
	const webLinks = item.meer_op_web?.split(/\s+/);

	const relativePerson = item.meer_bij_personen
		?.split(/\n+/)
		.filter((person) => person.trim().length > 0);
</script>

<svelte:head>
	<title>{item.naam} | CMD Nexus</title>
	<meta
		name="description"
		content="Bekijk details over {item.naam} binnen CMD Nexus. Lees de kern, toepassing en vind relevante links en personen voor dit principe of onderwerp binnen Communication and Multimedia Design aan de Hogeschool van Amsterdam."
	/>
	<meta
		name="keywords"
		content="CMD, Nexus, platform, studenten, kennis, hulp, CMD Kennis, kennisbank, CMD Kennisbank, HvA, Hogeschool van Amsterdam, Communication and Multimedia Design, digital design, interactie ontwerp, UX, UI, web development, frontend, {item.naam}, {item.korte_beschrijving}, {item.strekking}, {item.toepassing}"
	/>
	<meta property="og:title" content="CMD Nexus" />
	<meta
		property="og:description"
		content="Bekijk details over {item.naam} binnen CMD Nexus. Lees de kern, toepassing en vind relevante links en personen voor dit principe of onderwerp binnen Communication and Multimedia Design aan de Hogeschool van Amsterdam."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<div class="main-page-spacing">
	{#if item}
		<IconButton class="icon-button button-size spacing-button" variant="text" theme="tertiary" on:click={() => window.history.back()}>
			<ArrowIcon class="arrow-icon-detail" />
			Terug naar overzicht
		</IconButton>

		<div class="detail-wrapper">
			<section>
				<article>
					<h1>{item.naam}</h1>
					<p>{item.korte_beschrijving}</p>
					<CategoryLabel text="principe" theme="green" hasHover={true} />
				</article>

				<article>
					{#if item.strekking}
						<h3>De kern</h3>
						<p>{item.strekking}</p>
					{/if}
				</article>

				<article>
					{#if item.toepassing}
						<h3>Toepassing</h3>
						<p>{item.toepassing}</p>
					{/if}
				</article>
			</section>

			<section>
				<article>
					{#if webLinks}
						<h3>Meer informatie</h3>
						<div>
							{#each webLinks as webItem}
								<IconButton href={webItem} target="_blank" variant="text" theme="primary">
									<LinkIcon class="icon-size" />
									{webItem.match(/^https?:\/\/(?:www\.)?([^\.]+)/)?.[1]}
								</IconButton>
							{/each}
						</div>
					{/if}
				</article>

				<article>
					{#if relativePerson}
						<h3>Ondersteuning binnen CMD</h3>
						<div>
							{#each relativePerson as person}
								<IconButton disabled variant="text" theme="secondary">{person}</IconButton>
							{/each}
						</div>
					{/if}
				</article>
			</section>
		</div>
	{:else}
		<h1>No items found</h1>
	{/if}
</div>

<style>
	h1 {
		font-size: 38px;
		/* margin-top: 2em; */
	}

	h3 {
		font-size: 20px;
		font-weight: 600;
	}

	.detail-wrapper {
		margin: 4em auto;
		/* width: 80vw; */
		max-width: 1600px;
		/* border-radius: 4rem; */

		display: flex;
		justify-content: space-between;

		gap: 5rem;
		height: max-content;
		box-sizing: border-box;
	}

	.detail-wrapper > section:nth-of-type(2) {
		padding-top: 4em;
	}

	.detail-wrapper section {
		display: flex;
		flex-direction: column;

		width: 100%;
		justify-content: start;
		gap: 1em;
	}

	section > article {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin-bottom: 4em;
	}

	article > div {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 1em;
	}
	/* 
	.detail-wrapper > section:nth-of-type(2) > article {
		display: grid;
		grid-template-columns: 1fr 4fr;
	} */

	:global(.icon-size) {
		width: 1rem;
		height: 1rem;
	}

	:global(.arrow-icon-detail) {
		width: 1rem;
		height: 1rem;
		transform: rotate(-90deg);
	}

	:global(.bookmark-icon) {
		rotate: -45deg;
		color: var(--white);
	}

	:global(.button-size) {
		width: fit-content;
	}

	@media screen and (max-width: 1000px) {
		.detail-wrapper > section:nth-of-type(2) > article {
			display: flex;
		}
	}

	@media screen and (max-width: 768px) {
		.detail-wrapper {
			flex-direction: column;
			margin-top: 2em;
		}

		:global(.spacing-button) {
			margin-top: 3em;
		}

		section > article {
			margin-bottom: 1em;
		}

		.detail-wrapper > section:nth-of-type(2) {
			padding-top: 1em;
		}
	}
</style>

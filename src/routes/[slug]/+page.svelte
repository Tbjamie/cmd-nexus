<script lang="ts" module>
	import { page } from '$app/state';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import CategoryLabel from '$lib/components/labels/CategoryLabel.svelte';
	import type { Item } from '$lib/types/itemType';
	import CloseIcon from '$lib/assets/icons/close-icon.svg?component';
	import LinkIcon from '$lib/assets/icons/open-link.svg?component';
</script>

<script lang="ts">
	const item: Item = page.data?.item;

	const webLinks = item.meer_op_web?.split(/\s+/);

	// console.log('WEB LINKS', webLinks);

	const relativePerson = item.meer_bij_personen?.split(/\n+/);

	const subText = item.korte_beschrijving;

	const kernText = item.strekking;

	const toepassingText = item.toepassing;

	console.log(relativePerson);

	// console.log(item);
</script>

<div class="page-wrapper">
	{#if item}
		<div class="flex">
			<IconButton class="button-size" variant="text" theme="secondary">
				Kaart sluiten
				<CloseIcon class="icon-size" />
			</IconButton>

			<IconButton class="button-size" theme="secondary">
				<CloseIcon class="icon-size bookmark-icon" />
			</IconButton>
		</div>

		<section class="detail-wrapper">
			<article class="grid-col1">
				<CategoryLabel text="principe" theme="green" hasHover={true} />
				<h1>{item.naam}</h1>
				<p>{item.korte_beschrijving}</p>
			</article>

			<article class="grid-col2">
				{#if kernText}
					<h3>De kern</h3>
					<p>{kernText}</p>
				{/if}
			</article>

			<article class="grid-col1">
				{#if webLinks}
					<h3>Meer informatie</h3>
					{#each webLinks as webItem}
						<IconButton href={webItem} target="_blank" variant="text" theme="primary">
							<LinkIcon class="icon-size" />
							{webItem.match(/^https?:\/\/(?:www\.)?([^\.]+)/)?.[1]}
						</IconButton>
					{/each}
				{/if}
			</article>

			<article class="grid-col2">
				{#if toepassingText}
					<h3>Toepassing</h3>
					<p>{toepassingText}</p>
				{/if}
			</article>

			<article class="grid-col1">
				{#if relativePerson}
					<h3>Ondersteuning binnen CMD</h3>
					{#each relativePerson as person}
						<IconButton disabled variant="text" theme="secondary">{person}</IconButton>
					{/each}
				{/if}
			</article>
		</section>
	{:else}
		<h1>No items found</h1>
	{/if}
</div>

<style>
	article {
		flex-direction: row;
		grid-auto-flow: column;
		gap: 1em;
	}

	.grid-col1 {
		grid-column: 1;
		margin-bottom: 1em;
	}

	.grid-col2 {
		grid-column: 2;
		margin-bottom: 1em;
	}

	.detail-wrapper {
		margin: auto;
		width: 80vw;
		max-width: 1600px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4rem;
		padding: 2em;

		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.page-wrapper {
		padding: 2em;
	}

	.flex {
		margin-bottom: 2em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}

	:global(.icon-size) {
		width: 1rem;
		height: 1rem;
	}

	:global(.bookmark-icon) {
		rotate: -45deg;
		color: var(--white);
	}

	:global(.button-size) {
		width: fit-content;
	}
</style>

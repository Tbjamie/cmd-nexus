<script lang="ts" module>
	import { page } from '$app/state';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import CategoryLabel from '$lib/components/labels/CategoryLabel.svelte';
	import type { Item } from '$lib/types/itemType';
	import CloseIcon from '$lib/assets/icons/close-icon.svg?component';
	import LinkIcon from '$lib/assets/icons/open-link.svg?component';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
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

<div class="main-page-spacing">
	{#if item}
		<!-- <div class="flex">
			<IconButton class="button-size" theme="secondary">
				<CloseIcon class="icon-size bookmark-icon" />
			</IconButton>
		</div> -->

		<a href="/">
			<IconButton class="button-size spacing-button" variant="text" theme="tertiary">
				<ArrowIcon class="arrow-icon" />

				Terug naar overzicht
			</IconButton>
		</a>

		<div class="detail-wrapper">
			<section>
				<article>
					<h1>{item.naam}</h1>
					<p>{item.korte_beschrijving}</p>
					<CategoryLabel text="principe" theme="green" hasHover={true} />
				</article>

				<article>
					{#if kernText}
						<h3>De kern</h3>
						<p>{kernText}</p>
					{/if}
				</article>

				<article>
					{#if toepassingText}
						<h3>Toepassing</h3>
						<p>{toepassingText}</p>
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
		flex-wrap: wrap;
		justify-content: space-between;

		column-gap: 1em;
		height: max-content;
		box-sizing: border-box;
	}

	.detail-wrapper > section:nth-of-type(2) {
		padding-top: 4em;
	}

	.detail-wrapper section {
		display: flex;
		flex-direction: column;

		flex-basis: 47%;
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

	.flex {
		margin-bottom: 2em;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}

	:global(.spacing-button) {
		margin-top: 6em;
	}

	:global(.icon-size) {
		width: 1rem;
		height: 1rem;
	}

	:global(.arrow-icon) {
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

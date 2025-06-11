<script lang="ts" module>
	import { page } from '$app/state';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import CategoryLabel from '$lib/components/labels/CategoryLabel.svelte';
	import type { Item } from '$lib/types/itemType';
	import LinkIcon from '$lib/assets/icons/open-link.svg?component';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
	import PlusIcon from '$lib/assets/icons/plus-icon.svg?component';
	import { showBookmarkTooltip } from '$lib/stores/bookmarkTooltip.svelte';
	import TagComponent from '$lib/components/tag/Tag.svelte';
</script>

<script lang="ts">
	const item: Item = page.data?.item;
	const webLinks = item.meer_op_web?.split(/\s+/);

	const relativePerson = item.meer_bij_personen
		?.split(/\n+/)
		.filter((person) => person.trim().length > 0);

	let labelColor: string = 'purple';

	$: {
		if (item.soort === 'Beroepstaak') {
			labelColor = 'green';
		} else if (item.soort === 'Principe') {
			labelColor = 'blue';
		} else if (item.soort === 'Methode') {
			labelColor = 'yellow';
		} else {
			labelColor = 'purple'; // default
		}
	}
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
		<div class="detail-wrapper">
			<section class="detail-section {labelColor}">
				<div class="inner-content">
					<div class="detail-button-wrapper">
						<IconButton
							class="icon-button button-size spacing-button"
							variant="text"
							theme="secondary"
							on:click={() => window.history.back()}
						>
							<ArrowIcon class="arrow-icon-detail" />
							Terug naar overzicht
						</IconButton>

						<IconButton
							theme="secondary"
							on:click={(e) => {
								e.preventDefault();
								let bookmarks;
								try {
									bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
									if (!Array.isArray(bookmarks)) bookmarks = [];
								} catch {
									bookmarks = [];
								}
								if (!bookmarks.includes(item.id)) {
									bookmarks.push(item.id);
									localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
									showBookmarkTooltip.value = true;
									setTimeout(() => {
										showBookmarkTooltip.value = false;
									}, 2000);
								}
							}}
						>
							<PlusIcon class="plus-icon" />
						</IconButton>
					</div>
					<article>
						<div class="header-wrapper">
							<h1>{item.naam}</h1>
							<h2>{item.ondertitel}</h2>
						</div>
						<p>{item.korte_beschrijving}</p>
					</article>

					<!-- content text -->
					<div class="inner-content-container">
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
					</div>
				</div>
			</section>

			<section class="general-section {labelColor}">
				<div class="inner-content">
					<article>
						<h3>Extra informatie kaart</h3>
						<div class="content-wrapper-general">
							{#if item.soort}
								<CategoryLabel text={item.soort} />
							{/if}
							{#if item.rel_cmd_expertise && Array.isArray(item.rel_cmd_expertise)}
								{#each item.rel_cmd_expertise as expertise}
									<CategoryLabel text={expertise} />
								{/each}
							{:else if item.rel_cmd_expertise}
								<CategoryLabel text={item.rel_cmd_expertise} />
							{/if}
							{#if item.schrijver_of_bron}
								<CategoryLabel text={item.schrijver_of_bron} />
							{/if}
						</div>
					</article>
					<article>
						{#if webLinks}
							<h3>Meer informatie</h3>
							<div class="content-wrapper">
								{#each webLinks as webItem}
									<IconButton href={webItem} target="_blank" variant="text" theme="primary">
										<LinkIcon class="icon-size" />
										{webItem
											.match(/^https?:\/\/(?:www\.)?([^\/?#]+)/)?.[1]
											.split('.')
											.slice(-2, -1)[0]}
									</IconButton>
								{/each}
							</div>
						{/if}
					</article>

					<article>
						{#if relativePerson}
							<h3>Ondersteuning binnen CMD</h3>
							<div class="content-wrapper">
								{#each relativePerson as person}
									<TagComponent theme="secondary">{person}</TagComponent>
								{/each}
							</div>
						{/if}
					</article>
				</div>
			</section>
		</div>
	{:else}
		<h1>No items found</h1>
	{/if}
</div>

<style>
	p {
		color: #d9d9d9;
		font-size: 1rem;
	}

	.detail-wrapper {
		/* width: 80vw; */
		max-width: 1600px;
		max-height: 80dvh;
		/* border-radius: 4rem; */

		display: flex;
		justify-content: space-between;

		gap: 2rem;
		height: max-content;
		box-sizing: border-box;
	}

	.detail-wrapper > section {
		position: relative;

		.inner-content {
			border-radius: var(--border-radius-large);
			backdrop-filter: blur(150px);
			background: rgba(217, 217, 217, 0.06);
			overflow: hidden;
			width: 100%;
			height: 100%;
			padding: 3rem;
			overflow-y: auto;

			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		&::after {
			content: '';
			width: 80%;
			height: 100px;
			position: absolute;
			bottom: 5px;
			left: 50%;
			transform: translateX(-50%);
			z-index: -2;
		}

		&.blue::after {
			background-color: var(--light-blue);
		}
		&.green::after {
			background-color: var(--green);
		}
		&.yellow::after {
			background-color: var(--yellow);
		}
		&.purple::after {
			background-color: var(--purple-light);
		}
	}

	.detail-wrapper .detail-section {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		border-radius: var(--border-radius-large);

		article {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.header-wrapper {
			display: flex;
			flex-direction: column;
			gap: 0.15rem;

			h1 {
				color: var(--white);
				font-weight: 700;
				font-size: 2.4rem;
				margin: 0;
			}

			h2 {
				font-weight: 400;
				font-size: 1.4rem;
				color: #f6f6f6;
			}
		}
		.detail-button-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;

			:global(.icon-button) {
				padding: 0.6rem 1.4rem;
			}

			:global(.icon-button.icon) {
				padding: 0.4rem;
			}
		}
	}

	.detail-section {
		flex: 4;
	}

	.general-section {
		flex: 2;
	}

	.detail-section .inner-content .inner-content-container {
		container-name: text-container;
		container-type: inline-size;

		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.general-section .inner-content article {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.content-wrapper-general {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
		}

		.content-wrapper {
			display: flex;
			flex-wrap: wrap;
			gap: 0.6rem;
		}
	}

	/* GLOBALS */
	:global(.icon-size) {
		width: 1rem;
		height: 1rem;
	}

	:global(.icon-button) {
		padding: 0.6rem 1.4rem;
	}

	:global(.icon-button.secondary.text),
	:global(.icon-button.primary.text) {
		padding: 0.6rem 1.4rem;
		white-space: nowrap;
		font-size: 0.875rem;
	}

	:global(.icon-button.primary.text) {
		background-color: var(--white);
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
		.detail-wrapper {
			flex-direction: column;

			.general-section .inner-content {
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: wrap;
			}
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

		.detail-wrapper > section:nth-of-type(2) {
			padding-top: 1em;
		}
	}
</style>

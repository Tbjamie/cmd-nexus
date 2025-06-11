<script lang="ts" module>
	import CategoryLabel from '../labels/CategoryLabel.svelte';
	import TagComponent from '../tag/Tag.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import PlusIcon from '$lib/assets/icons/plus-icon.svg?component';
	import { showBookmarkTooltip } from '$lib/stores/bookmarkTooltip.svelte';
</script>

<script lang="ts">
	let {
		id = $bindable(''),
		tag = $bindable(''),
		href = $bindable(''),
		variant = $bindable(''),
		title = $bindable(''),
		description = $bindable(''),
		rating = $bindable(''),
		labelType = $bindable(''),
		labelColor = $bindable(''),
		mostRelevant = $bindable(false)
	} = $props();

	let hasHover = $state(false);

	// Check labeltype for different styles
	// theme afhankelijk van de labeltype
	$effect(() => {
		if (labelType === 'Beroepstaak') {
			labelColor = 'green';
		} else if (labelType === 'Principe') {
			labelColor = 'blue';
		} else if (labelType === 'Methode') {
			labelColor = 'yellow';
		} else {
			labelColor = 'purple'; // default
		}
	});

	// 1. get de client mouse position
	function handleMouseMove(id: string, event: MouseEvent) {
		let CurrentCardWrapper = document.querySelector(`.card-wrapper-${id}`) as HTMLElement;
		const dotElement = CurrentCardWrapper.querySelector('.dot-element') as HTMLElement;

		// Update mouse position
		let mousePosition = {
			x: event.clientX,
			y: event.clientY
		};

		// function to get the bounded rectangle of the card container
		const boundedRect = getRelativePosition(CurrentCardWrapper, mousePosition, event);

		let relativeX = boundedRect?.relativeX;
		let relativeY = boundedRect?.relativeY;

		if (dotElement) {
			// Update the position of the dot element
			dotElement.style.left = `${relativeX}px`;
			dotElement.style.top = `${relativeY}px`;

			// Add a class to make it visible
			dotElement.classList.add('visible');
		}
	}

	// 3. Get the bounded rectangle of the card container
	function getRelativePosition(
		CurrentCardWrapper: HTMLElement,
		mousePosition: { x: number; y: number },
		event: MouseEvent
	) {
		const cardContainer = CurrentCardWrapper;

		// Check if the cardContainer exists
		if (cardContainer) {
			// get the current card container position
			const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

			// Calculate relative position
			const relativeX = mousePosition.x - rect.left;
			const relativeY = mousePosition.y - rect.top;

			return { relativeX, relativeY };
		}
	}

	// 4. Cleanup on component destroy
	function removeDotElement() {
		const CurrentCardWrapper = document.querySelector(`.card-wrapper-${id}`) as HTMLElement;
		const dotElement = CurrentCardWrapper.querySelector('.dot-element') as HTMLElement;
		if (dotElement) {
			dotElement.classList.remove('visible');
		}
	}
</script>

<a
	{href}
	class="card-wrapper-{id} card-wrapper {mostRelevant ? 'relevant' : ''} {variant}"
	onmouseover={() => (hasHover = true)}
	onfocus={() => (hasHover = true)}
	onmouseleave={() => {
		hasHover = false;
		removeDotElement();
	}}
	onblur={() => (hasHover = false)}
	onmousemove={(event) => handleMouseMove(id, event)}
>
	<div class="dot-element {labelColor}"></div>
	<div class="card-container">
		<div class="card-header">
			<CategoryLabel
				text={labelType}
				{hasHover}
				theme={labelColor as 'green' | 'blue' | 'yellow'}
			/>
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
					if (!bookmarks.includes(id)) {
						bookmarks.push(id);
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
		<div class="card-content">
			{#if title}
				<h3 class="h3">
					{title}
				</h3>
			{/if}

			{#if description}
				<p>
					{description}
				</p>
			{/if}
		</div>
		<div class="card-footer">
			<div class="card-footer-tags-wrapper">
				{#if mostRelevant == true}
					<TagComponent theme="secondary">Gevonden kaart</TagComponent>
				{/if}
				{#if tag}
					<TagComponent>{tag}</TagComponent>
				{/if}
			</div>
			{#if rating}
				<span class="rating">{rating}</span>
			{/if}
		</div>
	</div>
</a>

<style>
	.dot-element {
		--opacity: 50%;
		position: absolute;
		width: 15rem;
		height: 15rem;
		border-radius: 50%;
		pointer-events: none;
		z-index: -1;
		opacity: 0;

		&.visible {
			opacity: 1;
			transform: translate(-50%, -50%);
			transition: opacity 500ms ease-in-out;
			animation: pulse 5s infinite ease-in-out;
			background-color: var(--current-color-card);

			&.visible.blue {
				background-color: var(--light-blue);
			}

			&.visible.green {
				background-color: var(--green);
			}

			&.visible.yellow {
				background-color: var(--yellow);
			}

			&.visible.purple {
				background-color: var(--purple-light);
			}
		}
	}

	:global(.plus-icon) {
		width: 1.125rem;
		height: 1.125rem;
	}

	/* Variants van Cards */
	/* default hover staate */
	/* 1. normal */

	.card-wrapper.normal {
		--opacity: 8%;
		pointer-events: auto;
		width: 100%;
		text-decoration: none;
		overflow: hidden;
		/* max-width: 35rem; */
		border-radius: var(--border-radius-large);
		z-index: 1;
		height: 100%;
		position: relative;
		/* min-height: 250px; */

		transition: all 300ms ease-in-out;

		.card-container {
			backdrop-filter: blur(60px);
			transition: all 300ms ease-in-out;
			display: flex;
			flex-direction: column;
			gap: 1.4rem;
			overflow: auto;
			min-height: 100%;

			padding: 1.4rem 1.6rem;

			.card-header,
			.card-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.card-content {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 0.75rem;

				p {
					min-height: 2.5rem;
				}
			}
		}

		.card-footer-tags-wrapper {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		& > * {
			color: var(--white);
		}

		&:hover {
			transform: scale(1.02);
		}

		&.visible {
			opacity: 1;
			transition: opacity 500ms ease-in-out;
			animation: pulse 2s infinite ease-in-out;
		}
	}

	.card-wrapper.normal .card-content p {
		color: #e2e2e2;
		text-align: left;
		font-weight: 300;
		margin: 0;
		text-overflow: ellipsis;

		/* http://css-tricks.com/almanac/properties/l/line-clamp/ */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		line-clamp: 2;
		-webkit-line-clamp: 2;
	}

	.card-wrapper.normal .card-content h3 {
		font-weight: 500;
	}

	.rating {
		font-weight: 300;
	}

	.relevant.card-wrapper.normal:first-of-type {
		--opacity: 100%;
		position: relative;
		background: transparent;
		border: none;
		border-radius: var(--border-radius-large);
		z-index: 1;

		& .card-container {
			backdrop-filter: none;
		}
	}

	.relevant.card-wrapper.normal:first-of-type:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(145deg, var(--purple-normal), var(--purple-dark));
		z-index: -1;
		/* clip-path: inset(0% 100% 0% 0%); */
		transition: 400ms cubic-bezier(0.9, 0, 0.1, 1);
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			transform: translate(-50%, -50%) scale(1.5);
		}
		100% {
			transform: translate(-50%, -50%) scale(1);
		}
	}
</style>

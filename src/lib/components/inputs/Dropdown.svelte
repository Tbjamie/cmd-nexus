<script lang="ts" module>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import CategoryLabel from '../labels/CategoryLabel.svelte';
</script>

<script lang="ts">
	let { inputVal = $bindable(''), relatedItems = [] } = $props();
</script>

<div class="result-wrapper">
	<form
		action="/"
		method="POST"
		class="autocomplete-item"
		use:enhance={() => {
			goto(
				`?search=${inputVal
					.toLowerCase()
					.replace(/[\s:]+/g, '-')
					.replace(/[^\w-]+/g, '')}`
			);
		}}
		onsubmit={() => console.log('Form submitted with value:', inputVal)}
	>
		<button type="submit">
			Zoek "{inputVal}"
		</button>
	</form>
	<ul class="autocomplete-list">
		{#each relatedItems as item}
			<li class="autocomplete-item">
				<a
					href="/{item.naam
						.toLowerCase()
						.replace(/[\s:]+/g, '-')
						.replace(/[^\w-]+/g, '')}"
				>
					{item.naam}
				</a>
				<CategoryLabel
					variant="dropdown"
					theme={item.soort}
					text={item.soort}
					hasHover={false}
				/>
			</li>
		{/each}
	</ul>
</div>

<style>
	a,
	button[type='submit'] {
		text-decoration: none;
		color: var(--white);
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		background: transparent;
		border: none;

		width: 100%;

		transition: all 200ms ease-in-out;
		display: flex;
		text-align: start;

		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 1;
		-webkit-line-clamp: 1;
	}

	a::before,
	button::before {
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.autocomplete-item:hover,
	.autocomplete-item:has(a:focus-visible),
	.autocomplete-item:has(button:focus-visible) {
		--opacity: 25%;
		background: var(--white);

		color: white;
	}

	.autocomplete-item {
		list-style: none;
		width: 100%;
		overflow: hidden;
		padding: 1rem 1.5rem;
		position: relative;

		&:last-child {
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}
	}

	.result-wrapper {
		--opacity: 15%;

		position: absolute;
		top: calc(3rem + 15px);
		left: 0;
		right: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		width: 100%;

		background: var(--white);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		-webkit-backdrop-filter: blur(20px);
		outline: solid 1px rgba(255 255 255 / 0.5);
		/* border-top: none; */

		/* container */
		container-type: inline-size;
		container-name: dropdown-container;

	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: baseline;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	@container dropdown-container (max-width: 400px) {
		:global(.category-label.dropdown) {
			display: none;
		}
	}

	@media screen and (min-width: 1563px) {
		.result-wrapper {
			top: calc(3rem + 24px);
		}
	}
</style>

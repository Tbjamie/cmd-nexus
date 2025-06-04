<script lang="ts" module>
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
</script>

<script lang="ts">
	let { value = $bindable(''), relatedItems = [] } = $props();
</script>

<form
	action="/"
	method="POST"
	class="search-wrapper"
	class:active={value}
	use:enhance={() => {
		goto(
			`?search=${value
				.toLowerCase()
				.replace(/[\s:]+/g, '-')
				.replace(/[^\w-]+/g, '')}`
		);
		return;
	}}
>
	<input
		bind:value
		type="text"
		autocomplete="off"
		spellcheck="false"
		name="search-bar"
		id="search-bar"
		placeholder="Waar ben je naar op zoek"
	/>
	<IconButton type="submit">
		<ArrowIcon class="arrow-icon" />
	</IconButton>

	{#if value}
		<Dropdown inputVal={value} {relatedItems} />
	{/if}
</form>

<style>
	.search-wrapper {
		--opacity: 10%;

		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: red;
		border: none;
		width: 100%;

		background: var(--white);
		border-radius: 15px;
		outline: solid 1px rgba(255 255 255 / 0.2);

		/* transition: all 200ms ease-in-out; */

		&.active {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	input {
		font-family: 'Geist', sans-serif;
		font-size: inherit;
		border: none;
		background: transparent;
		width: 100%;
		color: white;
		padding-right: 1rem;
	}

	:global(.arrow-icon) {
		width: 0.875rem;
		height: 0.875rem;
	}

	@media screen and (min-width: 768px) {
		.search-wrapper {
			width: 50%;
		}
	}

	@media screen and (min-width: 1563px) {
		.search-wrapper {
			width: 40%;
		}
	}
</style>

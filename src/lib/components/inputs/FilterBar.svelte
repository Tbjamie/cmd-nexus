<!-- 1. Zorg dat de form gesubmit wordt als een label wordt aangeklikt (use:enhance) -->
<!-- 2. Zorg dat de url aanpast op het moment dat de form gesubmit wordt -->
<!-- 3. Zorg dat filters aan of uit staan op basis van de url -->
<!-- 4. Zorg dat filters worden toegepast en de Array van items kleiner wordt -->
<!-- 5. Zorg dat de feedforward goed werkt en wordt aangepast op basis van de items die er op dat moment zijn (DENK HET EERST COMPLEET UIT) -->
<!-- 6. Zorg dat op kleine schermen het filter menu een knop wordt met iets wat naar boven slide -->

<script lang="ts" module>
	import Filter from './Filter.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
</script>

<script lang="ts">
	let { filters = [], itemCount = 0 } = $props();
</script>

<form
	use:enhance={(submit) => {
		return async ({ formData }) => {
			const params = new URLSearchParams(window.location.search);
			const filterMap = new Map<string, string[]>();

			for (const [key, value] of formData.entries()) {
				const lowerKey = key.toLowerCase().replace(/\s+/g, '-');
				let lowerValue = (value as string)
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/-\(\d+\)$/, '');
				if (!filterMap.has(lowerKey)) {
					filterMap.set(lowerKey, []);
				}
				filterMap.get(lowerKey)?.push(lowerValue);
			}

			for (const [key, values] of filterMap.entries()) {
				params.set(key, values.join(' '));
			}

			let url = `?${params.toString()}`.replace(/%20/g, '+');
			goto(url);
		};
	}}
	action=""
	method="POST"
	class="filter-bar"
	onsubmit={() => {
		console.log('Form submitted');
	}}
>
	<p>Filter</p>
	{#each filters as filter}
		<fieldset>
			<legend>{filter.title}</legend>
			<div class="filter-options-wrapper">
				{#each filter.options as option}
					<Filter {itemCount} value={option} name={filter.name}>
						{option}
					</Filter>
				{/each}
			</div>
		</fieldset>
	{/each}
</form>

<style>
	.filter-bar {
		--opacity: 5%;
		background: var(--white);
		border-radius: var(--border-radius-medium);
		padding: 1.5rem;
		padding-bottom: 2.5rem;
		height: max-content;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.filter-options-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	fieldset {
		border: none;
	}

	legend {
		margin-bottom: 0.875rem;
		text-transform: capitalize;
	}

	p {
		font-weight: bold;
		font-size: 1.25rem;
	}
</style>

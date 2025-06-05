<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import Filter from '$lib/components/inputs/Filter.svelte';

	// 1. Import Filter component
	// 2. Maak een mock array
	// 3. Loop over de mock array en zorg dat er een titel is met meerdere filter
	// 4. Zorg dat de url update als een filter active is (Form POST > sveltekit GOTO)
	// 5. Export props zodat de array gereplaced kan worden met echte data

	const mockData = [
		{
			title: 'soort',
			options: [
				'Principe',
				'Beroepstaak',
				'Methode',
				'Beroeps specifieke term',
				'Artikel',
				'Stappenplan',
				'Definitie',
				'Visie',
				'Model'
			]
		},

		{
			title: 'rel_vakgebied',
			options: ['Design', 'Research', 'Interface design', 'Interactie ontwerp']
		},

		{
			title: 'rel_thema',
			options: ['Designing controls', 'Research', 'Interface design', 'Interactie ontwerp']
		}
	];

	let selected: Record<string, string> = {};

	// Form submission handler
	function applyFilters(e: SubmitEvent) {
		e.preventDefault();

		const params = new URLSearchParams();

		for (const key in selected) {
			if (selected[key]) {
				params.set(key, selected[key]);
			}
		}

		goto(`?${params.toString()}`, { replaceState: true });
	}
</script>

<form class="filter-form" on:submit|preventDefault={applyFilters}>
	{#each mockData as filterGroup}
		<fieldset class="filter-fieldset">
			<legend>{filterGroup.title}</legend>
			{#each filterGroup.options as option}
				<label>
					<input
						type="checkbox"
						name={filterGroup.title}
						value={option}
						bind:group={selected[filterGroup.title]}
					/>
					{option}
				</label>
			{/each}
		</fieldset>
	{/each}

	<button type="submit">Filter</button>
</form>

<!-- 
<label>
	<slot />
</label> -->

<style>
	:global(.filter-form) {
		display: inline-flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		border-radius: 2em;

		background-color: #111111;
	}

	:global(.filter-fieldset) {
		display: flex;
		flex-direction: column;
		border: none;

		label {
			cursor: pointer;

			transition: 0.1s ease;

			display: flex;
			gap: 0.5em;
			padding: 0.4em 1em 0.4em 1em;
			align-items: center;
		}

		legend {
			font-size: 20px;
			font-weight: 600;
		}

		input[type='checkbox'] {
			appearance: none;
			width: 1.2em;
			height: 1.2em;
			border: 2px solid var(--white);
			border-radius: 4px;
			background-color: transparent;
			outline: none;
			accent-color: var(--purple-light);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		input[type='checkbox']:checked {
			background-color: var(--purple-light); /* of een checkmark als je dat wil */
			border: 2px solid var(--purple-light);
		}

		input[type='checkbox']:checked::after {
			content: url('/src/lib/assets/icons/checkmark-icon.svg');
			width: 1em;
			height: 1em;
			/* align-items: center; */
			/* justify-content: center; */
			color: var(--black);

			/* margin-bottom: 2px; */
		}
	}
</style>

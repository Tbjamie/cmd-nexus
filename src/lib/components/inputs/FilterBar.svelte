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
	import type { FilterType } from '$lib/types/filterType';
	import type { Item } from '$lib/types/itemType';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	let filters: FilterType[] = $state([]);
	let { items = $bindable([]) } = $props();

	onMount(() => {
		const getUniqueOptions = (key: keyof Item) =>
			Array.from(
				new Set(
					items
						.flatMap((i) => (Array.isArray(i[key]) ? i[key] : [i[key]]))
						.filter((value) => typeof value === 'string' || value === undefined)
				)
			);

		const filterKeys = [
			{ title: 'Soort', name: 'Soort', key: 'soort', labelFn: (v: string) => v },
			{
				title: 'Moeilijkheid',
				name: 'Moeilijkheid',
				key: 'moeilijkheid',
				labelFn: (v: string) => getRating(v)
			},
			{
				title: 'Beroepstaak',
				name: 'Beroepstaak',
				key: 'rel_beroepstaak',
				labelFn: (v: string) => v
			},
			{
				title: 'Competentie',
				name: 'Competentie',
				key: 'rel_competentie',
				labelFn: (v: string) => v
			},
			{ title: 'Thema', name: 'Thema', key: 'rel_thema', labelFn: (v: string) => v },
			{ title: 'Vakgebied', name: 'Vakgebied', key: 'rel_vakgebied', labelFn: (v: string) => v }
		];

		filters = filterKeys.map(({ title, name, key, labelFn }) => ({
			title,
			name,
			options: getUniqueOptions(key as keyof Item)
				.map((option) => {
					if (option === undefined) return undefined;
					const count = items.filter((item) =>
						Array.isArray(item[key as keyof Item])
							? (item[key as keyof Item] as unknown[]).includes(option)
							: item[key as keyof Item] === option
					).length;
					return `${labelFn(typeof option === 'string' ? option.split(' ')[0] : option)} (${count})`;
				})
				.filter((option): option is string => option !== undefined)
		}));
	});

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
</script>

<form
	use:enhance={(submit) => {
		return async ({ formData }) => {
			const params = new URLSearchParams(window.location.search);
			const filterMap = new Map<string, string[]>();

			// Preserve ?search parameter if present
			const searchValue = params.get('search');

			// Remove all filter params except 'search'
			[...params.keys()].forEach((key) => {
				if (key !== 'search') params.delete(key);
			});

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

			// Add only filters that have values
			for (const [key, values] of filterMap.entries()) {
				if (values.length > 0) {
					params.set(key, values.join(' '));
				}
			}

			// Restore ?search if it was present
			if (searchValue !== null) {
				params.set('search', searchValue);
			}

			let url =
				window.location.pathname +
				(params.toString() ? `?${params.toString()}`.replace(/%20/g, '+') : '');
			goto(url);
		};
	}}
	action=""
	method="POST"
	class="filter-bar is-active"
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
					<Filter value={option} name={filter.name}>
						{option}
					</Filter>
				{/each}
			</div>
		</fieldset>
	{/each}
</form>

<style>
	@media screen and (max-width: 1024px) {
		.is-active {
			position: absolute;
			transform: translateY(-150%);
		}
	}

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

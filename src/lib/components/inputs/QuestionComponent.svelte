<script lang="ts" module>
	import { blur } from 'svelte/transition';
	import type { QuestionType } from '$lib/types/questionType';
	import type { Item } from '$lib/types/itemType';
	import Slider from '$lib/components/inputs/Slider.svelte';
	import Searchbar from '$lib/components/inputs/Searchbar.svelte';
	import IconButton from '../buttons/IconButton.svelte';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
	import { pageView } from '$lib/stores/pageView.svelte';
</script>

<script lang="ts">
	let {
		allResults = $bindable([]),
		prompt = $bindable(''),
		filteredItems = $bindable([]),
		viewResults = $bindable([])
	} = $props();
	let questionIndex = $state(0);
	let followUpQuestion: QuestionType[] = $state([]);
	let selectedOption = $state('');

	$inspect(selectedOption);

	$inspect('All results', allResults);
	$inspect('Prompt', prompt);
	$inspect('Filtered Items', filteredItems);

	$effect(() => {
		if (allResults && allResults.length > 0) {
			const questions = [
				{
					type: 'vakgebied',
					feedback: `We hebben ${allResults.length} resultaten gevonden.`,
					message: 'In welk vakgebied valt het onderwerp waar je naar zoekt?',
					options: Array.from(
						new Set(
							allResults
								?.flatMap((item: Item) =>
									typeof item.rel_vakgebied === 'string'
										? (item.rel_vakgebied as string).split('\n').map((s: string) => s.trim())
										: Array.isArray(item.rel_vakgebied)
											? item.rel_vakgebied
											: typeof item.rel_vakgebied === 'number'
												? [String(item.rel_vakgebied)]
												: []
								)
								.filter(
									(value: string | null | undefined) =>
										value !== null && value !== undefined && value !== ''
								)
						)
					)
				},
				{
					type: 'thema',
					feedback: `We hebben ${allResults.length} resultaten gevonden.`,
					message: 'Binnen welk thema valt het onderwerp dat je zoekt?',
					options: Array.from(
						new Set(
							allResults
								?.flatMap((item: Item) =>
									typeof item.rel_thema === 'string'
										? (item.rel_thema as string).split('\n').map((s: string) => s.trim())
										: Array.isArray(item.rel_thema)
											? item.rel_thema
											: typeof item.rel_thema === 'number'
												? [String(item.rel_thema)]
												: []
								)
								.filter(
									(value: string | null | undefined) =>
										value !== null && value !== undefined && value !== ''
								)
						)
					)
				},
				{
					type: 'soort',
					feedback: `We hebben ${allResults.length} resultaten gevonden.`,
					message: 'Kan je specifieker zijn over het soort item waar je naar zoekt?',
					options: Array.from(
						new Set(
							allResults
								?.flatMap((item: Item) =>
									typeof item.soort === 'string' ? item.soort.split('\n').map((s) => s.trim()) : []
								)
								.filter(
									(value: string | null | undefined) =>
										value !== null && value !== undefined && value !== ''
								)
						)
					)
				}
			];

			followUpQuestion = questions.filter((q) => q.options && q.options.length >= 2);
		}
	});
</script>

<div>
	{#key followUpQuestion[questionIndex]}
		<p in:blur>
			{followUpQuestion && followUpQuestion.length > 0 && followUpQuestion[questionIndex]?.feedback
				? followUpQuestion[questionIndex].feedback
				: 'Welkom bij CMD Nexus'}
		</p>

		<h1 class="h1" in:blur>
			{followUpQuestion && followUpQuestion.length > 0 && followUpQuestion[questionIndex]?.message
				? followUpQuestion[questionIndex].message
				: 'Hoe kan ik je helpen?'}
		</h1>
	{/key}

	{#if allResults && allResults.length > 0 && followUpQuestion[questionIndex]}
		{#key followUpQuestion}
			<Slider bind:selectedOption filterItems={followUpQuestion[questionIndex].options} />

			<div class="flex-wrapper">
				<IconButton
					class="view-items-button"
					type="button"
					theme="secondary"
					variant="text"
					on:click={() => {
						viewResults = allResults;
						pageView.view = 'overview';
					}}
				>
					Bekijk {allResults.length} items
				</IconButton>
				<IconButton
					class="next-question-button"
					type="button"
					theme="secondary"
					variant="text"
					on:click={() => {
						const currentType = followUpQuestion[questionIndex].type;
						viewResults = allResults.filter((item: Item) => {
							if (currentType === 'vakgebied') {
								if (typeof item.rel_vakgebied === 'string') {
									return (item.rel_vakgebied as string)
										.split('\n')
										.map((s: string) => s.trim())
										.includes(selectedOption);
								} else if (Array.isArray(item.rel_vakgebied)) {
									return (item.rel_vakgebied as string[]).includes(selectedOption);
								}
							}
							if (currentType === 'thema') {
								if (typeof item.rel_thema === 'string') {
									return (item.rel_thema as string)
										.split('\n')
										.map((s: string) => s.trim())
										.includes(selectedOption);
								} else if (Array.isArray(item.rel_thema)) {
									return (item.rel_thema as string[]).includes(selectedOption);
								}
							}
							if (currentType === 'soort') {
								if (typeof item.soort === 'string') {
									return item.soort
										.split('\n')
										.map((s) => s.trim())
										.includes(selectedOption);
								} else if (Array.isArray(item.soort)) {
									return (item.soort as string[]).includes(selectedOption);
								}
							}
							return false;
						});
						console.log(
							'questionIndex:',
							questionIndex,
							'followUpQuestion.length:',
							followUpQuestion.length,
							'viewResults.length:',
							viewResults.length
						);

						if (viewResults.length <= 3) {
							pageView.view = 'overview';
						} else if (questionIndex < followUpQuestion.length - 1) {
							questionIndex += 1;
						} else {
							pageView.view = 'overview';
						}
					}}
				>
					Zoek in {selectedOption}
					<ArrowIcon class="next-question-arrow" />
				</IconButton>
			</div>
		{/key}
	{:else}
		<Searchbar bind:value={prompt} relatedItems={filteredItems} />
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
	}

	h1 {
		margin-bottom: 1rem;
		font-size: clamp(1.5rem, 3.529vw + 0.794rem, 3rem);

		@media screen and (min-width: 1024px) {
			max-width: 75%;
		}
	}

	:global(.next-question-arrow) {
		width: 1rem;
		height: 1rem;
		transform: rotate(90deg);
	}

	.flex-wrapper {
		margin-top: 10rem;
		margin-bottom: -10rem;
		display: flex;
		gap: 1.5rem;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>

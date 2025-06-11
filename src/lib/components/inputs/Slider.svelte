<script lang="ts" module>
	import { onMount } from 'svelte';
	import { pageView } from '$lib/stores/pageView.svelte';
</script>

<script lang="ts">
	let { filterItems = [], selectedOption = $bindable() } = $props();
	let sliderOptions: HTMLInputElement[] = $state([]);
	let sliderForm: HTMLFormElement | null = $state(null);
	let activity: HTMLDivElement | null = $state(null);

	$effect(() => {
		if (sliderForm) {
			sliderForm.style.setProperty('--item-count', filterItems.length.toString());
		}
	});

	onMount(() => {
		if (sliderOptions && sliderOptions.length > 0) {
			sliderOptions[0].checked = true;
			selectedOption = sliderOptions[0].value
				.replace(/-/g, ' ')
				.replace(/^./, (c) => c.toUpperCase());
			if (activity){
			activity.style.width = `${100 / sliderOptions.length}%`;
			}
		}
	});

	function viewTransition() {
		document.startViewTransition(() => {
			if (activity === null) return;
			
				const selectedIndex = sliderOptions.findIndex(option => option.checked);

				console.log(selectedIndex);
				console.log((100 / sliderOptions.length) * selectedIndex)
				activity.style.left = `${(100 / sliderOptions.length) * selectedIndex}%`;
		});
	}


</script>

<section>
	{#if filterItems}
		<form action="/" method="POST" bind:this={sliderForm}>
			<div class="activity {pageView.view}" bind:this={activity}></div>
			{#key selectedOption}
				{(() => {
					viewTransition();
				})()}
			{/key}
			{#each filterItems as item, i}
				<label>
					<input
						bind:this={sliderOptions[i]}
						style="--vt: slider{[i]}"
						class="slider-option"
						type="radio"
						name="slider"
						value={item.toLowerCase().replace(/\s+/g, '-')}
						checked={selectedOption === item}
						onchange={() => {
							selectedOption = item;
						}}
					/>
					{item}
				</label>
			{/each}
		</form>
	{/if}
</section>

<style>
	.activity{
		position: absolute;
		background-color: #c8bfff;
		border-radius: 9999px;
		height: 100%;
		view-transition-name: activity2;
}

	label {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 1.25rem;
		color: #ededed80;
		cursor: pointer;
		position: relative;
	}

	label:has(input:checked) {
		/* background-color: #dad4ff; */
		border-radius: 99px;
		color: #000000;
		/* scale: 0.95; */
	}

	input {
		visibility: hidden;
		position: absolute;
		view-transition-name: var(--vt);
	}

	form {
		display: grid;
		grid-template-columns: repeat(var(--item-count, 1), 1fr);

		outline: 1px solid #ffffff30;

		--opacity: 5%;
		background-color: var(--white);
		border-radius: 99px;

		justify-content: center;
		position: relative;
	}
</style>

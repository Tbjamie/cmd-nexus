<script lang="ts" module>
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	let { filterItems = [], selectedOption = $bindable() } = $props();
	let sliderOptions: HTMLInputElement[] = $state([]);
	let sliderForm: HTMLFormElement | null = $state(null);

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
		}
	});
</script>

<section>
	{#if filterItems}
		<form action="/" method="POST" bind:this={sliderForm}>
			{#each filterItems as item, i}
				<label>
					<input
						bind:this={sliderOptions[i]}
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
		background-color: #dad4ff;
		border-radius: 99px;
		color: #000000;
		scale: 0.95;
	}

	input {
		visibility: hidden;
		position: absolute;
	}

	form {
		display: grid;
		grid-template-columns: repeat(var(--item-count, 1), 1fr);

		outline: 1px solid #ffffff30;

		--opacity: 5%;
		background-color: var(--white);
		border-radius: 99px;

		justify-content: center;
	}
</style>

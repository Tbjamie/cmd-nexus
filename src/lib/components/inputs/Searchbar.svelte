<script lang="ts" module>
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import ArrowIcon from '$lib/assets/icons/arrow-icon.svg?component';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	let { value = $bindable(''), relatedItems = []} = $props();
	let inputEl: HTMLInputElement;
	let promptsArray = [
		'Waar ben je naar op zoek?',
		'Zoek naar een principe, methode of beroepstaak',
		'Wat wil je vandaag gaan leren?',
		'Wat is jouw volgende stap in je ontwikkeling?'
	];

	let currentPromptIndex = 0 as number;

	onMount(() => {
		// haal de placeholder prompt op uit de props
		inputEl = document.querySelector('input') as HTMLInputElement;

		// see which section is active
		const overviewSection = document.querySelector('.overview-page-wrapper') as HTMLElement;
		if (!overviewSection) {
			startNextPrompt();
		}
	})

	// functie om de placeholder prompt te veranderen
	function startNextPrompt() {
		if (currentPromptIndex >= promptsArray.length) {
			currentPromptIndex = 0
		}

		const nextPrompt = promptsArray[currentPromptIndex];
		currentPromptIndex++;

		const promptLetters = getPromptLetters(nextPrompt);
		typePrompt(promptLetters);
	}


	// function to get each letter of the prompt
	function getPromptLetters(prompt: string): string[] {
		return prompt.split('');
	}

	function typePrompt(promptLetters: string[]) {
		let index = 0;
		inputEl.placeholder = '';

		function typeNext() {
			if (index < promptLetters.length) {
				inputEl.placeholder += promptLetters[index];
				index++;
				setTimeout(typeNext, 100);
			} else {
				setTimeout(() => erasePrompt(), 2000);
			}
		}

		typeNext();
	}

	function erasePrompt() {
		if (inputEl.placeholder.length > 0) {
			inputEl.placeholder = inputEl.placeholder.slice(0, -1);
			setTimeout(erasePrompt, 10);
		} else {
			startNextPrompt();
		}
	}
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
		placeholder={promptsArray[currentPromptIndex] || 'Waar ben je naar op zoek?'}
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
		border: none;
		width: 100%;
		max-width: 700px;

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
</style>
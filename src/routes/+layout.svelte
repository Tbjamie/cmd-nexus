<script lang="ts" module>
	import '../app.css';

	import NexusLogoFull from '$lib/assets/icons/logo-full-name-icon.svg?component';
	import ToggleButton from '$lib/components/buttons/ToggleButton.svelte';
	import LogoIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import { page } from '$app/state';
</script>

<script lang="ts">
	let { children } = $props();
	let pathname = '';

	$effect(() => {
		pathname = page.url.pathname;
	});
	setInterval(() => {
		console.log(pathname);
	}, 1000);
</script>

<header class="main-page-spacing">
	<a href="/"><LogoIcon class="logo-header" /></a>
	<ToggleButton />
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>copyright</p>
	<NexusLogoFull class="logo" />
</footer>

<style>
	header {
		padding-top: 2em;
		display: flex;
		justify-content: space-between;

		/* position: fixed; */
		/* padding: 4rem 4rem; */
		/* width: 100vw; */
		max-width: 1600px;
		z-index: 3;
	}

	a {
		display: inline-flex;
		color: var(--white);
		text-decoration: none;
		align-items: center;
	}

	a:hover {
		color: var(--purple-light);
	}

	:global(.logo-header) {
		width: 2em;
		/* margin: auto; */
	}

	footer {
		position: relative;
		/* display: flex; */
		/* flex-direction: column; */
		/* align-items: center; */
		text-align: center;
		/* position: absolute; */
		/* bottom: 0; */
		/* width: 100%; */
		/* padding-top: 3.5rem; */
		padding-bottom: 1rem;
	}
	:global(.logo) {
		margin-top: 0.25rem;
		height: 2rem;
	}
</style>

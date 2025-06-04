<script lang="ts" module>
	import '../app.css';

	import ToggleButton from '$lib/components/buttons/ToggleButton.svelte';
	import LogoIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import { page } from '$app/state';
	import { pageView } from '$lib/stores/pageView.svelte';
</script>

<script lang="ts">
	let { children } = $props();
	let pathname = $state('');

	$effect(() => {
		pathname = page.url.pathname;
	});

	setInterval(() => {
		console.log(pathname);
	}, 1000);
</script>

{#if pathname === '/'}
	<header class="main-page-spacing">
		{#if pageView.view === 'overview'}
			<a aria-label="Nexus logo, linking to the homepage" href="/"
				><LogoIcon class="logo-header" /></a
			>
		{/if}
		<ToggleButton class="toggle-button" />
	</header>
{:else}
	<header class="main-page-spacing">
		<a aria-label="Nexus logo, linking to the homepage" href="/"><LogoIcon class="logo-header" /></a
		>
	</header>
{/if}

<main>
	{@render children()}
</main>

<style>
	header {
		display: flex;
		justify-content: start;

		position: absolute;
		padding: 4rem;
		width: 100vw;
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

	:global(.logo) {
		margin-top: 0.25rem;
		height: 2rem;
	}

	:global(.toggle-button) {
		margin-left: auto;
	}
</style>

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
</script>

{#if pathname === '/'}
	<header class="main-page-spacing {pageView.view === 'overview' ? 'relative' : ''}">
		{#if pageView.view === 'overview'}
			<a aria-label="Nexus logo, linking to the homepage" href="/">
				<LogoIcon class="logo-header" />
			</a>
		{/if}
		<ToggleButton class="toggle-button" />
	</header>
{:else}
	<header class="main-page-spacing relative">
		<a aria-label="Nexus logo, linking to the homepage" href="/">
			<LogoIcon class="logo-header" />
		</a>
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

	.relative {
		position: relative;
	}

	a {
		color: var(--white);
	}

	a:hover {
		color: var(--purple-light);
	}

	:global(.logo-header) {
		height: 2rem;
	}

	:global(.toggle-button) {
		margin-left: auto;
	}
</style>

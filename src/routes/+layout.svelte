<script lang="ts" module>
	import '../app.css';

	import ToggleButton from '$lib/components/buttons/ToggleButton.svelte';
	import LogoIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import NexusIcon from '$lib/assets/icons/logo-nexus-icon.svg?component';
	import NexusSmallIcon from '$lib/assets/icons/logo-small-icon.svg?component';
	import { page } from '$app/state';
	import { pageView } from '$lib/stores/pageView.svelte';
	import { onNavigate } from '$app/navigation';
</script>

<script lang="ts">
	let { children } = $props();
	let pathname = $state('');

	$effect(() => {
		pathname = page.url.pathname;
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{#if pathname === '/'}
	<header class="main-page-spacing {pageView.view === 'overview' ? 'relative' : ''}">
		<ToggleButton class="toggle-button" />
		{#if pageView.view === 'overview'}
			<div class="logo-header">
				<a aria-label="Nexus logo, linking to the homepage" href="/">
					<NexusSmallIcon class="logo-header" />
				</a>
			</div>
		{/if}
		<div class="account-wrapper"></div>
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
		justify-content: space-between;
		flex-direction: row;
		align-items: center;

		position: absolute;
		padding: 3rem 4rem;
		width: 100vw;
		z-index: 3;
	}

	.relative {
		position: relative;
	}

	a {
		color: var(--white);
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	a:hover {
		color: var(--purple-light);
	}

	:global(.logo-header) {
		height: 2rem;
		view-transition-name: logo-star;
	}

	.account-wrapper {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		border: 1px solid var(--white);
		aspect-ratio: 1 / 1;
	}
</style>

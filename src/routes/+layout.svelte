<script lang="ts" module>
	import '../app.css';

	import ToggleButton from '$lib/components/buttons/ToggleButton.svelte';
	import LogoIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import UserIcon from '$lib/assets/icons/user-icon.svg?component';
	import { page } from '$app/state';
	import { pageView } from '$lib/stores/pageView.svelte';
	import { onNavigate } from '$app/navigation';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import { fly } from 'svelte/transition';
	import { showBookmarkTooltip } from '$lib/stores/bookmarkTooltip.svelte';
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
			<div>
				<a
					aria-label="Nexus logo, linking to the homepage"
					onclick={() => {
						pageView.view = 'nexus';
						localStorage.setItem('pageView', 'nexus');
					}}
					data-sveltekit-reload
					href="/"
				>
					<LogoIcon class="logo-header" />
				</a>
			</div>
		{/if}
		<IconButton href="/account" theme="secondary" class="account-link" variant="text">
			<UserIcon class="user-icon" />
			Account
			{#key showBookmarkTooltip}
				{#if showBookmarkTooltip.value}
					<div class="bookmark-tooltip" transition:fly={{ y: 10 }}>Bookmark added</div>
				{/if}
			{/key}
		</IconButton>
	</header>
{:else}
	<header class="main-page-spacing relative">
		<a
			aria-label="Nexus logo, linking to the homepage"
			href="/"
			onclick={() => {
				pageView.view = 'nexus';
				localStorage.setItem('pageView', 'nexus');
			}}
		>
			<LogoIcon class="logo-header" />
		</a>
		<IconButton href="/account" theme="secondary" class="account-link" variant="text">
			<UserIcon class="user-icon" />
			Account
		</IconButton>
	</header>
{/if}

<main>
	{@render children()}
</main>

<style>
	header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-content: center;
		align-items: center;

		position: absolute;
		padding: 3rem 4rem;
		width: 100vw;
		z-index: 9999;
	}

	.relative {
		position: relative;
	}

	a {
		color: var(--white);
		display: flex;
		justify-content: center;
		grid-column-start: 2;
		align-items: center;
		gap: 1rem;
		justify-self: center;
		width: max-content;
	}

	.bookmark-tooltip {
		position: absolute;
		bottom: -100%;
		left: 0;
		background-color: var(--purple-light);
		color: var(--black);
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius-medium);
		font-size: 0.875rem;
		width: 100%;
		z-index: 100;
	}

	.bookmark-tooltip::after {
		content: ' ';
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--purple-light) transparent;
	}

	a:hover {
		color: var(--purple-light);
	}

	:global(.logo-header) {
		height: 2rem;
		view-transition-name: logo-star;
	}

	:global(.nexus-logo-header) {
		height: 1.25rem;
	}

	:global(.account-link) {
		grid-column-start: 3;
		justify-self: flex-end;
	}

	:global(.user-icon) {
		width: 1rem;
		height: 1rem;
	}
</style>

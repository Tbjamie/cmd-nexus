<script lang="ts" module>
	import LayoutIcon from '$lib/assets/icons/layout-icon.svg?component';
	import AiStarIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import { pageView } from '$lib/stores/pageView.svelte';
</script>

<script lang="ts">
	export { className as class };
	let className = '';
	let activity: HTMLDivElement;

	function viewTransition() {
		document.startViewTransition(() => {
			if (pageView.view === 'nexus') {
				activity.style.transform = 'translateX(0%)';
			} else {
				activity.style.transform = 'translateX(100%)';
			}
		});
	}
</script>

<ul class="nexus-selection {className}">
	<div class="activity {pageView.view}" bind:this={activity}></div>
	{#key pageView.view}
		{(() => {
			viewTransition();
		})()}
	{/key}
	<li>
		<button
			style="--vt: nexus"
			aria-label="magic search button"
			class:active={pageView.view === 'nexus'}
			disabled={pageView.view === 'nexus'}
			onclick={() => {
				pageView.view = 'nexus';
				localStorage.setItem('pageView', 'nexus');
			}}
		>
			<AiStarIcon class="layout-icon star" />
		</button>
	</li>
	<li>
		<button
			style="--vt: overview"
			aria-label="overview page button"
			class:active={pageView.view === 'overview'}
			disabled={pageView.view === 'overview'}
			onclick={() => {
				pageView.view = 'overview';
				localStorage.setItem('pageView', 'overview');
			}}
		>
			<LayoutIcon class="layout-icon" />
		</button>
	</li>
</ul>

<style>
	button {
		border: none;
		background-color: transparent;

		cursor: pointer;
		list-style: none;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1.2rem 0.5rem 1.2rem;

		--opacity: 60%;
		color: var(--white);
		gap: 0.5em;
		view-transition-name: var(--vt);
	}

	button.active {
		--opacity: 100%;
		color: var(--black);
	}

	button:disabled {
		cursor: default;
	}

	ul {
		display: flex;
		width: 100%;
		max-width: fit-content;
		position: relative;
		/* height: 2rem; */
		overflow: hidden;

		/* gap: 1rem; */
		outline: 1px solid #ffffff30;

		background-color: #2e2e2e70;
		border-radius: 99px;

		justify-content: center;
		list-style: none;

		top: 5%;

		& li {
			width: 100%;
			height: fit-content;
			border-radius: 1em;
			z-index: 1;
		}

		& div {
			position: absolute;
			background-color: #c8bfff;
			border-radius: 9999px;
			width: 50%;
			height: 100%;
			left: 0;
			view-transition-name: activity;

			/* transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1); */
		}
	}

	:global(.layout-icon) {
		/* padding: 1em; */
		width: 2rem;
		height: 2rem;
	}
</style>

<script lang="ts" module>
	import LayoutIcon from '$lib/assets/icons/layout-icon.svg?component';
	import AiStarIcon from '$lib/assets/icons/ai-star-icon.svg?component';
	import { slide } from 'svelte/transition';
	import { pageView } from '$lib/stores/pageView.svelte';
</script>

<script lang="ts">
	export { className as class };

	let className = '';
</script>

<ul class="nexusSelection {className}">
	<li transition:slide>
		<button
			class:active={pageView.view == 'nexus'}
			onclick={() => {
				pageView.view = 'nexus';
			}}
		>
			<AiStarIcon class="layout-icon" />
		</button>
	</li>
	<li transition:slide>
		<button
			class:active={pageView.view == 'overview'}
			onclick={() => {
				pageView.view = 'overview';
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

		color: #ededed80;
		gap: 0.5em;
	}

	button:active {
		scale: 0.95;
		transition: ease all 100ms;
	}

	.active {
		background-color: #dad4ff;
		/* view-transition-name: selectionActive; */
		border-radius: 99px;
		color: #000000;
	}

	ul {
		display: flex;
		width: 100%;
		max-width: fit-content;
		/* height: 2rem; */

		/* gap: 1rem; */
		outline: 1px solid #ffffff30;

		background-color: #2e2e2e70;
		border-radius: 99px;

		justify-content: center;
		list-style: none;

		top: 5%;
		left: 5%;

		& li {
			width: 100%;
			height: fit-content;
			border-radius: 1em;
		}
	}

	:global(.layout-icon) {
		/* padding: 1em; */
		width: 2rem;
		height: 2rem;
	}
</style>

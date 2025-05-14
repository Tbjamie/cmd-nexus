<script lang="ts">
	export let element: 'button' | 'a' = 'button';
</script>

<svelte:element this={element} class="icon-button">
	<span>
		<slot />
	</span>
</svelte:element>

<style>
	.icon-button {
		background: var(--white);
		border-radius: 9999px;
		padding: 0.5rem;
		border: none;
		position: relative;
		mix-blend-mode: color-dodge;
		aspect-ratio: 1 / 1;
	}
</style>

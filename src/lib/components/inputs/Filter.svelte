<script lang="ts">
	export let type: 'checkbox' | 'radio' = 'checkbox';
	export let name = '';
	export let itemCount: number | null;
</script>

<label>
	<input {type} {name} />
	<slot />
	{#if itemCount && itemCount !== null}
		({itemCount})
	{/if}
</label>

<style>
</style>

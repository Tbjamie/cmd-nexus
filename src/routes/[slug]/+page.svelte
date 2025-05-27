<script lang="ts" module>
	import { page } from '$app/state';
	import type { Item } from '$lib/types/itemType';
</script>

<script lang="ts">
	const item: Item = page.data?.item;

	console.log(item);
</script>

{#if item}
	<h1>{item.naam}</h1>
	<p>{item.korte_beschrijving}</p>
{/if}

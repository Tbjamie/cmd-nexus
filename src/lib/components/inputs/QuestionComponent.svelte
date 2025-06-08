<script lang="ts" module>
	import { blur } from 'svelte/transition';
</script>

<script lang="ts">
	export let feedback = '';
	export let message = '';
</script>

<!-- 'let feedback' is the feedback that the search gives back to the user about the given prompt -->
<!-- 'let message' is the message/question the user sees and has to interact with/to -->

<div>
	{#await message}
		<p>Loading...</p>
	{:then}
		{#key feedback}
			<p in:blur>
				{feedback}
			</p>
		{/key}

		{#key message}
			<h1 class="h1" in:blur>
				{message}
			</h1>
		{/key}
	{/await}

	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
	}

	h1 {
		margin-bottom: 1rem;

		@media screen and (min-width: 1024px) {
			max-width: 70%;
		}
	}
</style>

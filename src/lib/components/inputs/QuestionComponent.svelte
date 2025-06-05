<script lang="ts">
	export let feedback = '';
	export let message = '';
</script>

<!-- 'let feedback' is the feedback that the search gives back to the user about the given prompt -->
<!-- 'let message' is the message/question the user sees and has to interact with/to -->

<div>
	{#if feedback}
		<p>
			{feedback}
		</p>
	{/if}

	{#if message}
		<h1 class="h1">
			{message}
		</h1>
	{/if}

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
	}
</style>

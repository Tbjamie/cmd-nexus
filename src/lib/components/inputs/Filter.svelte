<!-- 1. Make the code easier, so retrieve url data, check if it matches with checkbox and apply -->

<script lang="ts" module>
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
</script>

<script lang="ts">
	export let type: 'checkbox' | 'radio' = 'checkbox';
	export let name = '';
	export let itemCount: number | null = 0;
	export let value: string | number | boolean = '';

	const checked = derived(page, ($page) => {
		const params = $page.url.searchParams;
		const paramValue = params.get(name.toLowerCase().replace(/\s+/g, '-'));
		if (!paramValue) return false;
		const values = paramValue.split(/\s+/);
		const normalizedValue = (typeof value === 'string' ? value : String(value))
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/-\(\d+\)$/, '');
		return values.includes(normalizedValue);
	});
</script>

<label>
	{#if type === 'checkbox'}
		<input
			type="checkbox"
			{name}
			{value}
			checked={$checked}
			on:change={(e) => {
				const input = e.target as HTMLInputElement;
				if (input.form) input.form.requestSubmit();
			}}
		/>
	{:else if type === 'radio'}
		<input
			type="radio"
			{name}
			{value}
			checked={$checked}
			on:change={(e) => {
				const input = e.target as HTMLInputElement;
				if (input.form) input.form.requestSubmit();
			}}
		/>
	{/if}
	<span>
		<slot />
		{#if itemCount && itemCount !== null}
			({itemCount})
		{/if}
	</span>
</label>

<style>
	input {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: solid 1px var(--purple-light);
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 2px;
		cursor: pointer;
	}

	input:checked {
		background-color: var(--purple-light);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input:checked::after {
		content: url('/src/lib/assets/icons/checkmark-icon.svg');
		width: 75%;
		color: var(--black);
	}

	label {
		font-size: 0.875rem;
		overflow: hidden;
		display: flex;
		font-weight: 300;
		cursor: pointer;
		align-items: center;
		gap: 0.5rem;
		text-transform: capitalize;
	}

	label span {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 1;
		-webkit-line-clamp: 1;
		width: 100%;
	}
</style>

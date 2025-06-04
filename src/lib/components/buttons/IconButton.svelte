<script lang="ts">
	export let href = '';
	export let target: '_self' | '_blank' = '_self';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let theme: 'primary' | 'secondary' = 'primary';
	export let variant: 'icon' | 'text' = 'icon';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	target={href ? target : null}
	type={href ? null : type}
	href={href ? href : null}
	class="icon-button {theme} {variant}"
>
	<slot />
</svelte:element>

<style>
	.icon-button {
		background: var(--white);
		border-radius: 9999px;
		padding: 0.5rem;
		border: none;
		position: relative;
		text-decoration: none;
		/* mix-blend-mode: color-dodge; */
		cursor: pointer;
		transition: 200ms;
		display: flex;
		justify-content: center;
		align-items: center;
		color: initial;
		position: relative;
	}

	.primary {
		background-color: var(--purple-light);
		border: unset;
	}

	.secondary {
		padding: .25rem;
		--opacity: 100%;
		background-color: transparent;
		color: var(--white);
		outline: 1px solid var(--white);
	}

	.icon {
		aspect-ratio: 1/1;
	}

	.text {
		aspect-ratio: unset;
	}

	.icon-button::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		/* box-shadow: 0 0 16px var(--black); */
		border-radius: 9999px;
	}

	.icon-button:hover,
	.icon-button:focus-visible {
		--opacity: 80%;
	}

	.icon-button:active {
		--opacity: 100%;
		background: var(--purple-dark);
		transition: 100ms;
	}

	@media screen and (min-width: 1563px) {
		.icon-button {
			padding: 0.75rem;
		}
	}
</style>

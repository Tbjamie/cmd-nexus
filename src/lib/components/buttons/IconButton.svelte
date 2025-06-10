<script lang="ts">
	export let href = '';
	export let target: '_self' | '_blank' = '_self';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let theme: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let variant: 'icon' | 'text' = 'icon';
	export let disabled = false;
	export { className as class };

	let className = '';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	target={href ? target : null}
	type={href ? null : type}
	href={href ? href : null}
	on:click
	{disabled}
	class="icon-button {theme} {variant} {className}"
	role={href ? 'link' : 'button'}
>
	<slot />
</svelte:element>

<style>
	.icon-button {
		width: fit-content;
		background: var(--white);
		border-radius: 9999px;
		padding: 0.3rem;
		border: none;
		position: relative;
		text-decoration: none;
		/* mix-blend-mode: color-dodge; */
		cursor: pointer;
		transition: 200ms;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		align-items: center;
		color: initial;
		position: relative;

		font-family: 'Geist', sans-serif;
	}

	.icon-button:active {
		transition: 100ms;
	}

	.icon-button:disabled {
		cursor: default;
	}

	.primary {
		background-color: var(--purple-light);
		border: unset;
		color: var(--black);
		padding: 0.5rem;

		&:hover,
		&:focus-visible {
			--opacity: 60%;
		}

		&:active {
			--opacity: 100%;
			background: var(--purple-dark);
			color: var(--white);
		}

		&:disabled {
			--opacity: 40%;
			background: var(--white);

			&:active {
				--opacity: 40%;
				color: var(--black);
			}
		}

		@media screen and (min-width: 1563px) {
			padding: 0.75rem;
		}
	}

	.secondary.text {
		padding: 1rem 2rem;

		@media screen and (max-width: 768px) {
			padding: 0.55em;
		}
	}

	.secondary {
		--opacity: 100%;
		background-color: transparent;
		color: var(--white);
		outline: 1px solid var(--white);

		&:hover,
		&:focus-visible {
			--opacity: 100%;
			background-color: var(--white);
			color: var(--black);
		}

		&:active {
			--opacity: 60%;
		}

		&:disabled {
			--opacity: 100%;

			&:hover,
			&:focus-visible {
				background-color: transparent;
				color: var(--white);
				outline: 1px solid var(--white);
			}
			&:active {
				background-color: transparent;
				color: var(--white);
				outline: 1px solid var(--white);
			}
		}

		@media screen and (min-width: 1563px) {
			padding: 0.75rem;
		}

		@media screen and (max-width: 768px) {
			padding: 0.5em 1em;
		}
	}

	.tertiary {
		background-color: transparent;
		padding: 0;
		color: var(--white);

		&:hover,
		&:focus-visible {
			--opacity: 80%;
		}
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
</style>

<script>
	let { inputVal = $bindable(''), relatedItems = [] } = $props();
	console.log('inputVal', relatedItems);
</script>

<div class="result-wrapper">
	<ul class="autocomplete-list">
		<li>
			<a href="/">
				Zoek "{inputVal}"
			</a>
		</li>
		{#each relatedItems as item}
			<li>
				<a
					href="/{item.naam
						.toLowerCase()
						.replace(/[\s:]+/g, '-')
						.replace(/[^\w-]+/g, '')}"
				>
					{item.naam}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	a {
		text-decoration: none;
		color: var(--white);
		font-family: inherit;
		font-size: inherit;

		width: 100%;
		padding: 1rem 1.5rem;
		transition: all 200ms ease-in-out;
		display: flex;
	}

	a:hover,
	a:focus-visible {
		--opacity: 25%;
		background: var(--white);

		color: white;
	}

	li {
		list-style: none;
		width: 100%;
		overflow: hidden;

		&:last-of-type {
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}
	}

	.result-wrapper {
		--opacity: 15%;

		position: absolute;
		top: calc(3rem + 15px);
		left: 0;
		right: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		width: 100%;

		background: var(--white);
		backdrop-filter: blur(20px);
		border-radius: 15px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		-webkit-backdrop-filter: blur(20px);
		outline: solid 1px rgba(255 255 255 / 0.5);
		/* border-top: none; */
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: baseline;
	}

	@media screen and (min-width: 1563px) {
		.result-wrapper {
			top: calc(3rem + 24px);
		}
	}
</style>

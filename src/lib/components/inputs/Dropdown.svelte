<script>
	let { inputVal = $bindable(''), relatedItems = [] } = $props();
</script>

<div class="result-wrapper">
	<ul class="autocomplete-list">
		<li class="autocomplete-item">
			<a
				href="?search={inputVal
					.toLowerCase()
					.replace(/[\s:]+/g, '-')
					.replace(/[^\w-]+/g, '')}"
			>
				Zoek "{inputVal}"
			</a>
		</li>
		{#each relatedItems as item}
			<li class="autocomplete-item">
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

		transition: all 200ms ease-in-out;
		display: flex;
		text-align: start;

		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		line-clamp: 1;
		-webkit-line-clamp: 1;
	}

	a::before {
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.autocomplete-item:hover,
	.autocomplete-item:has(a:focus-visible) {
		--opacity: 25%;
		background: var(--white);

		color: white;
	}

	.autocomplete-item {
		list-style: none;
		width: 100%;
		overflow: hidden;
		padding: 1rem 1.5rem;
		position: relative;

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
		backdrop-filter: blur(10px);
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

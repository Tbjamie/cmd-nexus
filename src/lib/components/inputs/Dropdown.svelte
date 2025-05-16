<script>
	export let inputVal = "";
</script>

<div class="result-wrapper">
	<ul>
		<!-- max 4 results -->
		<a class=".body-text" href=""><li>Search for "{inputVal}"</li></a>
		<a class=".body-text" href=""><li>Crazy 8</li></a>
		<a class=".body-text" href=""><li>VID</li></a>
		<a class=".body-text" href=""><li>HCD</li></a>
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

	a:hover {
		background: var(--hover-gradient);

		&:last-of-type {
			border-bottom-left-radius: 15px;
			border-bottom-right-radius: 15px;
		}
	}

	li {
		list-style: none;
	}

	.result-wrapper {
		--opacity: 12%;

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
		border: solid 1px rgba(255 255 255 / 0.5);
		border-top: none;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: baseline;
	}
</style>

<script lang="ts" module>
	import '../app.css';
	// import { gsap } from 'gsap';
	import Lenis from 'lenis';
	// import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	import NexusLogoFull from '$lib/assets/icons/logo-full-name-icon.svg?component';
</script>

<script lang="ts">
	let { children } = $props();

	onMount(() => {
		// gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();

		// lenis.on('scroll', ScrollTrigger.update);

		// gsap.ticker.add((time) => {
		// 	lenis.raf(time * 1000);
		// });

		// gsap.ticker.lagSmoothing(0);
	});
</script>

<header>
	<!-- LOGO -->

	<!-- INFOBUTTON -->
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>copyright</p>
	<NexusLogoFull class="logo" />
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		padding-top: 3.5rem;
		padding-bottom: 3.5rem;
	}
	:global(.logo) {
		margin-top: 0.25rem;
		height: 2rem;
	}
</style>

<script lang="ts" module>
	import '../app.css';
	import { gsap } from 'gsap';
	import Lenis from 'lenis';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	let { children } = $props();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	});
</script>

<main class="h-[300vh] bg-gradient-to-b from-[#000] to-[#fff]">
	{@render children()}
</main>

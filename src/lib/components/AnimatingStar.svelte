<script lang="ts" module>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
</script>

<script lang="ts">
	let { prompt = $bindable(''), submit = $bindable(false) } = $props();
	let starAnimationTimeout: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		const tl_finished = gsap.timeline({
			repeat: 1,
			defaults: { ease: 'sine.inOut' },
			paused: submit ? false : true,
			yoyo: true
		});

		// main timeline waar de ster animatie op draait
		const tl = gsap.timeline({ repeat: -1, paused: true });

		if (document.querySelector('.star2') && document.querySelector('.star1')) {
			// Ster 2 wiggle code
			// komende 4 code secties
			for (let i = 0; i < 8; i++) {
				tl.to('.star2', {
					scale: 1.1,
					x: -14,
					y: 36,
					duration: 0.1,
					rotation: i % 2 === 0 ? 2 : -2,
					ease: 'circ.ease'
				});
			}

			// start van de right sweep v/d ster
			tl.to('.star2', {
				scale: 1.2,
				x: -14,
				y: 36,
				duration: 0.5,
				rotation: 10,
				ease: 'circ.easeIn'
			})
				.to(
					'.star1',
					{
						scale: 1,
						duration: 1,
						rotation: 0,
						ease: 'circ.ease',
						filter: 'drop-shadow(1px 2px 20px #6E56FF40)'
					},
					'<'
				) // start van de drop-shadow glow gelijktijdig aan het vorige keyframe op de timeline door: "<"
				.to('.star2', {
					scale: 1,
					x: -15,
					y: 35,
					duration: 0.5,
					ease: 'circ.ease',
					rotation: 0
				})
				.to(
					'.star1',
					{
						scale: 1.1,
						duration: 0.3,
						rotation: -1,
						ease: 'circ.ease',
						filter: 'drop-shadow(1px 2px 20px #6E56FF)'
					},
					'<'
				)
				.to('.star1', {
					scale: 1,
					duration: 1,
					rotation: 0,
					ease: 'circ.ease',
					filter: 'drop-shadow(1px 2px 20px #6E56FF40)'
				});

			// Opbouw wave + ronddaaien star2

			tl_finished
				.to('.star2', {
					x: -8,
					y: 30,
					scale: 1.1,
					ease: 'power3.inOut',
					rotate: 15,
					duration: 1,
					filter: 'drop-shadow(1px 2px 20px #57ff9d)'
				})

				// Star1 beweegt mee, ietsjes later

				.to(
					'.star1',
					{
						scale: 1.07,
						y: -4,
						rotate: -8,
						duration: 1,
						filter: 'drop-shadow(1px 2px 20px #57ff9d40)'
					},
					'<0.4'
				)

				// 3) Climax: pulse + extra roteren star2

				.to('.star2', {
					scale: 1,
					rotate: 15 + 360, //  maak volledige spin
					duration: 0.5,
					ease: 'power3.out'
				})

				.to(
					'.star2',
					{
						scale: 1,
						duration: 0.4,
						ease: 'sine.out'
					},
					'<0.4'
				)

				// 4) Finale: samen vloeiend terug naar huis

				.to('.star1, .star2', {
					rotate: 0,
					scale: 1,
					duration: 0.7,
					ease: 'power3.inOut',
					filter: 'drop-shadow(1px 2px 20px #57ff9d)'
				});

			$effect(() => {
				if (prompt) {
					if (starAnimationTimeout) clearTimeout(starAnimationTimeout);
					starAnimationTimeout = setTimeout(() => {
						tl.play();
					}, 500);
				} else {
					tl.eventCallback('onRepeat', () => {
						tl.pause();
						tl.eventCallback('onRepeat', null);
					});
					tl.play();
				}
			});
		}
	});
</script>

<div class="logo-star block">
	<svg class="star1" viewBox="0 0 46 45" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
				<stop offset="0%" stop-color="#C8BFFF" />
				<stop offset="70%" stop-color="#6E56FF" />
				<stop offset="100%" stop-color="#351FB7" />
			</linearGradient>

			<linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="0%">
				<stop offset="0%" stop-color="yellow" />
				<stop offset="100%" stop-color="rgba(255, 0, 220,1)" />
			</linearGradient>
		</defs>

		<path
			d="M27.817 38.2253L25.5475 43.423C24.6756 45.4212 21.9102 45.4212 21.0383 43.423L18.7689 38.2253C16.7487 33.5998 13.1139 29.9173 8.58019 27.9049L2.33369 25.1317C0.347104 24.2508 0.347104 21.3613 2.33369 20.4791L8.38515 17.7924C13.0364 15.7283 16.7358 11.9102 18.7211 7.12585L21.0202 1.58718C21.8727 -0.467862 24.7131 -0.467862 25.5669 1.58718L27.8661 7.12585C29.8514 11.9089 33.552 15.7271 38.202 17.7924L44.2534 20.4791C46.24 21.36 46.24 24.2495 44.2534 25.1317L38.0069 27.9049C33.4719 29.9186 29.8371 33.5998 27.817 38.2253Z"
			fill="url(#grad1)"
		/>
	</svg>
	<svg class="star2" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M13.6773 19.7922L12.5425 22.391C12.1066 23.3902 10.7238 23.3902 10.2879 22.391L9.15313 19.7922C8.14303 17.4794 6.32562 15.6381 4.05871 14.6319L0.935411 13.2452C-0.0578973 12.8048 -0.0578973 11.36 0.935411 10.9189L3.96119 9.57556C6.28687 8.5435 8.13657 6.63439 9.12923 4.24218L10.2788 1.4728C10.7051 0.445264 12.1253 0.445264 12.5522 1.4728L13.7018 4.24218C14.6945 6.63374 16.5448 8.54285 18.8699 9.57556L21.8956 10.9189C22.8889 11.3594 22.8889 12.8041 21.8956 13.2452L18.7723 14.6319C16.5048 15.6387 14.6874 17.4794 13.6773 19.7922Z"
			fill="url(#grad2)"
		/>
	</svg>
</div>

<style>
	.logo-star {
		view-transition-name: logo-star;
		transform: scale(1.25);
	}

	.block {
		height: 4rem;
		width: 4rem;
		position: relative;
		margin-bottom: 2rem;

		& .star1 {
			width: 45px;
			height: 45px;
			filter: drop-shadow(1px 2px 20px #6e56ff30);
		}

		& .star2 {
			width: 25px;
			height: 25px;
			filter: drop-shadow(1px 2px 20px #6e56ff30);
			transform: translatex(-15px) translatey(35px);
			position: absolute;
		}
	}
</style>

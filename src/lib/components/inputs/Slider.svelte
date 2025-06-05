<script lang="ts" module>
    import { onMount } from "svelte";
</script>

<script lang="ts">
    export let filterItems;

    let sliderOptions: HTMLInputElement[] = [];
    let sliderLabels: HTMLLabelElement[] = [];

    onMount(() => {
        sliderOptions[0].checked = true;

        
            sliderLabels.forEach((label) => {
                label.addEventListener("click", (e) => {
                    document.startViewTransition(() => {
                        sliderLabels.forEach(l => l.classList.remove('active'));
                            if(e.target instanceof HTMLElement) {
                                label.classList.add('active')
                                console.log(e.target)
                            }
                    })
                })
            })

    })
</script>

<section>
  {#each filterItems as item, i}
    <label bind:this={sliderLabels[i]}>
      <input
        bind:this={sliderOptions[i]}
        class="slider-option"
        type="radio"
        name="slider"
      >
      {item}
    </label>
  {/each}
</section>



<style>
    label {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 1.2rem;
    color: #ededed80;
    cursor: pointer;
    position: relative;

    }

    label:has(input:checked){
     background-color: #dad4ff;
    border-radius: 99px;
    color: #000000;
    scale: 0.95;

    }

    input {
        visibility: hidden;
        position: absolute;
    }


    section {
    display: flex;
    width: fit-content;
    height: 2rem;

    gap: 1rem;
    padding: 0.2rem 0.2rem 0.2rem 0.2rem;
    outline: 1px solid #ffffff30;

    background-color: #2e2e2e70;
    border-radius: 99px;

    justify-content: center;
    }




/* Animaties voor View Transitions API */
/* ::view-transition-old(active-label),
::view-transition-new(active-label) {
  height: 100%;
  border-radius: 99px;
}

::view-transition-old(active-label) {
  animation: fade-out 1s ease;
}

::view-transition-new(active-label) {
  animation: fade-in 1s ease;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
} */
</style>
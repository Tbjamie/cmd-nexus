<script>
    // import TagComponent from '../TagComponent.svelte';
    let { tag = $bindable(''), href = $bindable(''), variant = $bindable('')} = $props();

</script>

<a href={href} class="card-container {variant}">
   <div class="card-wrapper">
       <div class="card-header">
           <!-- label component -->
           <!-- bookmark component -->
       </div>
       <!-- svelte-ignore slot_element_deprecated -->
         <div class="card-content">
            <slot />
         </div>
       <!-- svelte-ignore slot_element_deprecated -->
       <div class="card-footer">
            {#if tag}
                <!-- <TagComponent>{tag}</TagComponent> -->
           {/if}
            <slot name="moeilijkheidsgraad" />
       </div>
   </div>
</a>

<style>
/* Variants van Cards */
/* 1. small or normal */

    .card-container.normal {
        --opacity: 8%;

        background-color: var(--white);
        backdrop-filter: var(--backdrop-filter);
        padding: 26px 32px;
        border-radius: var(--border-radius-large);

        max-width: 35rem;
        width: 100%;

        .card-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1.8rem;

            .card-header, .card-footer {
                display: flex;
                justify-content: space-between;
            }

            .card-content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: .75rem;
            }
        }


        & > * {
            color: var(--white);
        }
    }

    .card-content :global(p) {
        color: #E2E2E2;
        text-align: left;
        font-weight: 300;
        margin: 0;
    }

    .card-content :global(h3) {
        font-weight: 500;
    }

    .card-content :global(span) {
        font-weight: 300;
    }
</style>

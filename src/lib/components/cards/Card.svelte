<script lang="ts" module>
	import CategoryLabel from "../labels/CategoryLabel.svelte";

    // import TagComponent from '../TagComponent.svelte';
</script>

<script lang="ts">
    let { tag = $bindable(''), href = $bindable(''), variant = $bindable(''), title = $bindable(''), description = $bindable('')} = $props();
    export { className as class }
    let hasHover = $state(false);
    let className = $state('')
</script>

<a href={href} class="card-wrapper {className} {variant}" onmouseover={() => hasHover = true} 
    onfocus={() => hasHover = true} onblur={() => hasHover = false} onmouseleave={() => hasHover = false}>
   <div class="card-container">
       <div class="card-header">
           <CategoryLabel type='test_methode' {hasHover} theme='blue' />
           <!-- bookmark component -->
       </div>
       <!-- svelte-ignore slot_element_deprecated -->
         <div class="card-content">
            {#if title}
            <h3>
                {title}
            </h3>
             {/if}

             {#if description}
            <p>
                {description}
            </p>
             {/if}
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

    .card-wrapper.normal {
        --opacity: 8%;
        max-width: 35rem;
        width: 100%;
        text-decoration: none;

        .card-container {
            display: flex;
            flex-direction: column;
            gap: 1.8rem;

            background-color: var(--white);
            backdrop-filter: var(--backdrop-filter);
            padding: 26px 32px;
            border-radius: var(--border-radius-large);


            background: rgba(252, 252, 252, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 1rem;

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

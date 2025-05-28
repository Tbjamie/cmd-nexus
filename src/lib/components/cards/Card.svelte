<script lang="ts" module>
	import CategoryLabel from "../labels/CategoryLabel.svelte";
    import TagComponent from '../tag/Tag.svelte';
    import IconButton from "../buttons/IconButton.svelte";
</script>

<script lang="ts">
    let { tag = $bindable(''), href = $bindable(''), variant = $bindable(''), title = $bindable(''), description = $bindable(''), rating = $bindable('')} = $props();
    export { className as class }
    let hasHover = $state(false);
    let className = $state('')


</script>

<a href={href} class="card-wrapper {variant}" onmouseover={() => hasHover = true} 
    onfocus={() => hasHover = true} onblur={() => hasHover = false} onmouseleave={() => hasHover = false}>
   <div class="card-container">
       <div class="card-header">
           <CategoryLabel type='test_methode' {hasHover} theme='blue' />
           <!-- bookmark component -->
            <IconButton type="button" target="_self" href="/">
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63037 0.273438C5.9709 0.273438 6.24658 0.549122 6.24658 0.889648V4.36328H9.74072C10.0812 4.36328 10.3569 4.63897 10.3569 4.97949C10.3569 5.32002 10.0812 5.5957 9.74072 5.5957H6.24658V9.11035L6.23486 9.23535C6.17725 9.51616 5.92822 9.72754 5.63037 9.72754C5.33252 9.72754 5.08349 9.51616 5.02588 9.23535L5.01416 9.11035V5.5957H1.52002L1.39502 5.58398C1.11421 5.52637 0.902832 5.27734 0.902832 4.97949C0.902832 4.68164 1.11421 4.43261 1.39502 4.375L1.52002 4.36328H5.01416V0.889648C5.01416 0.549122 5.28984 0.273437 5.63037 0.273438Z" fill="white" fill-opacity="0.8"/>
                </svg>
            </IconButton>
       </div>
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
                <TagComponent>{tag}</TagComponent>
           {/if}
           {#if rating}
               <span class="rating">{rating}</span>
           {/if}
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

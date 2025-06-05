<script lang="ts" module>
	import CategoryLabel from "../labels/CategoryLabel.svelte";
    import TagComponent from '../tag/Tag.svelte';
    import IconButton from "../buttons/IconButton.svelte";
</script>

<script lang="ts">

    let { 
        id = $bindable(''),
        tag = $bindable(''), 
        href = $bindable(''),
        variant = $bindable(''), 
        title = $bindable(''),
        description = $bindable(''),
        rating = $bindable(''),
        labelType = $bindable(''),
        labelColor = $bindable(''),
        mostRelevant = $bindable(false)
    } = $props();

    let hasHover = $state(false);


    // Check labeltype for different styles
    // theme afhankelijk van de labeltype
    $effect(() => {
        if (labelType === 'Beroepstaak') {
            labelColor = 'green';
        } else if (labelType === 'Principe') {
            labelColor = 'blue';
        } else if (labelType === 'Methode') {
            labelColor = 'yellow';
        } else {
            labelColor = 'blue'; // default
        }
    });

    // 1. get de client mouse position
    function handleMouseMove(id: string, event: MouseEvent) {
        let CurrentCardWrapper = document.querySelector(`.card-wrapper-${id}`) as HTMLElement;
        const dotElement = CurrentCardWrapper.querySelector('.dot-element') as HTMLElement
        
        // Update mouse position
        let mousePosition = {
            x: event.clientX,
            y: event.clientY
        }
    
        // function to get the bounded rectangle of the card container
        const boundedRect = getRelativePosition(CurrentCardWrapper, mousePosition, event)
    
        let relativeX = boundedRect?.relativeX
        let relativeY = boundedRect?.relativeY

        if (dotElement) {
            // Update the position of the dot element
            dotElement.style.left = `${relativeX}px`
            dotElement.style.top = `${relativeY}px`
    
            // Add a class to make it visible
            dotElement.classList.add('visible')
        }
    }
    
    // 3. Get the bounded rectangle of the card container
    function getRelativePosition(CurrentCardWrapper: HTMLElement, mousePosition: { x: number; y: number }, event: MouseEvent) {
        const cardContainer = CurrentCardWrapper

        // Check if the cardContainer exists
        if (cardContainer) {
            // get the current card container position
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    
            // Calculate relative position
            const relativeX = mousePosition.x - rect.left
            const relativeY = mousePosition.y - rect.top
    
            return { relativeX, relativeY }
        }
    }

    // 4. Cleanup on component destroy
    function removeDotElement() {
        const CurrentCardWrapper = document.querySelector(`.card-wrapper-${id}`) as HTMLElement;
        const dotElement = CurrentCardWrapper.querySelector('.dot-element') as HTMLElement
        if (dotElement) {
            dotElement.classList.remove('visible')
        }
    };

</script>

<a 
    href={href} 
    class="card-wrapper-{id} card-wrapper {variant}"
    onmouseover={() => hasHover = true}
    onfocus={() => hasHover = true}
    onmouseleave={() => { hasHover = false; removeDotElement(); }}
    onblur={() => hasHover = false}
    onmousemove={(event) => handleMouseMove(id, event)}
>
    <div class="dot-element {labelColor}"></div>
    <div class="card-container">
        <div class="card-header">
            <CategoryLabel type={labelType} {hasHover} theme={labelColor} />
            <IconButton theme="secondary" type="button" target="_self" href="" variant="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </IconButton>
        </div>
        <div class="card-content">
            {#if title}
                <h3 class="h3">
                    {title}
                </h3>
            {/if}

            {#if description}
                <p>
                    {description}
                </p>
            {/if}
        </div>
        <div class="card-footer">
            <div class="card-footer-tags-wrapper">
                {#if mostRelevant == true}
                    <TagComponent theme="secondary" >Gevonden kaart</TagComponent>
                {/if}
                {#if tag}
                    <TagComponent>{tag}</TagComponent>
                {/if}
            </div>
            {#if rating}
                <span class="rating">{rating}</span>
            {/if}
        </div>
    </div>
</a>


<style>
    .dot-element {
        --opacity: 50%;
        position: absolute;
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        opacity: 0;

        &.visible {
            opacity: 1;
            transform: translate(-50%, -50%);
            transition: opacity 500ms ease-in-out;
            animation: pulse 5s infinite ease-in-out;
            background-color: var(--current-color-card);


         &.visible.blue {
                background-color: var(--light-blue);
            }

         &.visible.green {
                background-color: var(--green);
            }

         &.visible.yellow {
                background-color: var(--yellow);
            }
        }
    }

    /* Variants van Cards */
    /* default hover staate */
    /* 1. normal */

    .card-wrapper.normal {
        --opacity: 8%;
        width: 100%;
        text-decoration: none;
        overflow: hidden;
        /* max-width: 35rem; */
        border-radius: var(--border-radius-large);
        z-index: 1;
        height: 100%;
        position: relative;
        min-height: 250px;

        transition: all 300ms ease-in-out;

        .card-container {
            backdrop-filter: blur(60px);
            transition: all 300ms ease-in-out;            
            display: flex;
            flex-direction: column;
            gap: 1.4rem;

            padding: 1.4rem 1.6rem;

            .card-header, .card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .card-content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: .75rem;
            }
        }

        .card-footer-tags-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        & > * {
            color: var(--white);
        }

        &:hover {
            transform: scale(1.02);
        }


        &.visible {
            opacity: 1;
            transition: opacity 500ms ease-in-out;
            animation: pulse 2s infinite ease-in-out;
        }
    }

    .card-wrapper.normal .card-content :global(p) {
        color: #E2E2E2;
        text-align: left;
        font-weight: 300;
        margin: 0;
        text-overflow: ellipsis;
        
        /* http://css-tricks.com/almanac/properties/l/line-clamp/ */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
        -webkit-line-clamp: 2;

    }

    .card-wrapper.normal .card-content :global(h3) {
        font-weight: 500;
    }

    .card-wrapper.normal .card-content :global(span) {
        font-weight: 300;
    }

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        transform: translate(-50%, -50%) scale(1.5);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>

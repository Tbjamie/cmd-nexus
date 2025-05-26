<script lang="ts" module>
import PrincipleIcon from '$lib/assets/icons/principle_icon.svg?component'
</script>

<script lang="ts">
export let hasHover = false;
export let theme: "green" | "blue" | "yellow" = "blue";
export let text = "";
export let variant: 'dropdown' | 'default' = "default";
</script>


<section class="{variant}">
    <div>
        <PrincipleIcon class="category-icon {hasHover ? 'active' : ''} {theme}" />
    </div>
    {#if text}
        <p>
            {text}
        </p>
    {/if}
</section>


<style>
    section{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0rem;
        text-transform: capitalize;

        & div{
        display: flex;
        justify-content: center;
        align-items: center;
         background: rgba(252, 252, 252, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        padding: .5rem;
        }
    }

    :global(.dropdown){
        & div{

         background: rgba(252, 252, 252, 0);
        }
    }

    


    :global(.category-icon){
        width: 2rem;
        height: 2rem;
        color: white; 
        transition: 300ms all;



         &.active.blue{
            color: var(--light-blue);
            }

         &.active.green{
            color: var(--green);
            }

         &.active.yellow{
            color: var(--yellow);
            }
        

        
    }
</style>
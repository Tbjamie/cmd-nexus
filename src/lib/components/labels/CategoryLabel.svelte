<script lang="ts" module>
import PrincipleIcon from '$lib/assets/icons/principle_icon.svg?component'
</script>

<script lang="ts">
export let hasHover = false;
export let theme: string;

$: theme = (() => {
  if (type === 'Beroepstaak') return 'green';
  if (type === 'Principe') return 'blue';
  if (type === 'Methode') return 'yellow';
  return 'blue';
})();

export let type = "";
</script>


<section>
    <div>
        <PrincipleIcon class="category-icon {hasHover ? 'active' : ''} {theme}" />
    </div>
    {#if type}
        <p>
            {type}
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


    :global(.category-icon){
        width: 2rem;
        height: 2rem;
        color: white; 
        transition: 300ms all;

         &.active.blue {
            --current-card-color: var(--light-blue);
            color: var(--current-card-color);
        }

         &.active.green {
            --current-card-color: var(--green);
            color: var(--current-card-color);
            }

         &.active.yellow {
            --current-card-color: var(--yellow);
            color: var(--current-card-color);
            }
    }
</style>
<!-- <script lang="ts">
  export let icon: typeof import('svelte').SvelteComponent;
  export let color: string = '#eee';
  export let name: string;
import { Book, Brain, Lightbulb, Flame } from '/lucide-svelte';
 
  const variants = {
    klassiek: {
      name: 'Klassieke Theorie',
      icon: Book,
      color: '#4B5563'
    },
    cognitief: {
      name: 'Cognitieve Theorie',
      icon: Brain,
      color: '#10B981'
    },
    innovatief: {
      name: 'Innovatieve Theorie',
      icon: Lightbulb,
      color: '#F59E0B'
    },
    motivationeel: {
      name: 'Motivationele Theorie',
      icon: Flame,
      color: '#EF4444'
    }
  };
 
    export let variant: keyof typeof variants;

  const current = variants[variant];
</script>
 
<section class="label" style="background-color: {current.color}">
<svelte:component this={current.icon} class="icon" />
<span class="name">{current.name}</span>
</section>
 
<style>
  .label {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    gap: 0.5rem;
    color: white;
  }
 
  .icon {
    width: 1rem;
    height: 1rem;
  }
</style>





 -->

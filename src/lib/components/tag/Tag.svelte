<script lang="ts">
	export let theme: '' | 'secondary' = '';
</script>

<span class="tag-wrapper {theme}">
    <slot />
</span>

<style>
    .tag-wrapper {
        padding: .4rem 1.2rem;
        border-radius: var(--border-radius-small);
        background: var(--tag-background);
    }

    .tag-wrapper.secondary {
        background: var(--white);
        color: var(--black);
    }
</style>
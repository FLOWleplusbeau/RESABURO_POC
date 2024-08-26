<script lang="ts">
    import DeskSelecor from "$lib/components/deskSelector.svelte";
    import type { Desk } from "$lib/utils/desk";

    let selectedDesk: Desk | null = null;
</script>

<div class="wrapper">
    <DeskSelecor bind:selectedDesk />
</div>
<div class="wrapper2">
    {#if selectedDesk}
        <p>The desk currently selected is in {selectedDesk.x} </p>
    {:else}
        <p>No desk selected</p>
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
        width: 50%;
        flex-shrink: 1;
    }
</style>
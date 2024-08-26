<script lang="ts">
    import DeskMap from "$lib/components/deskMap.svelte";
    import type { Desk } from "$lib/utils/desk";

    let selectedDesk: Desk | null = null;
</script>

<div class="wrapper">
    <DeskMap bind:selectedDesk />
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
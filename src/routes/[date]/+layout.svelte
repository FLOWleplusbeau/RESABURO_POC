<script lang="ts">
    import '$lib/global.css';
    import { currentDate } from "$lib/stores/sharedStore"
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let date: Date;
    let dateString: string = $page.params.date;

    $: date = new Date(dateString);
    $: currentDate.set(dateString);
    $: if (browser && date) goto(`/${dateString}`);
</script>
  
<div class="app">
    <header>
        <input type="date" bind:value={dateString}>
    </header>
    <div class="wrapper">
        <slot></slot>
    </div>
</div>

<style>
    .app {
        height: 100vh;
        background-color: var(--background-color);
    }

    .wrapper {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    header {
        display: flex;
        align-items: center;
        background-color: var(--secondary-color);
        height: 10vh;
        padding-left: 100px;
    }
</style>

  
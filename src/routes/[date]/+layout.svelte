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

    function deleteAttendances() {
        fetch('api/deleteAttendances', { method: 'DELETE' })
            .then(response => {
                if (response.ok) console.log('Attendances deleted successfully');
                else console.error('Failed to delete attendances');
            })
            .catch(error => console.error('Network error:', error));
        location.reload();
    }
</script>
  
<div class="app">
    <header>
        <input type="date" bind:value={dateString}>
        <button on:click={deleteAttendances}>delete attendance</button>
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
        justify-content: space-between;
        background-color: var(--secondary-color);
        height: 10vh;
        padding-left: 100px;
        padding-right: 100px;
    }
</style>

  
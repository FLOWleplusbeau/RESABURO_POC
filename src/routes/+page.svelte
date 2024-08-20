<script lang="ts">
    import type { PageData } from "./$types";
    import { formatDateToString } from "$lib/date"
    import { currentDate} from "$lib/stores/sharedStore"

    export let data: PageData

    $: ({ attendances } = data)
    currentDate.subscribe(value => {
        console.log(value)
    })
</script>

<div class="container">
    <form action="?/createAttendance" method="post">
        <label>
            Name
            <input name="name" type="text"/>
        </label>
        <button type="submit">Submit</button>
    </form>
</div>

<div class="container">
    <div class="attendances">
        {#each attendances as attendance}
            <div>{attendance.name} <br> {formatDateToString(attendance.date)}</div>
        {/each}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 50px;
        border-radius: 30px;
        width: 500px;
        margin: 20px;
        max-height: 50vh;
        background-color: var(--primary-color);
    }

    .attendances {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        height: 100%;
        width: 100%;
    }
</style>
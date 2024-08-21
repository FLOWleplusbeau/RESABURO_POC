<script lang="ts">
    import type { PageData } from "./$types";
    import { formatDateStringToDate, formatDateToString } from "$lib/date";
    import { currentDate } from "$lib/stores/sharedStore";

    export let data: PageData;
    let date: Date = new Date();
    let dateString: string = formatDateToString(date);

    $: ({ attendances } = data);
    currentDate.subscribe(value => {
        dateString = value;
        date = formatDateStringToDate(value);
    });
</script>

<div class="container">
    {formatDateToString(date)}
    <form action="?/createAttendance" method="post">
        <label>
            Name
            <input name="name" type="text"/>
        </label>
        <label class="invisible">
            Date
            <input name="date" type="date" value={dateString}/>
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

    .invisible {
        display: none;
    }
</style>
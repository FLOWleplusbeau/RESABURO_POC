<script lang="ts">
    import type { PageData } from "./$types";
    import { formatDateStringToDate, formatDateToString } from "$lib/utils/date";
    import { currentDate } from "$lib/stores/sharedStore";
    import AttendancesDisplay from "$lib/components/attendancesDisplay.svelte";

    export let data: PageData;
    let date: Date = new Date();
    let dateString: string = formatDateToString(date);

    $: ({ attendances } = data);
    currentDate.subscribe(value => {
        dateString = value;
        date = formatDateStringToDate(value);
    });
</script>

<div class="wrapper1">
    <form action="?/createAttendance" method="post">
        {formatDateToString(date)}
        <label>
            <input name="name" type="text" placeholder="Full Name"/>
        </label>
        <label class="invisible">
            <input name="date" type="date" value={dateString}/>
        </label>
        <label>
            <input name="attended" type="radio"> At office
        </label>
        <button type="submit">Submit</button>
    </form>
</div>

<div class="wrapper2">
    <AttendancesDisplay {attendances} />
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        border-radius: 30px;
        width: 100%;
        height: 100%;
        max-height: 50vh;
        background-color: var(--primary-color);
    }

    form button {
        padding: 10px;
        border-radius: 10px;
        background-color: var(--accent-color);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }

    form button:hover {
        background-color: var(--accent-color-hover);
        color: black;
    }

    .wrapper1 {
        height: 25vh;
        width: 500px;
        margin: 20px;
    }

    .wrapper2 {
        height: 50vh;
        width: 500px;
        margin: 20px;
    }

    .invisible {
        display: none;
    }
</style>
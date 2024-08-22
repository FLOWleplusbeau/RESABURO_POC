<script lang="ts">
    import type { PageData } from "./$types";
    import { formatDateStringToDate, formatDateToString } from "$lib/utils/date";
    import { currentDate } from "$lib/stores/sharedStore";
    import AttendancesDisplay from "$lib/components/attendancesDisplay.svelte";
    import AttendanceBooker from "$lib/components/attendanceBooker.svelte";
    import type { User, Attendance} from "@prisma/client";

    export let data: PageData;
    let date: Date = new Date();
    let dateString: string = formatDateToString(date);

    let user: User;
    let todayUserAttendance: Attendance;

    $: ({ attendances, user, todayUserAttendance} = data);

    currentDate.subscribe(value => {
        dateString = value;
        date = formatDateStringToDate(value);
    });
</script>

<div class="wrapper1">
    <AttendanceBooker {todayUserAttendance} {dateString} />
    <!-- {#if todayUserAttendance}
        <p>You already booked for today</p>
    {:else}
        <form action="?/createAttendance" method="post">
            {formatDateToString(date)}
            <label class="invisible">
                <input name="date" type="date" value={dateString}/>
            </label>
            <label>
                <input name="attended" type="radio"> At office
            </label>
            <button type="submit">Submit</button>
        </form>
    {/if} -->
</div>

<div class="wrapper2">
    <AttendancesDisplay {attendances} />
</div>

<style>

    .wrapper1 {
        height: 25vh;
        width: 500px;
    }

    .wrapper2 {
        flex-grow: 1;
        max-height: 60vh;
        width: 500px;
    }
</style>
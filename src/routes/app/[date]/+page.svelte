<script lang="ts">
  import type { PageData } from "./$types";
  import { formatDateStringToDate, formatDateToString } from "$lib/utils/date";
  import { currentDate } from "$lib/stores/sharedStore";
  import AttendancesDisplay from "$lib/components/attendancesDisplay.svelte";
  import AttendanceBooker from "$lib/components/attendanceBooker.svelte";
  import type { Attendance } from "@prisma/client";
  import DeskSelector from "$lib/components/deskSelector.svelte";
  import type { Desk } from "$lib/utils/desk";

  export let data: PageData;
  let date: Date = new Date();
  let dateString: string = formatDateToString(date);
  let selectedDesk: Desk | null = null;
  let selectingDesk: boolean = false;

  let todayUserAttendance: Attendance;

  // Destructure data
  $: ({ attendances, user, todayUserAttendance } = data);

  currentDate.subscribe((value) => {
    dateString = value;
    date = formatDateStringToDate(value);
    selectedDesk = null;
  });
</script>

<div class="wrapper1">
  <AttendanceBooker {todayUserAttendance} {dateString} {selectedDesk} bind:selectingDesk/>
</div>

<div class="wrapper2">
  <AttendancesDisplay {attendances} />
</div>

{#if selectingDesk}
  <div class="wrapper3">
    <DeskSelector bind:selectedDesk/>
    <button on:click={() => selectingDesk = false}>Select</button>
  </div>
{/if}

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

  .wrapper3 {
    position: absolute;
    height: 90vh;
    width: 100%;
    padding: 50px;
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: var(--accent-color);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    border: transparent 2px solid;
  }
</style>

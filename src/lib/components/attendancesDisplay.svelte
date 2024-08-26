<script lang="ts">
  import type { Attendance, User } from "@prisma/client";

  export let attendances: (Attendance & { user: User })[] = [];

  function deleteAttendance(attendance: Attendance) {
    fetch(`api/deleteAttendance/${attendance.id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok)
          attendances = attendances.filter((a) => a.id !== attendance.id);
        else console.error("Failed to delete attendance");
      })
      .catch((error) => console.error("Network error:", error));
  }
</script>

<div class="container">
  <h2>At office today:</h2>
  <div class="attendances">
    {#if attendances.length === 0}
      <div class="no-one">
        <p>No one is here today 😞</p>
      </div>
    {/if}
    {#each attendances as attendance}
      <div class="attendance">
        {attendance.user.name}
        <button on:click={() => deleteAttendance(attendance)}>delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
    height: 100%;
    width: 100%;
    background-color: var(--primary-color);
  }

  .attendances {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 10px 30px 20px 30px;
    box-sizing: border-box;
    overflow: scroll;
    height: 100%;
  }

  .attendance {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: var(--secondary-color);
    border-radius: 10px;
    padding: 10px;
    padding-left: 20px;
    width: 100%;
    min-height: 50px;
  }

  h2 {
    color: var(--accent-color);
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .no-one {
    display: flex;
    color: var(--accent-color);
    font-size: 3.2rem;
    text-align: center;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  .no-one p {
    margin-bottom: 15%;
  }
</style>

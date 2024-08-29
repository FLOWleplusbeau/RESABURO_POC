<script lang="ts">
  import type { Attendance } from "@prisma/client";
  import type { Desk_t } from "$lib/utils/desk";

  // export let user: User;
  export let todayUserAttendance: Attendance;
  export let dateString: string;
  export let selectedDesk: Desk_t | null = null;
  export let selectingDesk: boolean = false;

  function deleteAttendance(id: string | undefined) {
    if (!id) return;
    fetch(`/api/deleteAttendance/${id}`, {
      method: "DELETE",
    }).then((res) =>
      res.ok ? location.reload() : console.error("Failed to delete attendance")
    );
  }
</script>

<div class="container">
  {#if todayUserAttendance}
    <div class="message">
      <h2>You already booked for today</h2>
      {#if todayUserAttendance.attended}
        <p>You are at office today</p>
        <p>Desk {todayUserAttendance.deskId}</p>
      {:else}
        <p>You are not at office today</p>
      {/if}
      <button on:click={() => deleteAttendance(todayUserAttendance.id)}
        >Modify</button
      >
    </div>
  {:else}
    <form action="?/createAttendance" method="post">
      {dateString}
      <label class="invisible">
        <input name="date" type="date" value={dateString} required/>
      </label>
      <label>
        <input name="attended" type="radio" required/> At office
      </label>
      <label class="invisible">
        <input name="deskIdString" type="number" value={selectedDesk?.id} required/>
      </label>
      {#if selectedDesk}
        <p>Selected Desk: {selectedDesk.id}</p>
      {:else}
        <p>No desk selected</p>
      {/if}
      <button type="submit">Submit</button>
    </form>
    <button on:click={() => selectingDesk = true}>Select desk</button>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--primary-color);
  }

  h2 {
    color: var(--accent-color);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 5px;
    width: 100%;
    background-color: var(--primary-color);
  }

  button {
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: var(--accent-color);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    border: transparent 2px solid;
  }

  button:hover {
    background-color: var(--accent-color-hover);
    color: black;
    border: black 2px solid;
  }

  .message {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    width: 100%;
    background-color: var(--primary-color);
    margin-top: auto;
    margin-bottom: auto;
  }

  .invisible {
    display: none;
  }
</style>

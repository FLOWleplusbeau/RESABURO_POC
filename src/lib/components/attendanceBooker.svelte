<script lang="ts">
  import type { Attendance, User } from "@prisma/client";
  import type { Desk } from "$lib/utils/desk";

  // export let user: User;
  export let todayUserAttendance: Attendance;
  export let dateString: string;
  export let selectedDesk: Desk | null = null;
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
    <h2>You already booked for today</h2>
    {#if todayUserAttendance.attended}
      <p>You are at office today</p>
    {:else}
      <p>You are not at office today</p>
    {/if}
    <button on:click={() => deleteAttendance(todayUserAttendance.id)}
      >Modify</button
    >
  {:else}
    <form action="?/createAttendance" method="post">
      {dateString}
      <label class="invisible">
        <input name="date" type="date" value={dateString} />
      </label>
      <label>
        <input name="attended" type="radio" /> At office
      </label>
      {#if selectedDesk}
        <p>Selected Desk: {selectedDesk?.x}</p>
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

  .invisible {
    display: none;
  }
</style>

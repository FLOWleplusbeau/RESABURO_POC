<script lang="ts">
    import type { Attendance, User } from "@prisma/client";

    // export let user: User;
    export let todayUserAttendance: Attendance;
    export let dateString: string;
</script>

<div class="container">
    {#if todayUserAttendance}
        <h2>You already booked for today</h2>
        {#if todayUserAttendance.attended}
            <p>You are at office today</p>
        {:else}
            <p>You are not at office today</p>
        {/if}
        <button>Modify</button>
    {:else}
        <form action="?/createAttendance" method="post">
            {dateString}
            <label class="invisible">
                <input name="date" type="date" value={dateString}/>
            </label>
            <label>
                <input name="attended" type="radio"> At office
            </label>
            <button type="submit">Submit</button>
        </form>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 30px;
        width: 100%;
        height: 100%;
        max-height: 50vh;
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
        height: 100%;
        background-color: var(--primary-color);
    }

    button {
        margin-top: 20px;
        padding: 10px;
        border-radius: 10px;
        background-color: var(--accent-color);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--accent-color-hover);
        color: black;
    }

    
    .invisible {
        display: none;
    }
</style>
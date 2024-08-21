<script lang="ts">
    import { formatDateToString } from '$lib/utils/date';
    export let attendances: any[] = [];

    function deleteAttendance(attendance: any) {
        fetch(`api/deleteAttendance/${attendance.id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) attendances = attendances.filter(a => a.id !== attendance.id);
                else console.error('Failed to delete attendance');
            })
            .catch(error => console.error('Network error:', error));
    }
</script>

<div class="container">
    {#each attendances as attendance}
        <div class="attendance">
            {attendance.name}
            <button on:click={() => deleteAttendance(attendance)}>delete</button>
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        border-radius: 20px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        background-color: var(--primary-color);
    }

    .attendance {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        background-color: var(--secondary-color);
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 10px;
        padding-left: 20px;
        width: 100%;
        min-height: 50px;
    }
</style>
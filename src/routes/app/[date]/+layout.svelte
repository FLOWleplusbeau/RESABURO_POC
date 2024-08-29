<script lang="ts">
  import { currentDate } from "$lib/stores/sharedStore";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let dateString: string = $page.params.date;

  $: currentDate.set(dateString);
  $: if (browser && dateString) goto(`/app/${dateString}`);

  function logOut() {
    fetch("/api/logout", { method: "DELETE" })
      .then((response) => {
        if (response.ok) goto("/app/user/login");
        else console.error("Failed to log out");
      })
      .catch((error) => console.error("Network error:", error));
  }

  function registerNewAccout() {
    fetch("/api/logout", { method: "DELETE" })
      .then((response) => {
        if (response.ok) goto("/app/user/register");
        else console.error("Failed to log out");
      })
      .catch((error) => console.error("Network error:", error));
  }
</script>

<div class="app">
  <header>
    <!-- temporary buttons -->
    <button on:click={logOut}>Log out</button>
    <input type="date" bind:value={dateString} />
    <button on:click={registerNewAccout}>Register New Account</button>
  </header>
  <div class="wrapper">
    <slot></slot>
  </div>
</div>

<style>
  .app {
    width: 100%;
    height: 100vh;
    background-color: var(--background-color);
  }

  .wrapper {
    height: 90vh;
    width: 100%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--secondary-color);
    height: 10vh;
    padding-left: 100px;
    padding-right: 100px;
  }

  button {
    background-color: var(--primary-color);
    color: var(--accent-color);
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
  }
</style>

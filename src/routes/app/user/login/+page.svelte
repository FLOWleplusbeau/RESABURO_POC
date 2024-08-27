<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { goto } from "$app/navigation";

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch("?/login", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      await invalidate("/app"); // Invalidate the root page to refresh data
      goto("/app"); // Redirect to the home page
    } else {
      const result = await response.json();
      console.error(result.error);
    }
  }
</script>

<form class="main-form" on:submit={handleSubmit}>
  <label>
    <input name="email" type="email" required placeholder="your@email.com" />
  </label>
  <label>
    <input name="password" type="password" required placeholder="Password" />
  </label>
  <button type="submit">Login</button>
  <p>No account ? <a href="/app/user/register">Register</a> </p>
</form>

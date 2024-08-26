<script lang="ts">
  import { goto } from "$app/navigation";

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch("?/register", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      goto("/app"); // Redirect to the success page
    } else {
      const result = await response.json();
      console.error(result.error);
    }
  }
</script>

<form class="main-form" on:submit={handleSubmit}>
  <label>
    <input name="name" type="text" required placeholder="Your Name" />
  </label>
  <label>
    <input name="email" type="email" required placeholder="your@email.com" />
  </label>
  <label>
    <input name="password" type="password" required placeholder="Password" />
  </label>
  <button type="submit">Register</button>
</form>

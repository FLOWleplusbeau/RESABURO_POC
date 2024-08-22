<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { goto } from '$app/navigation';
  
    async function handleSubmit(event: any) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
  
      const response = await fetch('?/login', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        await invalidate('/'); // Invalidate the root page to refresh data
        goto('/'); // Redirect to the home page
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    }
  </script>
  
  <form on:submit={handleSubmit}>
    <label>
      Email:
      <input name="email" type="email" required />
    </label>
    <label>
      Password:
      <input name="password" type="password" required />
    </label>
    <button type="submit">Login</button>
  </form>
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  </style>
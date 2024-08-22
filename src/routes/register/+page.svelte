<script lang="ts">
    import { goto } from '$app/navigation';
  
    async function handleSubmit(event: any) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
  
      const response = await fetch('?/register', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        goto('/'); // Redirect to the success page
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    }
  </script>
  
  <form on:submit={handleSubmit}>
      <label>
          Name:
          <input name="name" type="text" required />
      </label>
      <label>
          Email:
          <input name="email" type="email" required />
      </label>
      <label>
          Password:
          <input name="password" type="password" required />
      </label>
      <button type="submit">Register</button>
  </form>
  
  <style>
      form {
          display: flex;
          flex-direction: column;
          gap: 10px;
      }
  </style>
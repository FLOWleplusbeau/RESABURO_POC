<script>
  import { onMount } from "svelte";
  import { formatDateToString } from "$lib/utils/date";
  import { goto } from "$app/navigation";

  onMount(() => {
    let date = formatDateToString(new Date());

    goto(`/app/${date}`);
  });
</script>

<p>Redirecting</p>

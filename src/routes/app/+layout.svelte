<script>
  import "$lib/styles/global.css";
</script>

<div class="wrapper">
  <slot></slot>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>

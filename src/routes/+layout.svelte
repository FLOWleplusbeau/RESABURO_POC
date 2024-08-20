<script>
    import '$lib/global.css';
</script>
  
<div class="app">
    <slot></slot>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: var(--background-color);
    }
</style>

  
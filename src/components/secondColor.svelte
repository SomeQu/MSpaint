<script lang="ts">
  import { getContext } from "svelte";
  const fillColorValue = getContext("fillColorValue");


</script>
<div class="main-color" style="background-color: {$fillColorValue}"></div>
<style lang="scss">
    .main-color {
        width: 30px;
        height: 30px;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
</style>
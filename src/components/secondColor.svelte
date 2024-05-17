<script lang="ts">
  import { getContext } from "svelte";
  import { getFillColor } from "../tools/tools";
  const fillColorValue = getContext("fillColorValue");
  export let context

</script>
<div class="main-color">  <input on:change={(e)=>{getFillColor(e,$fillColorValue,context)}} value={$fillColorValue} type="color" name="" id=""></div>
<style lang="scss">
    .main-color {
      input{

        width: 30px;
        height: 30px;
      }
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
       
    }
</style>
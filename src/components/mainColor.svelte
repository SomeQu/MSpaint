<script lang="ts">
  import { getContext } from "svelte";
  import { getColor } from "../tools/tools";

 const colorValue=getContext("colorValue")
    export let context
</script>
<div class="main-color" ><input on:change={(e)=>{getColor(e,$colorValue,context)}} value={$colorValue} type="color" name="" id=""></div>
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
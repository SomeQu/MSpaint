<script lang="ts">
    import { getContext } from "svelte";

    const colors = [
        '#000000', '#400040', '#800080', '#ff00ff', '#ff80ff', '#800040', '#ff0080', '#ff80c0', '#400000',
        '#800000', '#ff0000', '#804040', '#ff8080', '#804000', '#ff8000', '#ff8040', '#808000',
        '#ffff00', '#ffff80', '#80ff00', '#004000', '#008000', '#00ff00', '#80ff80', '#008040',
        '#00ff40', '#00ff80', '#004040', '#408080', '#00ffff', '#80ffff', '#004080', '#0080c0',
        '#0080ff', '#000040', '#000080', '#0000a0', '#0000ff',  '#808040', '#808080',
        '#8080c0', '#8080ff', '#c0c0c0','#c1c1c1', '#ffffff'
    ];

    let colorValue = getContext("colorValue");
    let fillColorValue = getContext("fillColorValue");

    const chooseColor = (e: any) => {
        $colorValue=e.target.id
    }

    const chooseSecondColor = (e: any) => {
        $fillColorValue=e.target.id
        e.preventDefault();
    }
</script>

<div class="container">
    {#each colors as color}
        <button on:contextmenu={chooseSecondColor} on:click={chooseColor} id={color} style="color: {color}; background-color: {color}" class="color"></button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        max-width: 300px;
    }

    .color {
        width: 20px;
        height: 20px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
</style>
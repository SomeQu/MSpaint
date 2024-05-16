<script lang="ts">
    import { onMount } from "svelte";
  
    let canvas: HTMLCanvasElement;
    let crc2d: CanvasRenderingContext2D | null; 
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let colorValue='#000000'
    let penStye = 'Pencil'
    let line = 1;

    const onMouseDown = (e: MouseEvent) => {
        isDrawing = true;
        x = e.clientX;
        y = e.clientY;
        if (penStye === 'Line') {
            crc2d?.beginPath();
            crc2d?.moveTo(x, y);
        }
    }

    const onMouseUp = (e: MouseEvent) => {
        isDrawing = false;
        if (penStye === 'Line') {
            crc2d?.lineTo(e.clientX, e.clientY);
            crc2d?.stroke();
            crc2d?.closePath();
        }
    }
  
    const onMouseMove = (e: MouseEvent) => {
        if (!isDrawing) return;
        if (penStye === 'Pencil') {
            crc2d?.beginPath();
            crc2d?.moveTo(x, y);
            crc2d?.lineTo(e.clientX, e.clientY);
            crc2d?.stroke();
            x = e.clientX;
            y = e.clientY;
        } else if (penStye === 'Line') {
       
            // drawLine(x, e.clientX, y, e.clientY);
        }
    }

    onMount(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        crc2d = canvas.getContext('2d');
        if (crc2d !== null) {
            crc2d.strokeStyle = colorValue;
            crc2d.lineWidth = line;
        }
    });

    const getColor = (e: any) => {
        colorValue = e.target.value;
        if (crc2d !== null) {
            crc2d.strokeStyle = colorValue;
        }
    }

    const getLineWidth = (e: any) => {
        line = e.target.value;
        if (crc2d !== null) {
            crc2d.lineWidth = line;
        }
    }

    const changePen = (e: any) => {
        penStye = e.target.innerText;
    }

    // const drawLine = (x1: number, x2: number, y1: number, y2: number) => {
    //     if (crc2d !== null) {
    //         clearPainting(crc2d);
    //         crc2d.beginPath();
    //         crc2d.moveTo(x1, y1);
    //         crc2d.lineTo(x2, y2);
    //         crc2d.stroke();
    //     }
    // }

    const clearPainting = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
</script>

<div class="container">
    <div class="wrapper">
        <canvas id="canvas" 
                width="700"
                height="500" 
                bind:this={canvas} 
                style="border:1px solid red"
                on:mousedown={onMouseDown} 
                on:mouseup={onMouseUp} 
                on:mousemove={onMouseMove} 
        />
        <input on:change={getColor} type="color">
        <input on:change={getLineWidth} type="range" value="1" step="1" min="1" max="10" name="" id="">
        <button on:click={changePen}>Pencil</button>
        <button on:click={changePen}>Line</button>
    </div>
</div>

<style lang="scss">
    canvas{
        cursor: crosshair;
    }
</style>

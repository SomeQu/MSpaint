<script lang="ts">
    import { onMount } from "svelte";
    import drawTriangle from './tools/drawTriangle'
    import drawCircle from './tools/drawCircle'
    import drawSquare from './tools/drawSquare'
    let canvas: HTMLCanvasElement;
    let crc2d: CanvasRenderingContext2D | null; 
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let colorValue='#000000'
    let fillColorValue= '#ffffff'
    let penStyle = 'Pencil';
    let line = 1;
    let circleCenterX:any
    let circleCenterY:any
    const onMouseDown = (e: MouseEvent) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    if (penStyle === 'Line') {
        crc2d?.beginPath();
        crc2d?.moveTo(x, y);
    } else if (penStyle === 'Square') {
        
    } else if (penStyle === 'Circle') {
        circleCenterX = x;
        circleCenterY = y;
    }
}

const onMouseUp = (e: MouseEvent) => {
    isDrawing = false;
    const canvasX = e.offsetX;
    const canvasY = e.offsetY;
    if (penStyle === 'Line') {
        crc2d?.lineTo(canvasX, canvasY);
        crc2d?.stroke();
        crc2d?.closePath();
    } else if (penStyle === 'Square') {
        drawSquare(crc2d,x, y, canvasX, canvasY);
    } else if (penStyle === 'Circle') {
        const radius = Math.sqrt(Math.pow(x - circleCenterX, 2) + Math.pow(y - circleCenterY, 2));
        drawCircle(crc2d,circleCenterX, circleCenterY, radius);
    }else if (penStyle==='Triangle'){
        drawTriangle(crc2d,x,y,canvasX,canvasY)
    }
}
  
const onMouseMove = (e: MouseEvent) => {
    if (!isDrawing) return;
    if (penStyle === 'Pencil') {
        crc2d?.beginPath();
        crc2d?.moveTo(x, y);
        x = e.offsetX;
        y = e.offsetY;
        crc2d?.lineTo(x, y);
        crc2d?.stroke();
    } else if (penStyle === 'Line') {
        
    } else if (penStyle === 'Square') {
      
    }
}

    onMount(() => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        crc2d = canvas.getContext('2d');
        if (crc2d !== null) {
            crc2d.strokeStyle = colorValue;
            crc2d.fillStyle = fillColorValue;
            crc2d.lineWidth = line;
        }
    });

    const getColor = (e: any) => {
        colorValue = e.target.value;
        if (crc2d !== null) {
            crc2d.strokeStyle = colorValue;
        }
    }
    const getFillColor = (e: any) => {
        fillColorValue = e.target.value;
        if (crc2d !== null) {
            crc2d.fillStyle = fillColorValue;
        }
    }
    const getLineWidth = (e: any) => {
        line = e.target.value;
        if (crc2d !== null) {
            crc2d.lineWidth = line;
        }
    }

    const changePen = (e: any) => {
        penStyle = e.target.innerText;
    }

    const clearPainting = () => {
        if (crc2d !== null) {
            crc2d.clearRect(0, 0, canvas.width, canvas.height);
        }
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
        <input on:change={getColor} value="#000000" type="color">
        <input on:change={getFillColor} value="#ffffff" type="color">
        <input on:change={getLineWidth} type="range" value="1" step="1" min="1" max="10" name="" id="1">
        <button on:click={changePen}>Pencil</button>
        <button on:click={changePen}>Line</button>
        <button on:click={changePen}>Square</button>
        <button on:click={changePen}>Cirlce</button>
        <button on:click={changePen}>Triangle</button>
        <button on:click={clearPainting}>Clear</button>
    </div>
</div>

<style lang="scss">
    canvas {
        cursor: crosshair;
    }
</style>

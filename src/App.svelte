<script lang="ts">
    import { afterUpdate, onMount, setContext } from "svelte";
    import drawTriangle from './tools/drawTriangle'
    import drawCircle from './tools/drawCircle'
    import drawSquare from './tools/drawSquare'
  import Colors from "./components/Colors.svelte";
  import MainColor from "./components/mainColor.svelte";
  import SecondColor from "./components/secondColor.svelte";
  import { writable, type Writable } from "svelte/store";
    let canvas: HTMLCanvasElement;
    let crc2d: CanvasRenderingContext2D | null; 
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let colorValue:Writable<string | CanvasGradient | CanvasPattern>=writable('#000000')
    let fillColorValue= writable('#ffffff')
    setContext("colorValue",colorValue)
    setContext("fillColorValue",fillColorValue)
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
        // drawCircle(crc2d,circleCenterX, circleCenterY, radius);
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
            crc2d.strokeStyle = $colorValue;
            crc2d.fillStyle = $fillColorValue;
            crc2d.lineWidth = line;
        }
    });
    $:console.log('$colorValue :>> ', $colorValue);
    const getColor = (e: any) => {
        $colorValue = e.target.value;
        if (crc2d !== null) {
            crc2d.strokeStyle = $colorValue;
        }
    }
    const getFillColor = (e: any) => {
        $fillColorValue = e.target.value;
        if (crc2d !== null) {
          
        }
    }
    const getLineWidth = (e: any) => {
        line = e.target.value;
        if (crc2d !== null) {
            crc2d.lineWidth = line;
        }
    }
    afterUpdate(()=>{
        crc2d!.strokeStyle=$colorValue
        crc2d!.fillStyle = $fillColorValue;
    })
    const changePen = (e: any) => {
        penStyle = e.target.innerText;
    }

    const clearPainting = () => {
        if (crc2d !== null) {
            crc2d.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
const onRClick = (e) =>{
  
    e.preventDefault()
}
const saveImage = () =>{
   
    let canvasImage = canvas.toDataURL('image/png');
    

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload =  () =>{
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'image_name.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      xhr.open('GET', canvasImage);
      xhr.send();
}

const beforeUnloadHandler = (e) => {
    if(e){
        e.returnValue = 'Sure?';
    }
  e.preventDefault();

  e.returnValue = true;
};
function isCanvasBlank(canvas) {
  return !canvas?.getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height).data
    .some((channel:any) => channel !== 0);
}
$:if(isCanvasBlank(canvas)){
    window.addEventListener("beforeunload", beforeUnloadHandler);

}else{
    window.removeEventListener("beforeunload", beforeUnloadHandler);
}
</script>

<div class="container">
    <div class="wrapper">
        <canvas id="canvas" 
                width="700"
                height="500" 
                bind:this={canvas} 
                style="border:1px solid black;background-color:white"

                on:contextmenu={onRClick}
                on:mousedown={onMouseDown} 
                on:mouseup={onMouseUp} 
                on:mousemove={onMouseMove} 
        />
        <div class="main">

            <MainColor/>
            <input on:change={getColor} value={$colorValue} type="color" name="" id="">
        </div>
        <div class="main">

            <SecondColor/>
            <input on:change={getFillColor}  value={$fillColorValue} type="color" name="" id="">
        </div>
        <Colors/>
        <input on:change={getLineWidth}  type="range" value="1" step="1" min="1" max="10" name="" id="1">
        <button on:click={changePen}>Pencil</button>
        <button on:click={changePen}>Line</button>
        <button on:click={changePen}>Square</button>
        <button on:click={changePen}>Cirlce</button>
        <button on:click={changePen}>Triangle</button>
        <button on:click={clearPainting}>Clear</button>
        <button on:click={saveImage}>Save</button>
    </div>
</div>

<style lang="scss">
    canvas {
        cursor: crosshair;
    }
    .main{
        display: flex;
        align-items: center;
    }
</style>

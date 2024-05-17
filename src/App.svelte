<script lang="ts">
    /**
     * Svelte
    */
    import { afterUpdate, onMount, setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";
    
    /**
     * Tools
    */
    import drawTriangle from './tools/drawTriangle'
    import drawCircle from './tools/drawCircle'
    import drawSquare from './tools/drawSquare'
    import drawLine from './tools/drawLine'
    /**
     * Colors
    */
    import Colors from "./components/Colors.svelte";
    import MainColor from "./components/mainColor.svelte";
    import SecondColor from "./components/secondColor.svelte";
   
   /**
    * Utils
   */
    import saveImage from "./utils/saveImage";
    import {  clearPainting, getColor, getFillColor, getLineWidth } from "./tools/tools";

    /**
     * Variables
     */
    const tools = ['Pencil','Line','Square','Circle','Triangle','Eraser']
    let canvas: HTMLCanvasElement;
    let crc2d: CanvasRenderingContext2D | null; 
    let isDrawing = false;
    let x = 0;
    let y = 0;
    let startX:number
    let startY :number
    let line = 1;
    let saveCanvas:string
    let active:string
    let penStyle = 'Pencil';

    /**
     * Context
     */
    let colorValue:Writable<string | CanvasGradient | CanvasPattern>=writable('#000000')
    let fillColorValue:Writable<string | CanvasGradient | CanvasPattern>= writable('#ffffff')
    setContext("colorValue",colorValue)
    setContext("fillColorValue",fillColorValue)
    


    const onMouseDown = (e: MouseEvent) => {
        const ev = e.target as HTMLTextAreaElement
          saveCanvas = canvas.toDataURL()
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    startX = e.pageX - ev.offsetLeft;
     startY = e.pageY - ev.offsetTop;
 
}

const onMouseUp = (e: MouseEvent) => {
    isDrawing = false;
   
      saveCanvas = canvas.toDataURL();
    
}

const onMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLTextAreaElement
    let currentX = e.pageX - target.offsetLeft;
            let currentY = e.pageY - target.offsetTop;
            const canvasX = e.offsetX;
    const canvasY = e.offsetY;
            const width = currentX - startX;
            const height = currentY - startY;
            const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    if (!isDrawing) return;
    if (penStyle === 'Pencil') {
        crc2d?.beginPath();
        crc2d?.moveTo(x, y);
        x = e.offsetX;
        y = e.offsetY;
        crc2d?.lineTo(x, y);
        crc2d?.stroke();

    } else if (penStyle === 'Square') {
           
            drawSquare(crc2d,startX,startY,width,height,canvas,saveCanvas)
    }else if(penStyle==='Circle'){
            drawCircle(crc2d,startX,startY,radius,canvas,saveCanvas)
    }else if (penStyle==='Triangle'){
        drawTriangle(crc2d,canvasX,canvasY,x,y,canvas,saveCanvas)
    }else if (penStyle==='Eraser'){
        crc2d?.beginPath();
        crc2d!.strokeStyle = '#ffffff';
        crc2d!.lineWidth = 5;
        crc2d?.moveTo(x, y);
        x = e.offsetX;
        y = e.offsetY;
        crc2d?.lineTo(x, y);
        crc2d?.stroke();
    }else if (penStyle==='Line'){
        drawLine(e,crc2d,x,y,canvas,saveCanvas)
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

   

    afterUpdate(()=>{
        crc2d!.strokeStyle=$colorValue
        crc2d!.fillStyle = $fillColorValue;
    })

const onRClick = (e:MouseEvent) =>{

    e.preventDefault()
}

export const changePen = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  for(const item of tools){

        penStyle = target.innerText;
    
  }
  active = penStyle
};
const beforeUnloadHandler = (e:BeforeUnloadEvent) => {

    if(e){
        e.returnValue = 'Sure?';
    }
  e.preventDefault();

  e.returnValue = true;
};
function isCanvasBlank(canvas:HTMLCanvasElement) {
  return !canvas?.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data
    .some((channel) => channel !== 0);
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
        <div class="all">

            <div class="colors">
                <div class="mains">
                    
                    <div class="main">
                        
                        <MainColor/>
                        <input on:change={(e)=>{getColor(e,$colorValue,crc2d)}} value={$colorValue} type="color" name="" id="">
                    </div>
                    <div class="main">
                        
                        <SecondColor/>
                        <input on:change={(e)=>{getFillColor(e,$fillColorValue,crc2d)}}  value={$fillColorValue} type="color" name="" id="">
                    </div>
                </div>
                <Colors/>   
                <div class="helpButtons">
                    <button on:click={(e)=>clearPainting(crc2d,canvas)}>Clear</button>
                    <button on:click={()=>saveImage(canvas)}>Save</button>
                </div>
            </div>
            <input class="inp" on:change={(e)=>getLineWidth(e,line,crc2d)}  type="range" value="1" step="1" min="1" max="10" name="" id="1">
            <div class="tools">
                
                {#each tools as tool }
                <button class:active={tool===active} on:click={changePen}>{tool}</button>
                
                {/each}
            </div>
            
        </div>
    </div>
</div>

<style lang="scss">
    .container{
        display: flex;
        justify-content: center;

        .wrapper{
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: center;
            margin-top: 150px;
        }
    }
    canvas {
        cursor: crosshair;
    }
    .main{
        display: flex;
        align-items: center;
    }
    .active {
        opacity:0.5;
    }
.colors{
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: space-between;
    padding: 20px;
    .mains{
        display: flex;
        flex-direction: column;
       
    }
    .helpButtons{
        margin-left: 50px;
    }
}
    .all{
        border: 1px solid black;
        width: 100%;
        background-color: rgb(216, 216, 216);
    }
    .tools{
        margin: 10px;
    }
    .inp{
        margin-left: 10px;
    }
</style>

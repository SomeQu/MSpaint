const drawTriangle = (
  context: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  endX: number,
  endY: number,
  canvas: HTMLCanvasElement,
  saveCanvas: string
) => {
  const img: HTMLImageElement = new Image();
  img.src = saveCanvas;
  img.onload = () => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    context?.beginPath();
    context?.moveTo(x, y);
    context?.lineTo(endX, y);
    context?.lineTo((x + endX) / 2, endY);
    context?.closePath();
    context?.fill();
    context?.stroke();
  };
};
export default drawTriangle;

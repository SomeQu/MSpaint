const drawLine = (
  e: MouseEvent,
  context: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
  saveCanvas: string
) => {
  const img = new Image();
  img.src = saveCanvas;
  img.onload = () => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    context?.beginPath();
    context?.moveTo(x, y);

    x = e.offsetX;
    y = e.offsetY;
    context?.lineTo(x, y);
    context?.stroke();
  };
};
export default drawLine;

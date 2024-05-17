const drawSquare = (
  context: CanvasRenderingContext2D | null,
  startX: number,
  startY: number,
  width: number,
  height: number,
  canvas: HTMLCanvasElement,
  saveCanvas: string
) => {
  const img = new Image();
  img.src = saveCanvas;
  img.onload = () => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    context?.beginPath();
    context?.rect(startX, startY, width, height);
    context?.fill();
    context?.stroke();
  };
  context?.beginPath();
  context?.rect(startX, startY, width, height);
  context?.fill();
  context?.stroke();
};
export default drawSquare;

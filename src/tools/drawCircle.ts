const drawCircle = (
  context: CanvasRenderingContext2D | null,
  centerX: number,
  centerY: number,
  radius: number,
  canvas: HTMLCanvasElement,
  saveCanvas: string
) => {
  const img = new Image();
  img.src = saveCanvas;
  img.onload = () => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    context?.beginPath();
    context?.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context?.stroke();
    context?.fill();
  };
};
export default drawCircle;

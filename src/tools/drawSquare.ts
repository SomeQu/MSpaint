const drawSquare = (
  context: CanvasRenderingContext2D | null,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const width = endX - startX;
  const height = endY - startY;
  context?.beginPath();
  context?.rect(startX, startY, width, height);
  context?.fill();
  context?.stroke();
};
export default drawSquare;

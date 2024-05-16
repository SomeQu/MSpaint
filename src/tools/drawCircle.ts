const drawCircle = (
  context: CanvasRenderingContext2D | null,
  centerX: number,
  centerY: number,
  radius: number
) => {
  context?.beginPath();
  context?.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context?.stroke();
  context?.fill();
};
export default drawCircle;

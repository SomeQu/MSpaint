const drawTriangle = (
  context: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  endX: number,
  endY: number
) => {
  context?.beginPath();
  context?.moveTo(x, y);
  context?.lineTo(endX, y);
  context?.lineTo((x + endX) / 2, endY);
  context?.closePath();
  context?.stroke();
  context?.fill();
};
export default drawTriangle;

export const getColor = (
  e: Event,
  colorValue: string | CanvasGradient | CanvasPattern,
  context: CanvasRenderingContext2D | null
) => {
  const target = e.target as HTMLInputElement;
  colorValue = target.value;
  if (context !== null) {
    context.strokeStyle = colorValue;
  }
};
export const getFillColor = (
  e: Event,
  fillColorValue: string | CanvasGradient | CanvasPattern,
  context: CanvasRenderingContext2D | null
) => {
  const target = e.target as HTMLInputElement;
  fillColorValue = target.value;
  if (context !== null) {
    context!.fillStyle = fillColorValue;
  }
};
export const getLineWidth = (
  e: Event,
  line: number,
  context: CanvasRenderingContext2D | null
) => {
  const target = e.target as HTMLInputElement;
  line = +target.value;

  if (context !== null) {
    context.lineWidth = line;
  }
};

export const clearPainting = (
  convext: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement
) => {
  if (convext !== null) {
    convext.clearRect(0, 0, canvas.width, canvas.height);
  }
};

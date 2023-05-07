
export const rectangle = (context, shape) => {
  const width = shape.endX - shape.startX;
  const height = shape.endY - shape.startY;
  context.beginPath();
  context.strokeStyle = shape.color;
  context.fillStyle = shape.color;
  context.rect(shape.startX, shape.startY, width, height);
  context.stroke();
  context.fill();
};

export const line = (context, shape) => {
  context.beginPath();
  context.strokeStyle = shape.color;
  context.moveTo(shape.startX, shape.startY);
  context.lineTo(shape.endX, shape.endY);
  context.stroke();
};

export const circle = (context, shape ) => {
  context.beginPath();
  context.strokeStyle = shape.color;
  context.fillStyle = shape.color;
  const radius = Math.sqrt(Math.pow((shape.endX - shape.startX), 2) + Math.pow((shape.endY - shape.startY), 2))
  context.arc(shape.startX, shape.startY, radius, 0, 2*Math.PI)
  context.stroke();
  context.fill();
};

export const triangle = (context, shape) => {
  context.beginPath();
  context.strokeStyle = shape.color;
  context.fillStyle = shape.color;
  context.moveTo(shape.startX, shape.startY);
  context.lineTo(shape.endX, shape.endY);
  context.lineTo(shape.startX * 2 - shape.endX, shape.endY);
  context.closePath();
  context.stroke();
  context.fill();
};

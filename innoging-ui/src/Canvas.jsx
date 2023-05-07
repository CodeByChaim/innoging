import React, { useRef, useEffect, useState } from 'react';

import { line, rectangle, triangle, circle } from './shapes/Shapes';

const Canvas = (props) => {

  const { shapes, setShapes, shape, color } = props

  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 3;
    context.lineCap = "round";
    shapes.forEach( (shape) => {
      switch (shape.type) {
        case 'line':
          line(context, shape);
          break;
        case 'rectangle':
          rectangle(context, shape);
          break;
        case 'triangle':
          triangle(context, shape);
          break;
        case 'circle':
          circle(context, shape );
          break;
        default:
      }
    });
  }, [shapes]);

  const startPaint = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const newShape = { type: shape, color: color, startX: x, startY: y, endX: x, endY: y };
    setShapes([...shapes, newShape]);
    setIsPainting(true);
  };

  const paint = (event) => {
    if (!isPainting) {
      return;
    }
    if (shapes.length > 0) {
      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;
      const newShapes = [...shapes];
      const currentShape = newShapes[newShapes.length - 1];
      currentShape.endX = x;
      currentShape.endY = y;
      setShapes(newShapes);
    }
  };

  const endPaint = () => {
    setIsPainting(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={1910}
      height={850}
      style={{ flex: 1, border: '2px dashed #fff' }}
      onMouseDown={startPaint}
      onMouseMove={paint}
      onMouseUp={endPaint}
    />
  );
};

export default Canvas;

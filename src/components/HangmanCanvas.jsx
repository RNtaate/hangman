import { useState, useRef, useEffect } from 'react';

function HangmanCanvas() {
  const [count, setCount] = useState(0);

  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    console.log(wrapperRef.current.getBoundingClientRect().width);
    canvas.width = wrapperRef.current?.getBoundingClientRect().width;
    canvas.height = wrapperRef.current?.getBoundingClientRect().width;
    // canvas.height = innerHeight * 0.5;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleDrawingStick = (canvas) => {
    let lineCoords = [
      {
        mt: { x: canvas.width * 0.05, y: canvas.height * 0.9 },
        lt: { x: canvas.width * 0.5, y: canvas.height * 0.9 },
      },
      {
        mt: { x: canvas.width * 0.2, y: canvas.height * 0.9 },
        lt: { x: canvas.width * 0.2, y: canvas.height * 0.2 },
      },
      {
        mt: { x: canvas.width * 0.2, y: canvas.height * 0.2 },
        lt: { x: canvas.width * 0.6, y: canvas.height * 0.2 },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.2 },
        lt: { x: canvas.width * 0.6, y: canvas.height * 0.3 },
      },
      {
        arc: true,
        circle: {
          x: canvas.width * 0.6,
          y: canvas.height * 0.32,
          r: canvas.height * 0.02,
        },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.34 },
        lt: { x: canvas.width * 0.6, y: canvas.height * 0.44 },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.38 },
        lt: { x: canvas.width * 0.55, y: canvas.height * 0.4 },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.38 },
        lt: { x: canvas.width * 0.65, y: canvas.height * 0.4 },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.44 },
        lt: { x: canvas.width * 0.55, y: canvas.height * 0.48 },
      },
      {
        mt: { x: canvas.width * 0.6, y: canvas.height * 0.44 },
        lt: { x: canvas.width * 0.65, y: canvas.height * 0.48 },
      },
    ];

    let ctx = canvas.getContext('2d');

    if (lineCoords[count].arc) {
      //drawCircle
      ctx.beginPath();
      ctx.arc(
        lineCoords[count].circle.x,
        lineCoords[count].circle.y,
        lineCoords[count].circle.r,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = count > 3 ? 'red' : 'black';
      ctx.stroke();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.moveTo(lineCoords[count].mt.x, lineCoords[count].mt.y);
      ctx.lineTo(lineCoords[count].lt.x, lineCoords[count].lt.y);
      ctx.strokeStyle = count > 3 ? 'red' : 'black';
      ctx.stroke();
      ctx.closePath();
    }
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (canvasRef.current != null) {
      handleCanvas(canvasRef.current);
    }
  }, []);

  return (
    <div className="p-4 w-full">
      <div ref={wrapperRef} className="w-full">
        <canvas ref={canvasRef} className="rounded-md shadow-md"></canvas>
        <button
          onClick={() => {
            handleDrawingStick(canvasRef.current);
          }}
        >
          Draw Stick
        </button>
      </div>
    </div>
  );
}

export default HangmanCanvas;

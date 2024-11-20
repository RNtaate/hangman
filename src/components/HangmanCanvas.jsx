import { useState, useRef, useEffect } from 'react';
import { getContextValues } from '../context/GameContextProvider';
import drawOnCanvas from '../helpers/drawingOnCanvasHelpers';

function HangmanCanvas() {
  const { wrongGuessCount, setWrongGuessCount, canvasRef } = getContextValues();
  const wrapperRef = useRef(null);

  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    console.log(wrapperRef.current.getBoundingClientRect().width);
    canvas.width = wrapperRef.current?.getBoundingClientRect().width;
    canvas.height = innerHeight * 0.4;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      </div>
    </div>
  );
}

export default HangmanCanvas;

import { useRef, useEffect } from 'react';
import { getContextValues } from '../context/GameContextProvider';

function HangmanCanvas() {
  const { canvasRef, canvasReset, setCanvasReset } = getContextValues();
  const wrapperRef = useRef(null);

  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.width = wrapperRef.current?.getBoundingClientRect().width;
    canvas.height = innerHeight * 0.4;
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (canvasRef.current != null && canvasReset) {
      handleCanvas(canvasRef.current);
      setCanvasReset(false);
    }
  }, [canvasReset, setCanvasReset]);

  return (
    <div className="p-4 w-full">
      <div ref={wrapperRef} className="w-full">
        <canvas ref={canvasRef} className="rounded-md shadow-md"></canvas>
      </div>
    </div>
  );
}

export default HangmanCanvas;

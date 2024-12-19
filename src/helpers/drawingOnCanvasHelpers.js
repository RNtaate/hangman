const drawOnCanvas = (canvas, count) => {
  let lineCoords = [
    {
      mt: { x: canvas.width * 0.15, y: canvas.height * 0.9 },
      lt: { x: canvas.width * 0.6, y: canvas.height * 0.9 },
    },
    {
      mt: { x: canvas.width * 0.3, y: canvas.height * 0.9 },
      lt: { x: canvas.width * 0.3, y: canvas.height * 0.2 },
    },
    {
      mt: { x: canvas.width * 0.3, y: canvas.height * 0.2 },
      lt: { x: canvas.width * 0.7, y: canvas.height * 0.2 },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.2 },
      lt: { x: canvas.width * 0.7, y: canvas.height * 0.3 },
    },
    {
      arc: true,
      circle: {
        x: canvas.width * 0.7,
        y: canvas.height * 0.35,
        r: canvas.height * 0.05,
      },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.4 },
      lt: { x: canvas.width * 0.7, y: canvas.height * 0.55 },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.44 },
      lt: { x: canvas.width * 0.6, y: canvas.height * 0.48 },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.44 },
      lt: { x: canvas.width * 0.8, y: canvas.height * 0.48 },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.55 },
      lt: { x: canvas.width * 0.6, y: canvas.height * 0.7 },
    },
    {
      mt: { x: canvas.width * 0.7, y: canvas.height * 0.55 },
      lt: { x: canvas.width * 0.8, y: canvas.height * 0.7 },
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
    ctx.lineWidth = count > 3 ? 4 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = count > 3 ? 'red' : 'black';
    ctx.stroke();
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.moveTo(lineCoords[count].mt.x, lineCoords[count].mt.y);
    ctx.lineTo(lineCoords[count].lt.x, lineCoords[count].lt.y);
    ctx.lineWidth = count > 3 ? 4 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = count > 3 ? 'red' : 'black';
    ctx.stroke();
    ctx.closePath();
  }
};

export default drawOnCanvas;

var map_container = document.getElementById('map_container');
var canvas = document.createElement('CANVAS');
canvas.setAttribute('id', 'starmap');
canvas.setAttribute('width', '1000');
canvas.setAttribute('height', '400');
map_container.appendChild(canvas);
WIDTH = canvas.style.clientWidth;
console.log(WIDTH);

var ctx = canvas.getContext("2d");
ctx.strokeStyle = '#0F2631';

for (i=50;i<1000;i+=50) {
  ctx.moveTo(i, 0);
  ctx.lineTo(i, 400);
  ctx.stroke();

  ctx.moveTo(0, i);
  ctx.lineTo(1000, i);
  ctx.stroke();
}


var mapContainer = document.getElementById('map_container');
var canvas = document.createElement('CANVAS');
var locations = [[12, 40], [340, 76], [125, 231], [794, 332], [888, 234], [500, 200], [790, 121], [480, 360]];
var rocketNames = [
  'MX-774', 'PGM-11 Redstone', 'SM-65 Atlas', 'PMG-17 Jupiter', 'PMG-19 Thor',
  'SM-65A Atlas', 'Juno I', 'SM-65B Atlas', 'Thor-Able', 'Juno II',
  'SM-65C Atlas', 'Atlas Able', 'Atlas-Agena', 'Thor-Ablestar', 'Thor-Delta',
  'Saturn I', 'Titan I', 'Delta A', 'Thorad-Agena', 'Saturn INT-21',
  'N-I', 'Pegasus', 'Taurus', 'Minotaur', 'Atlas GX', 'Falcon I',
  'Saturn V', 'Delta III', 'Ares IV', 'Atlas B', 'Titan IV'
]
canvas.setAttribute('id', 'starmap');
canvas.setAttribute('width', '1000');
canvas.setAttribute('height', '400');
mapContainer.appendChild(canvas);
WIDTH = canvas.style.clientWidth;

function updateMap() {
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = '#0F2631';
  ctx.lineWidth=1;

  var grdTopBottom = ctx.createLinearGradient(0,450,0,0)
  grdTopBottom.addColorStop(0,"black");
  grdTopBottom.addColorStop(1,"#040E13");
  ctx.fillStyle = grdTopBottom;
  ctx.fillRect(0,0,1000,400);


  for (i=50;i<1000;i+=50) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 400);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = "10px Arial";
    ctx.fillText(i, i + 5, 10);

    if (i < 400) {
      ctx.moveTo(0, i);
      ctx.lineTo(1000, i);
      ctx.stroke();
      ctx.fillText(i, 10, i + 10);
    }
  }


  for (p=0;p<locations.length;p++) {
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(locations[p][0],locations[p][1],2,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.arc(locations[p][0], locations[p][1], 9, 0, 2*Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = "10px Arial";
    ctx.fillText(rocketNames[p],locations[p][0] + 10,locations[p][1]);
  }
  ctx.shadowBlur = 10;


  var origin = locations[0];
  console.log(origin);
  ctx.strokeStyle='grey';
  ctx.beginPath();
  ctx.moveTo(origin[0], origin[1]);
  locations.forEach(function(p) {
    ctx.lineTo(p[0], p[1]);
  });

  ctx.font = "20px Arial";
  ctx.fillText('SECTOR-9', 850, 40);
  ctx.stroke();
}

updateMap();

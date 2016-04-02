function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}

var msg = document.getElementById('com_msg');
var dangers = [
  'Overflow error caused rocket to explode upon launch.',
  'Guidance system failed, rocket and payload lost.',
  'Full loss of cummunication with rocket. No way of returning.',
  'Rocket hit by debris. Damaged beyond repair.',
  'Fuel tank leaked. Rocket cannot return.'
  ];

function Base(name, planet) {
  this.name = name;
  this.planet = planet;
  this.base_rockets = 2;
  this.out_rockets = 0;
  this.scientists = 4;
  this.resources = 5000;
}

Base.prototype.launch = function() {
  var btn = document.getElementById('base_launch');
  var xcoord = document.getElementById('rocket_x');
  var ycoord = document.getElementById('rocket_y');
  var zcoord = document.getElementById('rocket_z');
  if ((this.base_rockets < 1) || (this.resources < 25) || (this.scientists) < (this.base_rockets + this.out_rockets)) {
      this.scientists < (this.base_rockets + this.out_rockets) ? msg.innerHTML = 'You need a scientist for each rocket you launch' : msg.innerHTML = 'Need more rockets or resources';
    var launchFlash = setInterval(function() {
      btn.style.color == 'green' ? btn.style.color = 'red' : btn.style.color = 'green';
      btn.style.borderColor == 'green' ? btn.style.borderColor = 'red' : btn.style.borderColor = 'green';
    }, 1000);
    window.setTimeout(function() {
      clearInterval(launchFlash);
      btn.style.color == 'green';
      btn.style.borderColor == 'green';
    }, 5000);
  } else {
    if (launchSuccess()) {
      this.base_rockets -= 1;
      this.out_rockets += 1;
      this.resources -= 25;
      var coords = [
        genLargeNumber(), 
        genLargeNumber(), 
        genLargeNumber()
      ];
      console.log(coords[0]);
      msg.innerHTML = 'Rocket launched.'; 
      xcoord.innerHTML = 'x - ' + coords[0];
      ycoord.innerHTML = 'y - ' + coords[1];
      zcoord.innerHTML = 'z - ' + coords[2];
    } else { 
      msg.innerHTML = dangers[Math.floor(Math.random() * dangers.length)];
      this.base_rockets -= 1;
    }
  }
  display_game_info();
};

Base.prototype.return_rocket = function() {
  if (this.out_rockets > 0) {
    this.out_rockets -= 1;
    this.base_rockets += 1;
    this.resources += 50;
  }
  display_game_info();
};

Base.prototype.returnAllRockets = function() {
  this.resources += (this.out_rockets * 50);
  this.base_rockets += this.out_rockets;
  this.out_rockets = 0;
  display_game_info();
}

Base.prototype.buy_rocket = function() {
  if ((this.resources - 1000) >= 0) {
    this.resources -= 1000;
    this.base_rockets += 1;
  }
  display_game_info();
};

Base.prototype.buy_scientist = function() {
  if (this.resources - 40 >= 0) {
    this.scientists += 1;
    this.resources -= 40;
  }
  display_game_info();
};

Base.prototype.update = function() {
  alert('Rockets stationed at base:', this.base_rockets);
  alert('Rockets on missions:', this.out_rockets);
  alert('Total rockets:', this.base_rockets + this.out_rockets);
};

var user_base = new Base('Titanium', 'Indar');

function display_game_info() {
  var document_base = document.getElementById('base_name');
  var document_base_heading = document.getElementById('base_name_heading');
  var document_planet = document.getElementById('base_planet');
  var document_resources = document.getElementById('base_resources');
  var document_scientists = document.getElementById('base_scientists');
  var document_base_rockets = document.getElementById('base_rockets');
  var document_out_rockets = document.getElementById('out_rockets');

  document_base.innerHTML = user_base.name;
  document_base_heading.innerHTML = user_base.name;
  document_planet.innerHTML = user_base.planet;
  document_resources.innerHTML = user_base.resources;
  document_scientists.innerHTML = user_base.scientists;
  document_base_rockets.innerHTML = user_base.base_rockets;
  document_out_rockets.innerHTML = user_base.out_rockets;
}

function launchSuccess() {
  var probability = Math.random();
  if (probability > 0.2) { 
    return true;
  }
}

function generateCoordinates() {
  return ((genLargeNumber(), genLargeNumber(), genLargeNumber())); 
}

function genLargeNumber() {
  return Math.random() * 100000;
}

//Listeners
var button_launch = document.getElementById('base_launch');
var button_return = document.getElementById('base_return');
var button_return_all = document.getElementById('base_return_all');
var button_rocket_purchase = document.getElementById('rocket_purchase');
var button_scientist_purchase = document.getElementById('scientist_purchase');

button_launch.addEventListener('click', e => user_base.launch());
button_return.addEventListener('click', function() {
  user_base.return_rocket();  
});
button_return_all.addEventListener('click', e => user_base.returnAllRockets());
button_rocket_purchase.addEventListener('click', e => user_base.buy_rocket());
button_scientist_purchase.addEventListener('click', e => user_base.buy_scientist());

display_game_info();

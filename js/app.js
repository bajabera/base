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

function Base(name, planet) {
  this.name = name;
  this.planet = planet;
  this.base_rockets = 1;
  this.out_rockets = 0;
  this.scientists = 1;
  this.resources = 50;
}

Base.prototype.launch = function() {
  alert(this.name);
  if ((this.base_rockets -= 1) >= 0 && (this.resources - 25) >= 0) {
    this.base_rockets -= 1;
    this.out_rockets += 1;
    this.resources -= 25;
  } else {
    alert(this.base_rockets);
  }
}

Base.prototype.return_rocket = function() {
  if (this.out_rockets > 0) {
    this.out_rockets -= 1;
    this.base_rockets += 1;
    this.resources += 50;
  }
}

Base.prototype.buy_scientist = function() {
  if (this.resources - 40 >= 0) {
    this.scientists += 1;
    this.resources -= 40;
  }
}

Base.prototype.update = function() {
  alert('Rockets stationed at base:', this.base_rockets);
  alert('Rockets on missions:', this.out_rockets);
  alert('Total rockets:', this.base_rockets + this.out_rockets);
}

var user_base = new Base('Titanium', 'Indar');

function display_options() {
  
}

function display_game_info() {
  var document_base = document.getElementById('base_name');
  var document_planet = document.getElementById('base_planet');
  var document_resources = document.getElementById('base_resources');
  var document_scientists = document.getElementById('base_scientists');
  var document_base_rockets = document.getElementById('base_rockets');
  var document_out_rockets = document.getElementById('out_rockets');

  document_base.innerHTML = user_base.name;
  document_planet.innerHTML = user_base.planet;
  document_resources.innerHTML = user_base.resources;
  document_scientists.innerHTML = user_base.scientists;
  document_base_rockets.innerHTML = user_base.base_rockets;
  document_out_rockets.innerHTML = user_base.out_rockets;
}

//Listeners
var button_launch = document.getElementById('base_launch');
var button_return = document.getElementById('base_return');
var button_rocket_purchase = document.getElementById('rocket_purchase');
var button_scientist_purchase = document.getElementById('scientist_purchase');

button_launch.addEventListener('click', user_base.launch);
button_return.addEventListener('click', user_base.return_rocket);
button_rocket_purchase.addEventListener('click', user_base.buy_rocket);
button_scientist_purchase.addEventListener('click', user_base.buy_scientist);


running = true;
while (running) {
  display_game_info();
  display_options();
  running = false;
}


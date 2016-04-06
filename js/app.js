/**
 * Author: Ed Prince
 * Description: Main JS file for beta_base.
 */

function Base(name) {
  var base = {
    name: name,
    resources: 2000,
    scientists: 4,
    rockets_in: 2,
    rockets_out: 0,
    payload: 500,
    launchCost: 5,
    returnCost: 5,
    funding: 50,
    donations: 20,
    advertising: 100,
    hireCost: 100,
    wages: 30,
    maintenance: 5,
    researchDepartment: false,
    researchDepartmentCost: 15000,
    researchDepartmentScientists: 2,
    decryptionDepartment: false,
    decryptionDepartmentCost: 20000,
    decryptionDepartmentScientists: 4,
    financeDepartment: false,
    financeDepartmentCost: 25000,
    financeDepartmentScientists: 4,
    largeHulls: false,
    largeHullsCost: 10000,
    launch: function() {
      if (base.resources >= base.launchCost) {
        base.resources -= base.launchCost;
        base.rockets_in -= 1;
        base.rockets_out += 1;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    returnRocket: function() {
      if (base.resources >= base.returnCost) {
        base.resources -= base.returnCost;
        base.rockets_out -= 1;
        base.rockets_in -= 1;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    returnAll: function() {
      if (base.resources >= (base.rockets_out * base.returnCost)) {
        base.resources -= (base.rockets_out * base.returnCost);
        base.rockets_in += base.rockets_out;
        base.rockets_out = 0;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    hire: function() {
      if (base.resources >= base.hireCost) {
        base.resources -= base.hireCost;
        base.scientists += 1;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    buyResearch: function() {
      if ((base.resources >= base.researchDepartmentCost) && (base.scientists >= base.researchDepartmentScientists)) {
        base.resources -= base.researchDepartmentCost;
        base.researchDepartment = true;
        base.scientists -= base.researchDepartmentScientists;
        base.funding *= 2;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    buyDecryptionDepartment: function() {
      if ((base.resources >= base.decryptionDepartmentCost) && (base.scientists >= base.decryptionDepartmentScientists)) {
        base.resources -= base.decryptionDepartmentCost;
        base.decyptionDepartment = true;
        base.scientists -= base.decryptionDepartmentScientists;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    buyFinanceDepartment: function() {
      if ((base.resources >= base.financeDepartmentCost) && (base.scientists >= base.financeDepartmentScientists)) {
        base.resources -= base.financeDepartmentCost;
        base.financeDepartment = true;
        base.scientists -= base.financeDepartmentScientists;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    },
    buyHull: function() {
      if (base.resources >= base.largeHullsCost) {
        base.resources -= base.largeHullsCost;
        base.largeHulls = true;
        base.payload *= 2;
      } else {
        writeMessage('Mission Control', 'funds');
      }
    }
  }
  return base;
}

//Program Flow
var title = 'Getting Started';
var content = document.getElementById('intro_content').innerHTML;
drawToModal(title, content, 'Proceed', 'Name your station', 'station_name');
listen('modal_btn1', 'click', closeModal);
listen('nav_map', 'click', displayMap);

var myBase = Base('Eiden');

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function displayMap() {
  //updateMap();
}





/**
 * Function generates a random float between two integers
 * @param {number} min - The lower bound for generation
 * @param {number} max - The upper bound for generation
 * @returns {number} - A randomly generated number within the given bounds
 */
function generateCoordinate(min, max) {
  return Math.random() * max + min;
}

/**
 * A listener function that shortens code to listen for events
 */
function listen(id, event_type, fn) {
  document.getElementById(id).addEventListener(event_type, fn);
}

/**
 * Function returns a list of randomly generated coordinates
 * @param {number} length - Defines the length of the list the function should
 * return
 * @returns {object} List of the given length of randomly generated coordinates
 */
function createProfitList(length) {
  var list = [];
  for(i = 0; i < length;i++) {
    var x = generateCoordinate(MIN, MAX);
    var y = generateCoordinate(MIN, MAX);
    list.push([x, y]);
  }
  return list;
}

/**
 * Displays content on a modal that is displayed
 * @param {string} title - Title of the modal
 * @param {string} text - The text content of the modal
 * @param {string} button - The text to display on the modal button
 * @param {string} input1 - The text to display on the (optional) first input
 * @param {string} input2 - The text to display on the (optional second input
 * @param {string} button2 - The text to display on the (optional) second button
 * @returns {boolean} true/false - Providing function success
 */
function drawToModal(title, text, button, input1, input1_id, input2, button2) {
  var modal = document.getElementById('modal');
  var heading = document.createElement("H2");
  var content = document.createElement("P");
  var btn = document.createElement("BUTTON");
  var br = document.createElement("BR");
  heading.innerHTML = title;
  content.innerHTML = text;
  btn.innerHTML = button;
  btn.setAttribute('class', 'glow upper');
  btn.setAttribute('id', 'modal_btn1');
  heading.setAttribute('class', 'glow');
  modal.appendChild(heading)
    .appendChild(br);
  modal.appendChild(content);
  if (input1 !== undefined) {
    var inpt1 = document.createElement("INPUT");
    inpt1.setAttribute('placeholder', input1);
    inpt1.setAttribute('id', input1_id);
    modal.appendChild(inpt1);
    modal.appendChild(br);
  }
  if (input2 !== undefined) {
    var inpt2 = document.createElement("INPUT");
    inpt2.setAttribute('placeholder', input2);
    modal.appendChild(inpt2);
    modal.appendChild(br);
  }
  modal.appendChild(btn);
  if (button2 !== undefined) {
    var btn2 = document.createElement("BUTTON");
    btn2.appendChild(button2);
  }
  modal.style.display = 'block';
}


/**
 * Displays message to player
 * {string} sender - contains the name of the sender of the message
 * {string} content - contains the content of the message
 * {returns} true/false on success/failure of message sending
 */
function writeMessage(sender, content) {
  if (content == 'funds') {
    content = 'We do not have sufficient funds to authorize this request.';
  }
  var msg_sender = document.getElementById('message_sender');
  var msg_content = document.getElementById('message_content');
  msg_sender.innerHTML = 'From: ' + sender;
  msg_content.innerHTML = content;
}

/**
 * Displays finances
 * {number} wages - Outgoing wages
 * {number} maintenance - Outgoing maintenance
 * {number} funding - Incoming funding
 * {number} donations - Incoming donations
 * {number} advertising - Incoming advertising
 * {returns} true/false on success
 */
function displayFinance(wages, maintenance, funding, donations, advertising) {
  var finance_wages = document.getElementById('out_wages');
  var finance_maintenance = document.getElementById('out_maintenance');
  var finance_funding = document.getElementById('in_funding');
  var finance_donations = document.getElementById('in_donations');
  var finance_advertising = document.getElementById('in_advertising');
  var turnover = document.getElementById('finance_turnover');

  finance_wages.innerHTML = wages;
  finance_maintenance.innerHTML = maintenance;
  finance_funding.innerHTML = funding;
  finance_donations.innerHTML = donations;
  finance_advertising.innerHTML = advertising;

  profit = funding + donations + advertising - wages - maintenance;
  profit < 0 ? turnover.style.color = 'red' : turnover.style.color = 'green';
  turnover.innerHTML = profit;
}

function displayData(base) {
  display('rockets_in', base.rockets_in);
  display('rockets_out', base.rockets_out);
  display('scientists', base.scientists);
  display('resources', base.resources);
}

function display(id, content) {
  document.getElementById(id).innerHTML = content;
}

displayData(myBase);
displayFinance(myBase.wages, myBase.maintenance, myBase.funding, myBase.donations, myBase.advertising);
writeMessage('Ed Prince', 'Greeting Commander, welcome to the system. Here you will find messages in future turns, giving potentially crucial knowledge on many aspects of space exploration. Keep an eye on it!');

/**
 * Author: Ed Prince
 * Description: Main JS file for beta_base.
 */

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
function drawToModal(title, text, button, input1, input2, button2) {
  var modal = document.getElementById('modal');
  var heading = document.createElement("H2");
  var content = document.createElement("P");
  var btn = document.createElement("BUTTON");
  var br = document.createElement("BR");
  heading.innerHTML = title;
  content.innerHTML = text;
  btn.innerHTML = button;
  btn.setAttribute('class', 'glow upper');
  heading.setAttribute('class', 'glow');
  modal.appendChild(heading)
    .appendChild(br);
  modal.appendChild(content);
  if (input1 !== undefined) {
    var inpt1 = document.createElement("INPUT");
    inpt1.setAttribute('placeholder', input1);
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
}


/**
 * Displays message to player
 * {string} sender - contains the name of the sender of the message
 * {string} content - contains the content of the message
 * {returns} true/false on success/failure of message sending
 */
function writeMessage(sender, content) {
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


displayFinance(2000, 150, 200, 45, 1000);
writeMessage('Ed Prince', 'Greeting space-goer, welcome to the system. Here you will find messages in future turns, giving potentially crucial knowledge on many aspects of space exploration. Keep an eye on it!');
var title = 'Getting Started';
var content = document.getElementById('intro_content').innerHTML;
drawToModal(title, content, 'Proceed', 'Name your station');

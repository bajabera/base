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



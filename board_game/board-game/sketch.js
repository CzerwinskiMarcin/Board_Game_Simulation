/**
 * Board Game Simulation
 * For AssecoBS
 * By Marcin Czerwinski
 * 2019-04-09
 * 
 * @description Main loop of p5.js 
 * 
 */

let settings;
let gameManager;

/**
 * @description Set up the canvas (only once), background and GameManager
 */
function setup() {
  let canvas = createCanvas(800, 800);
  background(145, 93, 95);
  gameManager = new MainManager(canvas);
}

/**
 * @description Loop that force the script to update
 */
function draw() {
  gameManager.run();
}

/**
 * @description Handler of mouse click event
 */
function mouseClicked() {
  gameManager.handleClick(); 
}

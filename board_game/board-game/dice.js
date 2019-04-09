/**
 * @class Dice
 */
class Dice {
  /**
   * @constructor Creates dice
   * 
   * @param {number} diceSize 
   * @param {number} diceFiledsNumber 
   */
  constructor(diceSize = 50, diceFiledsNumber = 6) {
    this.diceSize = diceSize;
    this.diceFields = [];
    this.initializeDice(diceFiledsNumber);
    this.rollResult;
    this.diceRollResults = [];
  }

  /**
   * @description Initialize the dice
   * 
   * @param {number} diceFiledsNumber 
   */
  initializeDice(diceFiledsNumber) {
    for (let i = 1; i <= diceFiledsNumber; i++) {
      this.diceFields.push(i);
    }

    this.rollResult = null;
  }

  /**
   * @description Roll the dice and get the random output
   */
  roll() {
    let rollResult = random(this.diceFields);
    
    // FOR DEBUG
    // let rollResult = 1;
    // END DEBUG
    this.logRoll(rollResult);
    return (this.rollResult = rollResult);
  }

  /**
   * @description Logs the roll for statistics purpose
   * 
   * @param {number} rollResult 
   */
  logRoll(rollResult) {
    this.diceRollResults.push(rollResult);
  }

  /**
   * @description Get roll statistics
   * @return {Object}
   */
  getRollResultsStatistics() {
    return {
      numberOfRolls: this.diceRollResults.length,
      mean: this.getMeanOfRolls()
    };
  }

  /**
   * @description Get mean of logged rolls
   * @returns {number}
   */
  getMeanOfRolls() {
    let sum = this.diceRollResults.reduce(
      (sum, rollResult) => sum + rollResult,
      0
    );
    return sum / this.diceRollResults.length;
  }

  /**
   * @description Draw the dice
   */
  draw() {
    fill(255);
    stroke(0);
    rect(0, 0, this.diceSize, this.diceSize);
    noStroke();
    textSize(16);
    fill(0);
    text(this.rollResult ? this.rollResult : "Dice", 10, 30);
  }
}

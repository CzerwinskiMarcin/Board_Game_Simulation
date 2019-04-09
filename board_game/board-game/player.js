class Player {
  /**
   * @description Creates player and set it on the given field
   * @param {Field} currentField 
   */
  constructor(currentField) {
    this.currentField = currentField;
  }

  /**
   * @description Set new field
   * @param {Field} newField 
   */
  setNewField(newField) {
    this.currentField = newField;
  }

  /**
   * @description Get current field index
   * @returns {number} Current field index
   */
  getCurrentFieldIndex() {
    return this.currentField.getIndex();
  }

  /**
   * @description Get current field coordinates
   * @returns {Object} Coordinates
   */
  getCoordinates() {
    return this.currentField.getCoordinates();
  }

  /**
   * @description Draw the player
   */
  draw() {
    fill(255, 0, 0);
    circle(6, 0, 15);
  }
}
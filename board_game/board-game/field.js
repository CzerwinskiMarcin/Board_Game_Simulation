/**
 * @class Field
 */
class Field {
  /**
   * @description Creates Field object
   *
   * @param {number} index
   * @param {number} width
   * @param {number} height
   */
  constructor(index, width, height) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.effect = null;
  }

  /**
   * @description Get index of field
   * @returns {number}
   */
  getIndex() {
    return this.index;
  }

  /**
   * @description Set coordinates for field
   *
   * @param {number} coordinateX
   * @param {number} coordinateY
   *
   * @returns {Field}
   */
  setCoordinates(coordinateX, coordinateY) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;

    return this;
  }

  /**
   * @description Get coordinates of field
   *
   * @returns {Object} Coordinates
   */
  getCoordinates() {
    return {
      coordinateX: this.coordinateX,
      coordinateY: this.coordinateY
    };
  }

  /**
   * @description Check if field has effect
   * @returns {boolean}
   */
  hasEffect() {
    return !!this.effect;
  }

  /**
   * @description Get field effect
   * @return {function}
   */
  getEffect() {
    return this.effect;
  }

  /**
   * @description Set field effect
   * @param {function} effect
   */

  setEffect(effect) {
    this.effect = effect;
  }

  /**
   * @description Draw the field
   *
   * @param {number} stepX
   * @param {number} stepY
   */
  draw(stepX, stepY) {
    translate(this.coordinateX * stepX, this.coordinateY * stepY);

    // Draw field
    stroke(255);
    if (this.hasEffect()) {
      fill(color(234, 162, 129));
    } else {
      fill(color(142, 92, 145));
    }
    rect(0, 0, this.width, this.height);

    // Draw numbers
    textSize(18);
    stroke(0);
    fill(0);
    text(this.index + 1, this.width / 2, this.height / 2 + 8);

    // Reset stroke and translate
    stroke(0);
    resetMatrix();
  }
}

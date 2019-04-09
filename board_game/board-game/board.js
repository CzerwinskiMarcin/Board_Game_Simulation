/**
 * @class Board
 */
class Board {
  /**
   * @constructor Creates Board
   *
   * @param {Object} settings
   */
  constructor({
    boardWidth,
    boardHeight,
    fieldsNumber,
    columnsNumber,
    rowsNumber,
    fieldEffects
  }) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.fieldsNumber = fieldsNumber;
    this.columnsNumber = columnsNumber;
    this.rowsNumber = rowsNumber;
    this.columnWidth = this.boardWidth / this.columnsNumber;
    this.rowHeight = this.boardHeight / this.rowsNumber;
    this.fieldEffects = fieldEffects;
    this.setUp(fieldEffects);
  }

  /**
   * @description Set up the board, fields, special effects for fields and dice
   */
  setUp() {
    this.fields = this.initializeBoardFields();
    this.loadFieldsEffects(this.fieldEffects);
    this.player = new Player(this.fields[0]);
    this.dice = new Dice();
  }

  /**
   * @description Prepare Field objects
   */
  initializeBoardFields() {
    let fields = [];
    let index = 0;

    // TODO: Random generation of fields - for future development

    initializationOfFileds: for (let col = 0; col < this.columnsNumber; col++) {
      for (let row = 0; row < this.rowsNumber; row++) {
        let field = new Field(
          index,
          this.columnWidth,
          this.rowHeight
        ).setCoordinates(col, row);
        fields.push(field);
        index++;
        if (index == this.fieldsNumber) {
          break initializationOfFileds;
        }
      }
    }
    return fields;
  }

  /**
   * @description Loads the fields effects for fields
   *
   * @param {Object} fieldEffects
   */
  loadFieldsEffects(fieldEffects) {
    fieldEffects.forEach(fieldEffect => {
      let effect;
      switch (fieldEffect.effectType) {
        case FieldEffect.TYPE.MOVE:
          effect = FieldEffect.getEffect(fieldEffect.effectType, () =>
            this.movePlayer(fieldEffect.payload)
          );
          break;
        default:
          effect = FieldEffect.getEffect(fieldEffect.effectType);
          break;
      }

      this.fields[fieldEffect.targetFieldIndex].setEffect(effect);
    });
  }

  /**
   * @description Draw the dice
   */
  drawDice() {
    translate(width - 100, 100);
    this.dice.draw();
    resetMatrix();
  }

  /**
   * @description Draw the player
   */
  drawPlayer() {
    const { coordinateX, coordinateY } = this.player.getCoordinates();
    translate(
      this.columnWidth * coordinateX + this.columnWidth / 2,
      this.rowHeight * coordinateY + this.rowHeight / 2
    );
    this.player.draw();
    resetMatrix();
  }

  /**
   * @description Draw the fields
   */
  drawFields() {
    this.fields.forEach(fields =>
      fields.draw(this.columnWidth, this.rowHeight)
    );
  }

  /**
   * @description Draw the board dividers
   */
  drawDividers() {
    stroke(255);
    for (let i = 0; i <= this.columnsNumber; i++) {
      line(i * this.columnWidth, 0, i * this.columnWidth, this.boardHeight);
    }

    for (let i = 0; i <= this.rowsNumber; i++) {
      line(0, i * this.rowHeight, this.boardWidth, i * this.rowHeight);
    }

    // Reset stroke color
    stroke(0);
  }

  /**
   * @description Draw the board
   */
  drawBoard() {
    fill(color(0, 0, 0));
    rect(0, 0, this.boardWidth, this.boardHeight);
  }

  /**
   * @description Draw all of the board pieces
   */
  draw = () => {
    this.drawBoard();
    this.drawDividers();
    this.drawFields();
    this.drawPlayer();
    this.drawDice();
  };

  /**
   * @description Handle mouse click event
   *
   * @returns {number} Effect of field
   */
  handleClick() {
    if (this.isDiceClicked()) {
      return this.handleDiceClicked();
    }
  }

  /**
   * @description Check if dice is clicked
   */
  isDiceClicked() {
    if (
      mouseX >= width - 100 &&
      mouseX <= width - 50 &&
      mouseY >= 100 &&
      mouseY <= 150
    ) {
      return true;
    }
    return false;
  }

  /**
   * @description Handle dice click
   * @returns {number} Effect of field
   */
  handleDiceClicked() {
    let result = this.dice.roll();
    this.movePlayer(result);
    return this.chechAbnormal();
  }

  /**
   * @description Move player by given number
   *
   * @param {number} result
   */
  movePlayer(result) {
    let newTargetFieldIndex = this.player.getCurrentFieldIndex() + result;

    if (newTargetFieldIndex > this.fieldsNumber - 1) {
      newTargetFieldIndex =
        this.fieldsNumber - 1 - (newTargetFieldIndex - (this.fieldsNumber - 1));
    }
    this.player.setNewField(this.fields[newTargetFieldIndex]);
  }

  /**
   * @description Check if field has effet and if has, returns field effect
   * @returns {number}
   */
  chechAbnormal() {
    if (this.player.currentField.hasEffect()) {
      return this.player.currentField.getEffect()();
    }
  }

  /**
   * @description Get rolls statistics
   * @returns {Object}
   */
  getRollsResultStatistics() {
    return this.dice.getRollResultsStatistics();
  }
}

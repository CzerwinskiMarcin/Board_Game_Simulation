class MainManager {
  /**
   * @static 
   * @description Possible application states
   */
  static APP_STATE = {
    MENU: 1,
    RUN: 2,
    LOSE: 3,
    WIN: 4,
    SET_UP_GAME: 5
  };

  /**
   * @static
   * @description Default settings for the game
   */
  static DEFAULT_SETTINGS = {
    boardWidth: 600,
    boardHeight: 800,
    fieldsNumber: 20,
    columnsNumber: 1,
    rowsNumber: 20,
    fieldEffects: [
      {
        targetFieldIndex: 11,
        effectType: FieldEffect.TYPE.LOSE
      },
      {
        targetFieldIndex: 19,
        effectType: FieldEffect.TYPE.WIN
      },
      {
        targetFieldIndex: 18,
        effectType: FieldEffect.TYPE.MOVE,
        payload: -8
      }
    ]
  };

  /**
   * @constructor
   * @param {p5Element} canvas Canvas for drawing the board and dice 
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.hide();
    this.settings = MainManager.DEFAULT_SETTINGS;
    this.board = new Board(this.settings);

    this.changeState(MainManager.APP_STATE.MENU);
  }

  /**
   * @description Changes state of application and force reload
   * @param {number} newAppState Aplication state to set
   */
  changeState(newAppState) {
    this.appState = newAppState;
    this.reload();
  }

  /**
   * @description Force reload of application
   */
  reload() {
    this.loaded = false;
  }

  /**
   * @description Set default style for DOM elements
   */
  setStyles() {
    this.styleElements(selectAll("button"), "AUTO", 40);
    this.styleElements(selectAll("input"), "AUTO", 40);
    this.styleElements(selectAll("select"), 150, 40);
  }

  /**
   * 
   * @description Set style for elements
   * 
   * @param {p5Element[]} elements 
   * @param {string|number} width 
   * @param {string|number} height 
   * @param {string} marginRight 
   */
  styleElements(
    elements,
    width = "AUTO",
    height = "AUTO",
    marginRight = "10px"
  ) {
    elements.forEach(element =>
      element.size(width, height).style("margin-right", marginRight)
    );
  }

  /**
   * @description Set up main menu screen
   */
  setUpMainMenuScreen() {
    const menuContainer = createDiv().style("margin-left", "20px");

    const startButton = createButton("Start").mouseClicked(() => {
      this.changeState(MainManager.APP_STATE.SET_UP_GAME);
    });

    const headline = createElement("h2", "Instructions");
    const instructions = createP(
      "Board game simulation<br />Roll dice and move<br />Aim for positive fields and beware of the negative fields!<br />Click on dice to roll it!"
    );

    menuContainer.child(startButton);
    menuContainer.child(headline);
    menuContainer.child(instructions);
    this.setUpOptions();
  }

  /**
   * @description Set up the options part of main menu screen 
   */
  setUpOptions() {
    const container = createDiv().style("margin-left", "20px");
    const headline = createElement("h2", "Options");
    const instructions = createP(
      "Choose field number, select effect type. For type: MOVE, choose by how many fields player must be moved by. Use negative numbers for backwards movement."
    );
    const instructions2 = createP(
      "There is no validation for fields above 20. There is no validation for forced movement value"
    );

    const optionWrapper = createDiv();

    const fieldNumberLabel = createSpan("Add effect to field number: ");
    const fieldNumberInput = createInput("", "number");

    const effectTypeLabel = createSpan("Effect type: ");
    const effectTypeSelect = createSelect();

    const movePlayerLabel = createSpan("Move player by: ");
    const movePlayerInput = createInput("", "number");

    const addEffectButton = createButton("Add field effect");

    addEffectButton.mouseClicked(() => {
      if (
        fieldNumberInput.value() &&
        fieldNumberInput.value() >= 0 &&
        FieldEffect.TYPE[effectTypeSelect.value()]
      ) {
        this.addEffect(
          fieldNumberInput.value(),
          effectTypeSelect.value(),
          movePlayerInput.value()
        );
        this.reload();
      }
    });

    Object.keys(FieldEffect.TYPE).forEach(effectType =>
      effectTypeSelect.option(effectType)
    );

    optionWrapper.child(fieldNumberLabel);
    optionWrapper.child(fieldNumberInput);
    optionWrapper.child(effectTypeLabel);
    optionWrapper.child(effectTypeSelect);
    optionWrapper.child(movePlayerLabel);
    optionWrapper.child(movePlayerInput);
    optionWrapper.child(addEffectButton);

    const effectList = createDiv();
    const effectListHeadline = createElement("h3", "Special fields: ");
    effectList.child(effectListHeadline);

    this.settings.fieldEffects
      .sort((a, b) => a.targetFieldIndex - b.targetFieldIndex)
      .forEach(fieldEffect => {
        const effectSpan = createP(
          `Field number: ${fieldEffect.targetFieldIndex +
            1} Type: ${FieldEffect.getKey(fieldEffect.effectType)}`
        );
        effectList.child(effectSpan);
      });

    container.child(headline);
    container.child(instructions);
    container.child(instructions2);
    container.child(optionWrapper);
    container.child(effectList);
    
    createElement(
      "h2",
      "Created for: <b>Asseco</b> by: <b>Czerwiński Marcin</b>"
    );
  }

  /**
   * @description Add effect to the field
   * 
   * @param {number} fieldNumber 
   * @param {string} effectType 
   * @param {any} payload 
   */
  addEffect(fieldNumber, effectType, payload) {
    const fieldIndex = fieldNumber - 1;

    if (this.fieldEffectExists(fieldIndex)) {
      this.removeOldEffect(fieldIndex);
    }

    this.settings.fieldEffects.push({
      targetFieldIndex: fieldIndex,
      effectType: FieldEffect.TYPE[effectType],
      payload: payload ? payload : null
    });
  }

  /**
   * @description Check if given field has set effect
   * @param {number} fieldIndex 
   * 
   * @returns {FieldEffect} FieldEffect
   */
  fieldEffectExists(fieldIndex) {
    return this.settings.fieldEffects.find(
      fieldEfect => fieldEfect.targetFieldIndex == fieldIndex
    );
  }

  /**
   * @description remove effect for given field
   * @param {number} fieldIndex 
   */
  removeOldEffect(fieldIndex) {
    this.settings.fieldEffects = this.settings.fieldEffects.filter(
      fieldEffect => fieldEffect.targetFieldIndex != fieldIndex
    );
  }

  /**
   * @description Set the board for play
   */
  setUpGame() {
    this.board = new Board(this.settings);
    this.appState = MainManager.APP_STATE.RUN;
    this.loaded = false;
  }

  /**
   * @description Set result screen
   */
  setUpResultScreen() {
    const container = createDiv().style("margin-left", "20px");

    const playAgainButton = createButton("Play again").mouseClicked(() => {
      this.changeState(MainManager.APP_STATE.SET_UP_GAME);
    });

    const mainMenuButton = createButton("Main Menu").mouseClicked(() => {
      this.changeState(MainManager.APP_STATE.MENU);
    });

    const paragraphWrapper = createDiv();
    const resultInfos = this.loadResult();

    resultInfos.forEach(resultInfo => {
      const paragraph = createP(resultInfo);
      paragraphWrapper.child(paragraph);
    });

    container.child(playAgainButton);
    container.child(mainMenuButton);
    container.child(paragraphWrapper);
  }

  /**
   * @description Load data for result screen
   * 
   * @returns {string[]}
   */
  loadResult() {
    const { numberOfRolls, mean } = this.board.getRollsResultStatistics();

    return [
      `You ${this.appState == MainManager.APP_STATE.WIN ? "win" : "lose"}`,
      `You rolled ${numberOfRolls} times`,
      `Mean of rolls is equalt to ${mean}`
    ];
  }

  /**
   * @description Main loop that controls the application
   */
  run() {
    if (!this.loaded) {
      removeElements();
      this.canvas.hide();

      switch (this.appState) {
        case MainManager.APP_STATE.MENU:
          this.displayMainMenu();
          break;
        case MainManager.APP_STATE.SET_UP_GAME:
          this.setUpGame();
        case MainManager.APP_STATE.RUN:
          this.displayGame();
          break;
        case MainManager.APP_STATE.LOSE:
        case MainManager.APP_STATE.WIN:
          this.displayResultMenu();
          break;
      }
      this.setStyles();
      this.loaded = true;
    }
  }

  /**
   * @description Display main menu
   */
  displayMainMenu() {
    this.setUpMainMenuScreen();
  }

  /**
   * @description Display board
   */
  displayGame() {
    this.canvas.show();
    this.board.draw();
  }

  /**
   * @description Display result menu
   */
  displayResultMenu() {
    this.setUpResultScreen();
  }

  /**
   * @description Handle mouse clicke event
   */
  handleClick() {
    if (this.appState == MainManager.APP_STATE.RUN) {
      const newAppState = this.board.handleClick();
      if (newAppState && newAppState != this.appState) {
        this.changeState(newAppState);
      }
      this.reload();
    }
  }
}

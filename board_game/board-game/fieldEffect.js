/**
 * @class
 * @description Manage fields effect and its influence on the Manager flow
 */
class FieldEffect {

  /**
   * @static
   * @description Possible types of effects
   */
  static TYPE = {
    NO_EFFECT: 0,
    WIN: 1,
    LOSE: 2,
    MOVE: 3
  };

  /**
   * @description Get effect influence on Manager flow
   * 
   * @param {number} EffectType 
   * @param {function} callback 
   * @returns {number}
   */
  static getEffect(EffectType, callback = () => {}) {
    switch (EffectType) {
      case FieldEffect.TYPE.WIN:
        return FieldEffect.WIN_GAME;

      case FieldEffect.TYPE.LOSE:
        return FieldEffect.LOSE_GAME;

      case FieldEffect.TYPE.MOVE:
        return FieldEffect.MOVE_PLAYER(callback);

      default:
        return FieldEffect.TYPE.NO_EFFECT;
    }
  }

  /**
   * @static
   * @description Get status for WIN_GAME
   */
  static WIN_GAME = () => {
    return MainManager.APP_STATE.WIN;
  };

  /**
   * @static
   * @description Get status for LOSE_GAME
   */
  static LOSE_GAME = () => {
    return MainManager.APP_STATE.LOSE;
  };

  /**
   * @static
   * @description Get status for MOVE_PLAYER
   */
  static MOVE_PLAYER = callback => () => {
    callback();
    return MainManager.APP_STATE.RUN;
  };

  /**
   * @static
   * @description Get status for NO_EFFECT
   */
  static NO_EFFECT = () => {
    return null;
  };

  /**
   * @description Get key for given value
   * 
   * @param {string} valueOfkey 
   */
  static getKey(valueOfkey) {
    return Object.entries(FieldEffect.TYPE).find(
      ([key, value]) => value == valueOfkey
    )[0];
  }
}

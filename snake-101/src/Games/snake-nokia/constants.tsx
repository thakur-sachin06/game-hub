/* eslint-disable react-refresh/only-export-components */
const SNAKE_DIRECTION = {
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

const ALLOWED_DIRECTIONS = {
  TOP: ["LEFT", "RIGHT"],
  LEFT: ["TOP", "BOTTOM"],
  RIGHT: ["TOP", "BOTTOM"],
  BOTTOM: ["LEFT", "RIGHT"],
};

const BOARD = {
  height: 700,
  width: 1000,
};

const OBJECT_SIZE = 20;

const INITIAL_GAME_SPEED = 100;

export {
  SNAKE_DIRECTION,
  ALLOWED_DIRECTIONS,
  BOARD,
  OBJECT_SIZE,
  INITIAL_GAME_SPEED,
};

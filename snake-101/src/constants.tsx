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
  height: 650,
  width: 1000,
};

// eslint-disable-next-line react-refresh/only-export-components
export { SNAKE_DIRECTION, ALLOWED_DIRECTIONS, BOARD };

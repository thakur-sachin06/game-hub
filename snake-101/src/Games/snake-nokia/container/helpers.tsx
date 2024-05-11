import { BOARD, OBJECT_SIZE } from "../constants";

const getRandomFoodPosition = () => {
  const xCord = Math.abs(Math.floor(Math.random() * BOARD.width) - OBJECT_SIZE);
  const yCord = Math.abs(
    Math.floor(Math.random() * BOARD.height) - OBJECT_SIZE
  );

  return {
    x: Math.round(xCord / OBJECT_SIZE) * OBJECT_SIZE,
    y: Math.round(yCord / OBJECT_SIZE) * OBJECT_SIZE,
  };
};

export { getRandomFoodPosition };

import { BOARD } from "./constants";

const getRandomFoodPosition = () => {
  const xCord = Math.floor(Math.random() * BOARD.width);
  const yCord = Math.floor(Math.random() * BOARD.height);

  return {
    x: Math.round(xCord / 20) * 20,
    y: Math.round(yCord / 20) * 20,
  };
};

export { getRandomFoodPosition };

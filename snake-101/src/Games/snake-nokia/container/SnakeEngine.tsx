import { BOARD, OBJECT_SIZE, SNAKE_DIRECTION } from "../constants";

import { getRandomFoodPosition } from "./helpers";
import { SnakeDirectionType } from "../types";

interface SnakeCordsIF {
  x: number;
  y: number;
}

class SnakeEngine {
  snakeCords: Array<SnakeCordsIF> = [
    { x: 40, y: OBJECT_SIZE },
    { x: 20, y: OBJECT_SIZE },
  ];
  canvasContext: CanvasRenderingContext2D | null = null;
  snakeDirection = SNAKE_DIRECTION.RIGHT;
  foodCords: SnakeCordsIF = getRandomFoodPosition();

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
    this.drawSnake(this.snakeCords, true);
  }

  redrawFoodObject() {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = "red";
      this.canvasContext?.fillRect(
        this.foodCords.x,
        this.foodCords.y,
        OBJECT_SIZE,
        OBJECT_SIZE
      );
    }
  }

  drawRandomFoodObject() {
    if (this.canvasContext) {
      const foodCords = getRandomFoodPosition();
      this.foodCords = foodCords;
      this.canvasContext.fillStyle = "red";
      this.canvasContext?.fillRect(
        foodCords.x,
        foodCords.y,
        OBJECT_SIZE,
        OBJECT_SIZE
      );
    }
  }

  detectEatFood(headCords: SnakeCordsIF) {
    if (headCords.x === this.foodCords.x && headCords.y === this.foodCords.y) {
      return true;
    }
    return false;
  }

  drawSnakeEyes(x: number, y: number) {
    if (this.canvasContext) {
      const radius = 3;
      this.canvasContext.beginPath();
      this.canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
      this.canvasContext.fillStyle = "black"; // Fill color for the circle
      this.canvasContext.fill();
    }
  }

  drawSnake(
    newSnakeCords: Array<SnakeCordsIF>,
    shouldRedrawFoodObject: boolean
  ) {
    this.snakeCords = newSnakeCords;
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, BOARD.width, BOARD.height);
      shouldRedrawFoodObject
        ? this.redrawFoodObject()
        : this.drawRandomFoodObject();
      this.snakeCords.forEach((position: SnakeCordsIF, index: number) => {
        if (this.canvasContext) {
          this.canvasContext.fillStyle = index === 0 ? "green" : "orange";
          this.canvasContext?.fillRect(
            position.x,
            position.y,
            OBJECT_SIZE,
            OBJECT_SIZE
          );
          if (index === 0) {
            this.drawSnakeEyes(position.x + 6, position.y + 6);
            this.drawSnakeEyes(position.x + 14, position.y + 14);
          }
        }
      });
    }
  }

  detectBoundaryHit(
    newSnakeCords: Array<SnakeCordsIF>,
    direction: SnakeDirectionType
  ) {
    const head: SnakeCordsIF = newSnakeCords[0];
    switch (direction) {
      case "RIGHT": {
        if (head.x >= BOARD.width - 10) {
          return true;
        }
        return false;
      }
      case "LEFT": {
        if (head.x < 0) {
          return true;
        }
        return false;
      }
      case "TOP": {
        if (head.y < 0) {
          return true;
        }
        return false;
      }
      case "BOTTOM": {
        if (head.y >= BOARD.height - 10) {
          return true;
        }
        return false;
      }
    }
  }

  moveSnake(
    direction: SnakeDirectionType = "RIGHT",
    handleIsGameOver: () => void,
    increaseScore: () => void
  ) {
    let finalSnakeCords: Array<SnakeCordsIF> = [];

    switch (direction) {
      case "BOTTOM": {
        let newCords = [...this.snakeCords];
        newCords = [
          {
            x: newCords[0].x + 0,
            y: newCords[0].y + OBJECT_SIZE,
          },
          ...newCords,
        ];
        newCords.pop();
        finalSnakeCords = newCords;
        break;
      }
      case "RIGHT": {
        let newCords = [...this.snakeCords];
        newCords = [
          {
            x: newCords[0].x + OBJECT_SIZE,
            y: newCords[0].y + 0,
          },
          ...newCords,
        ];
        newCords.pop();
        finalSnakeCords = newCords;
        break;
      }
      case "LEFT": {
        let newCords = [...this.snakeCords];
        newCords = [
          {
            x: newCords[0].x - OBJECT_SIZE,
            y: newCords[0].y + 0,
          },
          ...newCords,
        ];
        newCords.pop();
        finalSnakeCords = newCords;
        break;
      }
      case "TOP": {
        let newCords = [...this.snakeCords];
        newCords = [
          {
            x: newCords[0].x,
            y: newCords[0].y - OBJECT_SIZE,
          },
          ...newCords,
        ];
        newCords.pop();
        finalSnakeCords = newCords;
        break;
      }
    }
    if (!this.detectBoundaryHit(finalSnakeCords, direction)) {
      if (this.detectEatFood(finalSnakeCords[0])) {
        increaseScore();
        let newCords = [...finalSnakeCords];
        newCords = [
          ...newCords,
          {
            x: newCords[0].x,
            y: newCords[0].y - OBJECT_SIZE,
          },
        ];
        finalSnakeCords = newCords;
        this.drawSnake(finalSnakeCords, false);
      } else {
        this.drawSnake(finalSnakeCords, true);
      }
    } else {
      handleIsGameOver();
    }
  }
}

export default SnakeEngine;

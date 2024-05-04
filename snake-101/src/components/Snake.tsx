import { BOARD, SNAKE_DIRECTION } from "../constants";
import { SnakeDirectionType } from "./types";

interface SnakeCordsIF {
  x: number;
  y: number;
}

class SnakeEngine {
  snakeCords: Array<SnakeCordsIF> = [
    { x: 21, y: 0 },
    { x: 0, y: 0 },
  ];
  canvasContext: CanvasRenderingContext2D | null = null;
  snakeDirection = SNAKE_DIRECTION.RIGHT;
  isPlaying = false;
  isGameOver = false;

  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
    this.drawSnake(this.snakeCords);
  }

  drawSnake(newSnakeCords: Array<SnakeCordsIF>) {
    this.snakeCords = newSnakeCords;
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, BOARD.width, BOARD.height);
      this.snakeCords.forEach((position: SnakeCordsIF, index: number) => {
        if (this.canvasContext) {
          this.canvasContext.fillStyle = index === 0 ? "green" : "black";
          this.canvasContext?.fillRect(position.x, position.y, 20, 20);
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
        if (head.x > BOARD.width) {
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
        if (head.y > BOARD.height) {
          return true;
        }
        return false;
      }
    }
  }

  moveSnake(
    direction: SnakeDirectionType = "RIGHT",
    handleIsPlaying: (_: boolean) => void
  ) {
    let finalSnakeCords: Array<SnakeCordsIF> = [];

    if (this.isGameOver) return;
    switch (direction) {
      case "BOTTOM": {
        let newCords = [...this.snakeCords];
        newCords = [
          {
            x: newCords[0].x + 0,
            y: newCords[0].y + 21,
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
            x: newCords[0].x + 21,
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
            x: newCords[0].x - 21,
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
            y: newCords[0].y - 21,
          },
          ...newCords,
        ];
        newCords.pop();
        finalSnakeCords = newCords;
        break;
      }
    }
    if (!this.detectBoundaryHit(finalSnakeCords, direction)) {
      this.drawSnake(finalSnakeCords);
    } else {
      handleIsPlaying(true);
    }
  }
}

export default SnakeEngine;

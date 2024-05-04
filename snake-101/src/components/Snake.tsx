import { SNAKE_DIRECTION } from "../constants";
import { SnakeDirectionType } from "./types";

interface SnakeCordsIF {
  x: number;
  y: number;
}

class SnakeEngine {
  snakeCords: Array<SnakeCordsIF> = [
    { x: 0, y: 0 },
    { x: 21, y: 0 },
  ];
  canvasContext: CanvasRenderingContext2D | null = null;
  snakeDirection = SNAKE_DIRECTION.RIGHT;
  constructor(canvasContext: CanvasRenderingContext2D) {
    this.canvasContext = canvasContext;
    this.drawSnake(this.snakeCords);
  }

  drawSnake(snakeCords: Array<SnakeCordsIF>) {
    this.snakeCords = snakeCords;
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, 800, 600);
      this.canvasContext.fillStyle = "black";
      snakeCords.forEach((position: SnakeCordsIF) => {
        this.canvasContext?.fillRect(position.x, position.y, 20, 20);
      });
    }
  }

  moveSnake(direction?: SnakeDirectionType) {
    if (direction) {
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
          this.drawSnake(newCords);
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
          this.drawSnake(newCords);
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
          this.drawSnake(newCords);
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
          this.drawSnake(newCords);
          break;
        }
      }
    } else {
      const newCords = this.snakeCords.map((elt: SnakeCordsIF) => {
        return {
          x: elt.x + 20,
          y: elt.y,
        };
      });
      this.drawSnake(newCords);
    }
  }
}

export default SnakeEngine;

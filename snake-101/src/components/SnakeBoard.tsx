import { useEffect, useRef, useState } from "react";

import "./Board.css";
import SnakeEngine from "./Snake";
import { SnakeDirectionType } from "./types";
import { ALLOWED_DIRECTIONS } from "../constants";

function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snakes = useRef<SnakeEngine | null>(null);
  const [snakeSpeed, setSnakeSpeed] = useState(200);
  const [snakeDirection, setSnakeDirection] =
    useState<SnakeDirectionType>("RIGHT");

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    if (context) {
      snakes.current = new SnakeEngine(context);
      window.onkeydown = (e) => {
        switch (e.key) {
          case "w":
          case "ArrowUp":
            if (ALLOWED_DIRECTIONS[snakeDirection].includes("TOP")) {
              setSnakeDirection("TOP");
            }
            break;
          case "s":
          case "ArrowDown":
            if (ALLOWED_DIRECTIONS[snakeDirection].includes("BOTTOM")) {
              setSnakeDirection("BOTTOM");
            }
            break;
          case "d":
          case "ArrowRight":
            if (ALLOWED_DIRECTIONS[snakeDirection].includes("RIGHT")) {
              setSnakeDirection("RIGHT");
            }
            break;
          case "a":
          case "ArrowLeft":
            if (ALLOWED_DIRECTIONS[snakeDirection].includes("LEFT")) {
              setSnakeDirection("LEFT");
            }
            break;
          default:
            break;
        }
      };
    }
  }, [context, snakeDirection]);

  useEffect(() => {
    const id = setInterval(() => {
      if (snakes.current) {
        snakes.current.moveSnake(snakeDirection);
      }
    }, snakeSpeed);

    return () => clearInterval(id);
  }, [snakeDirection, snakeSpeed]);

  return <canvas ref={canvasRef} className="canvas" height={600} width={800} />;
}

export default SnakeBoard;

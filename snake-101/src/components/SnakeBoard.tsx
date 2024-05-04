import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import "./Board.css";
import SnakeEngine from "./Snake";
import { SnakeDirectionType } from "./types";
import { ALLOWED_DIRECTIONS, BOARD } from "../constants";
import GameHeader from "./GameHeader";

function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snakes = useRef<SnakeEngine | null>(null);
  const [snakeSpeed, setSnakeSpeed] = useState(100);
  const [snakeDirection, setSnakeDirection] =
    useState<SnakeDirectionType>("RIGHT");

  // Game play status state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    if (context) {
      snakes.current = new SnakeEngine(context);
    }

    return () => {
      setContext(null);
      snakes.current = null;
    };
  }, [context]);

  useEffect(() => {
    if (context) {
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

  const handleGamePlay = useCallback((isPlaying: boolean) => {
    setIsPlaying(isPlaying);
  }, []);

  const handleIsGameOver = useCallback((isPlaying: boolean) => {
    setIsGameOver(isPlaying);
  }, []);

  const handleRestartGame = useCallback(() => {
    setContext(null);
    snakes.current = null;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (snakes.current && isPlaying) {
        snakes.current.moveSnake(snakeDirection, handleIsGameOver);
      }
    }, snakeSpeed);

    if (!isPlaying) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [handleIsGameOver, isPlaying, snakeDirection, snakeSpeed]);

  return (
    <div className="game-container">
      <GameHeader
        handleGamePlay={handleGamePlay}
        isPlaying={isPlaying}
        handleRestartGame={handleRestartGame}
        isGameOver={isGameOver}
      />
      <canvas
        ref={canvasRef}
        className="canvas"
        height={BOARD.height}
        width={BOARD.width}
      />
    </div>
  );
}

export default SnakeBoard;

import { useCallback, useEffect, useRef, useState } from "react";
import SnakeEngine from "./Snake";
import { SnakeDirectionType } from "./types";
import { ALLOWED_DIRECTIONS, BOARD } from "../constants";
import GameHeader from "./GameHeader";

import "./Board.css";

function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snakes = useRef<SnakeEngine | null>(null);
  const [snakeSpeed, setSnakeSpeed] = useState(100);
  const [snakeDirection, setSnakeDirection] =
    useState<SnakeDirectionType>("RIGHT");

  // Game play status state
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
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

  const initializeGameState = useCallback(() => {
    setContext(null);
    snakes.current = null;
    setIsPlaying(null);
    setIsPaused(false);
  }, []);

  const handleGamePlay = useCallback((isPlaying: boolean) => {
    setIsPlaying(isPlaying);
  }, []);

  const handleIsGameOver = useCallback(
    (isPlaying: boolean) => {
      setIsGameOver(isPlaying);
      initializeGameState();
    },
    [initializeGameState]
  );

  const handlePauseGame = useCallback((isPaused: boolean) => {
    setIsPaused(isPaused);
  }, []);

  const handleRestartGame = useCallback(() => {
    initializeGameState();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (snakes.current && isPlaying && !isPaused && !isGameOver) {
        snakes.current.moveSnake(snakeDirection, handleIsGameOver);
      }
    }, snakeSpeed);

    return () => clearInterval(id);
  }, [
    handleIsGameOver,
    isGameOver,
    isPaused,
    isPlaying,
    snakeDirection,
    snakeSpeed,
  ]);

  return (
    <div className="game-container">
      <GameHeader
        handleGamePlay={handleGamePlay}
        isPlaying={isPlaying}
        handleRestartGame={handleRestartGame}
        handlePauseGame={handlePauseGame}
        isPaused={isPaused}
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

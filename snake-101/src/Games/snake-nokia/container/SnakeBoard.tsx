import { useCallback, useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import eatSound from "../../../sounds/eat.wav";
import gameOverSound from "../../../sounds/game-over.wav";

import SnakeEngine from "./SnakeEngine";
import { SnakeDirectionType } from "../types";
import { ALLOWED_DIRECTIONS, BOARD, INITIAL_GAME_SPEED } from "../constants";
import GameHeader from "./GameHeader";
import Modal from "../../../components/Modal";

import "./Board.css";

function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snakes = useRef<SnakeEngine | null>(null);
  const [snakeSpeed, setSnakeSpeed] = useState(INITIAL_GAME_SPEED);
  const [snakeDirection, setSnakeDirection] =
    useState<SnakeDirectionType>("RIGHT");

  // Game play status state
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  const [playEatSound] = useSound(eatSound);
  const [playgameOverSound] = useSound(gameOverSound);

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

  const increaseScore = useCallback(() => {
    if (isSoundOn) {
      playEatSound();
    }
    const newScore = score + 20;
    if (newScore > 100) {
      setSnakeSpeed(80);
    } else if (newScore > 200) {
      setSnakeSpeed(60);
    } else if (newScore > 260) {
      setSnakeSpeed(40);
    }
    setScore(newScore);
  }, [isSoundOn, playEatSound, score]);

  const initializeGameState = useCallback(() => {
    setContext(null);
    snakes.current = null;
    setIsPaused(false);
    setIsGameOver(false);
    setSnakeDirection("RIGHT");
    setSnakeSpeed(INITIAL_GAME_SPEED);
    setScore(0);
    setIsPlaying(true);
  }, []);

  const handleGamePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleIsGameOver = useCallback(() => {
    if (isSoundOn) {
      playgameOverSound();
    }
    setIsGameOver(true);
  }, [isSoundOn, playgameOverSound]);

  const handlePauseGame = useCallback((isPaused: boolean) => {
    setIsPaused(isPaused);
  }, []);

  const handleRestartGame = useCallback(() => {
    initializeGameState();
  }, [initializeGameState]);

  const handleSoundToggle = useCallback(() => {
    setIsSoundOn(!isSoundOn);
  }, [isSoundOn]);

  useEffect(() => {
    const id = setInterval(() => {
      if (snakes.current && isPlaying && !isPaused && !isGameOver) {
        snakes.current.moveSnake(
          snakeDirection,
          handleIsGameOver,
          increaseScore
        );
      }
    }, snakeSpeed);

    return () => clearInterval(id);
  }, [
    handleIsGameOver,
    increaseScore,
    isGameOver,
    isPaused,
    isPlaying,
    playEatSound,
    snakeDirection,
    snakeSpeed,
  ]);

  return (
    <>
      <div className="game-container">
        <GameHeader
          handleGamePlay={handleGamePlay}
          isPlaying={isPlaying}
          handleRestartGame={handleRestartGame}
          handlePauseGame={handlePauseGame}
          isPaused={isPaused}
          score={score}
          isSoundOn={isSoundOn}
          handleSoundToggle={handleSoundToggle}
        />
        <canvas
          ref={canvasRef}
          className="canvas"
          height={BOARD.height}
          width={BOARD.width}
        />
      </div>
      {isGameOver && (
        <Modal onModalActionClick={initializeGameState} totalScore={score} />
      )}
    </>
  );
}

export default SnakeBoard;

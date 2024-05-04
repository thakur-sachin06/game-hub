import { useCallback } from "react";
import Button from "../components/Button";

const GameHeader = ({
  handleGamePlay,
  isPlaying,
  handleRestartGame,
  handlePauseGame,
  isPaused,
}: {
  handleGamePlay: (status: boolean) => void;
  handleRestartGame: () => void;
  handlePauseGame: (status: boolean) => void;
  isPaused: boolean;
  isPlaying: boolean | null;
}) => {
  const getButtonName = useCallback(() => {
    if (isPaused) {
      return "Resume";
    } else {
      return "Pause";
    }
  }, [isPaused]);

  return (
    <div>
      {isPlaying === null && (
        <Button name="Play" onClick={() => handleGamePlay(true)} />
      )}

      {isPlaying && (
        <Button
          name={getButtonName()}
          onClick={() => handlePauseGame(!isPaused)}
        />
      )}

      {isPlaying && <Button name={"Restart"} onClick={handleRestartGame} />}
    </div>
  );
};

export default GameHeader;

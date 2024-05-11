import { useCallback } from "react";
import Button from "../../../components/Button";

import SoundonLogo from "../assests/sound-on.png";
import SoundoffLogo from "../assests/mute.png";

import "./Board.css";

const GameHeader = ({
  handleGamePlay,
  isPlaying,
  handleRestartGame,
  handlePauseGame,
  isPaused,
  score = 0,
  isSoundOn,
  handleSoundToggle,
}: {
  handleGamePlay: () => void;
  handleRestartGame: () => void;
  handlePauseGame: (status: boolean) => void;
  isPaused: boolean;
  isPlaying: boolean | null;
  score: number;
  isSoundOn: boolean;
  handleSoundToggle: () => void;
}) => {
  const getButtonName = useCallback(() => {
    if (isPaused) {
      return "Resume";
    } else {
      return "Pause";
    }
  }, [isPaused]);

  return (
    <div className="game-header">
      <div>
        {isPlaying === null && (
          <Button isSoundOn={isSoundOn} name="Play" onClick={handleGamePlay} />
        )}
        {isPlaying && (
          <Button
            isSoundOn={isSoundOn}
            name={getButtonName()}
            onClick={() => handlePauseGame(!isPaused)}
          />
        )}
        {isPlaying && (
          <Button
            isSoundOn={isSoundOn}
            name={"Restart"}
            onClick={handleRestartGame}
          />
        )}
      </div>
      <img
        src={isSoundOn ? SoundonLogo : SoundoffLogo}
        className="sound-icon"
        onClick={handleSoundToggle}
      />
      <div className="score-card">
        Score: <span className="score">{score}</span>
      </div>
    </div>
  );
};

export default GameHeader;

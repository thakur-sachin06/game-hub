import "./buttonStyles.css";

const GameHeader = ({
  handleGamePlay,
  isPlaying,
  handleRestartGame,
  isGameOver,
}: {
  handleGamePlay: (status: boolean) => void;
  handleRestartGame: () => void;
  isPlaying: boolean;
  isGameOver: boolean;
}) => {
  return (
    <div>
      <div className="button" onClick={() => handleGamePlay(!isPlaying)}>
        <a href="#">{isPlaying ? "Pause Game" : "Start Game"}</a>
      </div>
      {isPlaying && !isGameOver && (
        <div className="button" onClick={handleRestartGame}>
          <a href="#">{"Reset Game"}</a>
        </div>
      )}
    </div>
  );
};

export default GameHeader;

import useSound from "use-sound";

import click from "../../sounds/click.wav";

import "./ButtonStyles.css";

const Button = ({
  name,
  onClick,
  isSoundOn,
}: {
  name: string;
  onClick: () => void;
  isSoundOn: boolean;
}) => {
  const [play] = useSound(click);

  return (
    <div
      className={`button ${
        name === "Play" || name === "Play again" ? "play-button" : ""
      }`}
      onClick={() => {
        if (isSoundOn) play();
        onClick();
      }}
    >
      <a href="#">{name}</a>
    </div>
  );
};

export default Button;

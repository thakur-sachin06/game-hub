import useSound from "use-sound";
import click from "../../sounds/click.wav";

import "./ButtonStyles.css";

const Button = ({ name, onClick }: { name: string; onClick: () => void }) => {
  const [play] = useSound(click);

  return (
    <div
      className="button"
      onClick={() => {
        play();
        onClick();
      }}
    >
      <a href="#">{name}</a>
    </div>
  );
};

export default Button;

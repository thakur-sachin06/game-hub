import Button from "../Button";

import "./Modal.css";

const Modal = ({
  onModalActionClick,
  totalScore,
}: {
  onModalActionClick: () => void;
  totalScore: number;
}) => {
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-header">
          Game over!! Your total score is {totalScore}
        </div>
        <div className="footer">
          <Button name="Play again" onClick={onModalActionClick} />
        </div>
      </div>
    </>
  );
};

export default Modal;

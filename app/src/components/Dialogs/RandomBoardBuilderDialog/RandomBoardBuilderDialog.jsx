import React from "react";
import Modal from "../../commons/Modal";
import RandomBoardBuilder from "../../RandomBoardBuilder/RandomBoardBuilder";
import "./RandomBoardBuilderDialog.scss";

const RandomBoardBuilderDialog = () => {
  return (
    <Modal
      dialogType={"RandomBoardBuilderDialog"}
      size="lg"
      title={"Set your board"}
    >
      <div className="random_board__content">
        <RandomBoardBuilder />
      </div>
    </Modal>
  );
};

export default RandomBoardBuilderDialog;

import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";

export default function EditPlayers(props) {
  const [editedPlayer, setEditedPlayer] = useState(props.player);

  const savePlayerChanges = () => {
    props.saveEditedPlayer(editedPlayer, props.season);
    props.closeStats();
  };

  const editPlayer = (player) => {
    setEditedPlayer(player);
  };

  return (
    <div onClick={props.closeStats} className="containerModal">
      <div className="cardModal" onClick={(e) => e.stopPropagation()}>
        <Input
          playerPosition={editedPlayer.position}
          player={editedPlayer}
          setEditedPlayer={editPlayer}
        />
        <ButtonGreen onClick={savePlayerChanges} nameButtonSave="Salvar" />
      </div>
    </div>
  );
}

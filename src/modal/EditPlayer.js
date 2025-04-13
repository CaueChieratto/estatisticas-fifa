import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";
import { IoMdClose } from "react-icons/io";

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
    <div onClick={props.closeStats} className="containerModalCreateCarrer">
      <div
        className="cardModalCreateCarrer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerHeader">
          <div className="addClub">Editar Jogador</div>
          <div onClick={props.closeStats} className="closeModalCreateCarrer">
            <IoMdClose size={25} />
          </div>
        </div>
        <Input
          playerPosition={editedPlayer.position}
          player={editedPlayer}
          setEditedPlayer={editPlayer}
        />
        <ButtonGreen onClick={savePlayerChanges} nameButtonNewCarrer="Salvar" />
      </div>
    </div>
  );
}

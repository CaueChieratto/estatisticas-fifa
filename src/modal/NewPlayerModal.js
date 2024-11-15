import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";

export default function NewPlayerModal(props) {
  const [playerPosition, setPlayerPosition] = useState(0);
  const changePlayerPosition = (position) => {
    setPlayerPosition(position);
  };

  const [editedPlayer, setEditedPlayer] = useState({
    playerName: "",
    games: 0,
    goals: 0,
    assists: 0,
    balonDors: 0,
    cleanSheets: 0,
  });

  const editPlayer = (player) => {
    setEditedPlayer(player);
  };

  const savePlayer = () => {
    const newPlayer = { ...editedPlayer, position: playerPosition };

    props.addPlayerToSeason(newPlayer);
    props.closeNewPlayer();
  };

  return (
    <div onClick={props.closeNewPlayer} className="containerModal">
      <div className="cardModalNewPlayer" onClick={(e) => e.stopPropagation()}>
        <div className="containerButtons">
          <div
            onClick={() => changePlayerPosition(0)}
            className={`buttonsPosition ${
              playerPosition == 0 ? "selectedPosition" : ""
            }`}
          >
            linha
          </div>
          <div
            onClick={() => changePlayerPosition(1)}
            className={`buttonsPosition ${
              playerPosition == 1 ? "selectedPosition" : ""
            }`}
          >
            goleiro
          </div>
        </div>
        <Input
          setEditedPlayer={editPlayer}
          player={editedPlayer}
          playerPosition={playerPosition}
        ></Input>
        <ButtonGreen
          onClick={savePlayer}
          newPlayer="Criar Novo Jogador"
        ></ButtonGreen>
      </div>
    </div>
  );
}

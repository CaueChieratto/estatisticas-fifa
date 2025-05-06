import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";
import { IoMdClose } from "react-icons/io";

export default function NewPlayerModal(props) {
  const [playerPosition, setPlayerPosition] = useState(0);
  const changePlayerPosition = (position) => {
    setPlayerPosition(position);
  };

  const [editedPlayer, setEditedPlayer] = useState({
    playerName: "",
    games: 0,
    goals: 0,
    overall: 0,
    assists: 0,
    rating: 0,
    balonDors: 0,
    cleanSheets: 0,
  });

  const editPlayer = (player) => {
    setEditedPlayer(player);
  };

  const savePlayer = () => {
    props.runWithDelayedLoad(async () => {
      const newPlayer = { ...editedPlayer, position: playerPosition };

      await props.addPlayerToSeason(newPlayer);
      props.closeNewPlayer();
    });
  };

  return (
    <div className="containerModalCreateCarrer" onClick={props.closeNewPlayer}>
      <div
        className="cardModalCreateCarrer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerHeader">
          <div className="addClub">Adicionar Jogador</div>
          <div
            onClick={props.closeNewPlayer}
            className="closeModalCreateCarrer"
          >
            <IoMdClose size={25} />
          </div>
        </div>
        <div className="containerButtons">
          <div
            onClick={() => changePlayerPosition(0)}
            className={`buttonsPosition ${
              playerPosition == 0 ? "selectedPosition" : ""
            }`}
          >
            Linha
          </div>
          <div
            onClick={() => changePlayerPosition(1)}
            className={`buttonsPosition ${
              playerPosition == 1 ? "selectedPosition" : ""
            }`}
          >
            Goleiro
          </div>
        </div>
        <Input
          showAll={false}
          setEditedPlayer={editPlayer}
          player={editedPlayer}
          playerPosition={playerPosition}
        ></Input>
        <ButtonGreen
          onClick={savePlayer}
          nameButtonNewCarrer="Criar Novo Jogador"
        ></ButtonGreen>
      </div>
    </div>
  );
}

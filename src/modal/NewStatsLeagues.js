import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";
import { leagueImages } from "../leaguesAndTrophies/leaguesAndTrophies.js";
import { IoMdClose } from "react-icons/io";
import { HiOutlineSelector } from "react-icons/hi";

export default function NewStatsLeagues(props) {
  const [editedLeague, setEditedLeague] = useState({
    league: "",
    leagueImage: "",
    games: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    rating: 0,
  });

  const handleLeagueChange = (event) => {
    const selectedLeague = event.target.value;

    setEditedLeague((prev) => ({
      ...prev,
      league: selectedLeague,
      leagueImage: leagueImages[selectedLeague] || "",
    }));
  };

  const editLeague = (player) => {
    setEditedLeague(player);
  };
  const statsLeague = () => {
    props.runWithDelayedLoad(async () => {
      if (editedLeague.league === "") {
        alert("Selecione uma opção");
        return;
      }

      await props.addLeagueToPlayer(editedLeague);
      props.closeModal();
    });
  };

  const availableLeagues = props.carrer.leagues || [];

  return (
    <div className="containerModalCreateCarrer" onClick={props.closeModal}>
      <div
        className="cardModalCreateCarrer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerHeader">
          <div className="addClub">Adicionar Nova Liga</div>
          <div onClick={props.closeModal} className="closeModalCreateCarrer">
            <IoMdClose size={25} />
          </div>
        </div>
        <div className="allInputsCreateCarrer">
          <div className="iconForInputsCreateCarrer">
            <HiOutlineSelector size={15} />
          </div>
          <select
            className="inputsCreateCarrer"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              marginRight: "4px",
            }}
            name="league"
            value={editedLeague.league}
            onChange={handleLeagueChange}
          >
            <option value="" disabled>
              Selecione uma Liga
            </option>
            {availableLeagues.map((league, index) => (
              <option key={index} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>

        <Input
          showAll={true}
          setEditedPlayer={editLeague}
          player={editedLeague}
          playerPosition={props.playerPosition}
        ></Input>
        <ButtonGreen
          onClick={statsLeague}
          nameButtonNewCarrer="Salvar Estatísticas"
        ></ButtonGreen>
      </div>
    </div>
  );
}

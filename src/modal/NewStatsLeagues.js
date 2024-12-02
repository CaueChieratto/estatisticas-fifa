import React, { useState } from "react";
import "./Modal.css";
import Input from "../components/inputs/Input";
import ButtonGreen from "../components/buttons/ButtonGreen";

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

    let leagueImage = "";

    if (selectedLeague === "La Liga") {
      leagueImage = "./laliga.png";
    } else if (selectedLeague === "La Liga 2") {
      leagueImage = "./laliga2.png";
    } else if (selectedLeague === "Copa do Rey") {
      leagueImage = "./copaRey.png";
    } else if (selectedLeague === "Supercopa") {
      leagueImage = "./superCopaEspanha.png";
    } else if (selectedLeague === "Champions League") {
      leagueImage = "./champions.png";
    } else if (selectedLeague === "Europa League") {
      leagueImage = "./europaLeague.png";
    } else if (selectedLeague === "Conference League") {
      leagueImage = "./conferenceLeague.png";
    }

    setEditedLeague((prev) => ({
      ...prev,
      league: selectedLeague,
      leagueImage: leagueImage,
    }));
  };

  const editLeague = (player) => {
    setEditedLeague(player);
  };

  const statsLeague = () => {
    if (editedLeague.league === "") {
      alert("Selecione uma opção");
      return;
    }

    props.addLeagueToPlayer(editedLeague);
    props.closeModal();
  };

  return (
    <div className="containerSelectLeague">
      <div className="selects">
        <select
          className="options"
          name="league"
          value={editedLeague.league}
          onChange={handleLeagueChange}
        >
          <option value="" disabled>
            Selecione uma liga
          </option>
          <option value="La Liga">La Liga</option>
          <option value="La Liga 2">La Liga 2</option>
          <option value="Copa do Rey">Copa do Rey</option>
          <option value="Supercopa">Supercopa da Espanha</option>
          <option value="Champions League">Champions League</option>
          <option value="Europa League">Europa League</option>
          <option value="Conference League">Conference League</option>
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
        newPlayer="Salvar Estatisticas"
      ></ButtonGreen>
    </div>
  );
}

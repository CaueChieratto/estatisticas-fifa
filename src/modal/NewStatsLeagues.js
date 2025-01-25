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

    const leagueImages = {
      "La Liga": "./laliga.png",
      "La Liga 2": "./laliga2.png",
      "Copa da Espanha": "./copaRey.png",
      Supercopa: "./superCopaEspanha.png",
      "Champions League": "./champions.png",
      "Europa League": "./europaLeague.png",
      "Conference League": "./conferenceLeague.png",
      "UEFA Supercup": "./UEFAsupercopa.png",
      "Lendas do clube": "./icon.png",
      "FA Cup": "./england/faCup.png",
      "Carabao Cup": "./england/carabaoCup.png",
      "League Two": "./england/leagueTwo.png",
      "Playoff Lg Two": "./england/leagueTwo.png",
      "BSM Trophy": "./england/BSMtrophy.png",
      "League One": "./england/leagueOne.png",
      "Playoff Lg One": "./england/leagueOne.png",
      "EFL Championship": "./england/championship.png",
      "Playoff EFL": "./england/championship.png",
      "Community Shield": "./england/communityShield.png",
      "Premier League": "./england/premierLeague.png",
    };

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
    if (editedLeague.league === "") {
      alert("Selecione uma opção");
      return;
    }

    props.addLeagueToPlayer(editedLeague);
    props.closeModal();
  };

  const availableLeagues = props.carrer.leagues || [];

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
        newPlayer="Salvar Estatisticas"
      ></ButtonGreen>
    </div>
  );
}

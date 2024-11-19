import React, { useState } from "react";
import "./PlayerContainer.css";
import { IoAddCircleOutline } from "react-icons/io5";
import NewStatsLeagues from "../../modal/NewStatsLeagues";

export default function LeaguesContainer(props) {
  const [newPlayerStatsLeagues, setNewPlayerStatsLeagues] = useState(false);

  const openModal = () => {
    setNewPlayerStatsLeagues(true);
  };

  const closeModal = () => {
    setNewPlayerStatsLeagues(false);
  };

  const addLeagueToPlayer = (league) => {
    if (!props.player.leagues) {
      props.player.leagues = [];
    }
    props.player.leagues.push(league);

    const fifaData = JSON.parse(localStorage.getItem("fifaData"));
    console.log(fifaData);

    const updatedFifaData = {
      ...fifaData,
      carrers: fifaData.carrers.map((carrer) =>
        carrer.club === props.carrer.club
          ? {
              ...carrer,
              seasons: carrer.seasons.map((season) =>
                season.season === props.season.season
                  ? {
                      ...season,
                      players: season.players.map((player) =>
                        player.playerName === props.player.playerName
                          ? { ...props.player }
                          : player
                      ),
                    }
                  : season
              ),
            }
          : carrer
      ),
    };

    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));

    console.log("fifaData atualizado:", updatedFifaData);
  };

  return (
    <>
      <div className="wrapperNewStatsLeagues">
        <div className="addStats" onClick={openModal}>
          <IoAddCircleOutline />
        </div>
      </div>

      {newPlayerStatsLeagues && (
        <NewStatsLeagues
          addLeagueToPlayer={addLeagueToPlayer}
          playerPosition={props.playerPosition}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

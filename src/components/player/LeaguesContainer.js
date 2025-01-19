import React, { useState } from "react";
import "./PlayerContainer.css";
import { FcAddDatabase } from "react-icons/fc";
import { CgCloseR } from "react-icons/cg";

import NewStatsLeagues from "../../modal/NewStatsLeagues";
import DeleteSeason from "../../modal/DeleteSeason";
import { FcFullTrash } from "react-icons/fc";

export default function LeaguesContainer(props) {
  const [newPlayerStatsLeagues, setNewPlayerStatsLeagues] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState(null);

  const openModal = () => {
    setNewPlayerStatsLeagues((prevState) => !prevState);
  };

  const closeModal = () => {
    setNewPlayerStatsLeagues(false);
  };

  const [deleteLeague, setDeleteLeague] = useState(false);

  const openModalDelete = (leagueIndex) => {
    setLeagueToDelete(leagueIndex);
    setDeleteLeague(true);
  };

  const closeModalDelete = () => {
    setLeagueToDelete(null);
    setDeleteLeague(false);
  };

  const updateFifaData = () => {
    const fifaData = JSON.parse(localStorage.getItem("fifaData"));

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
    props.updatePage(updatedFifaData);
  };

  const addLeagueToPlayer = (league) => {
    if (!props.player.leagues) {
      props.player.leagues = [];
    }
    props.player.leagues.push(league);
    updateFifaData();
  };

  const deleteLeagueFromPlayer = () => {
    if (leagueToDelete !== null) {
      const updatedLeagues = [...props.player.leagues];
      updatedLeagues.splice(leagueToDelete, 1);
      props.player.leagues = updatedLeagues;
      updateFifaData();
      closeModalDelete();
    }
  };

  return (
    <>
      {props.player?.leagues?.map((league, leagueIndex) => (
        <div key={leagueIndex} className="wrapperStatsLeagues">
          <div className="containerIMGleagues">
            <img
              className="leagues"
              src={league.leagueImage}
              alt={league.league}
            />
            {league.league}
          </div>
          <span className="statsNumber">{league.games}</span>
          {props.playerPosition === 0 && (
            <span className="statsNumber">{league.goals}</span>
          )}
          {props.playerPosition === 1 && (
            <span className="statsNumber">{league.cleanSheets}</span>
          )}
          <span className="statsNumber">{league.assists}</span>
          <span
            className="statsNumber overallSmall"
            style={{
              background:
                league.rating <= 6
                  ? "#E03131"
                  : league.rating <= 6.5
                  ? "#FD7E14"
                  : league.rating <= 7
                  ? "#FCC419"
                  : league.rating <= 7.5
                  ? "#66A80F"
                  : league.rating <= 8
                  ? "#2B8A3E"
                  : league.rating <= 8.5
                  ? "#1E88E5"
                  : "#00FF00",
            }}
          >
            {league.rating}
          </span>
          <div className="close" onClick={() => openModalDelete(leagueIndex)}>
            <FcFullTrash />
          </div>
        </div>
      ))}
      <div className="wrapperNewStatsLeagues">
        <div className="addStats" onClick={openModal}>
          <span className="textNewLeague">
            {newPlayerStatsLeagues ? "fechar" : "adicionar nova liga"}
          </span>
          {newPlayerStatsLeagues ? <CgCloseR /> : <FcAddDatabase />}
        </div>
      </div>

      {newPlayerStatsLeagues && (
        <NewStatsLeagues
          addLeagueToPlayer={addLeagueToPlayer}
          playerPosition={props.playerPosition}
          carrer={props.carrer}
          closeModal={closeModal}
        />
      )}

      {deleteLeague && (
        <DeleteSeason
          delete={deleteLeagueFromPlayer}
          textDelete="apagar liga"
          closeModalDelete={closeModalDelete}
        />
      )}
    </>
  );
}

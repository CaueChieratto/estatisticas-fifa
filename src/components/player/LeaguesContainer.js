import React, { useState } from "react";
import "./PlayerContainer.css";
import { IoAddCircleOutline } from "react-icons/io5";
import NewStatsLeagues from "../../modal/NewStatsLeagues";
import DeleteSeason from "../../modal/DeleteSeason";

export default function LeaguesContainer(props) {
  const [newPlayerStatsLeagues, setNewPlayerStatsLeagues] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState(null);

  const openModal = () => {
    setNewPlayerStatsLeagues(true);
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
    console.log("fifaData atualizado:", updatedFifaData);
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
      // Fazendo uma cópia do array para evitar mutação direta
      const updatedLeagues = [...props.player.leagues];
      updatedLeagues.splice(leagueToDelete, 1); // Removendo o item pelo índice
      props.player.leagues = updatedLeagues; // Atualizando o estado de leagues do player
      updateFifaData(); // Atualizando os dados no localStorage
      closeModalDelete(); // Fechando o modal
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
          <span className="statsNumber">{league.goals}</span>
          <span className="statsNumber">{league.assists}</span>
          <span
            className="statsNumber"
            style={{
              color:
                league.rating >= 9
                  ? "#1E88E5"
                  : league.rating >= 8
                  ? "#33C771"
                  : league.rating >= 7
                  ? "#F08022"
                  : "#DD3636",
            }}
          >
            {league.rating}
          </span>
          {props.playerPosition === 1 && (
            <span className="statsNumber">{league.cleanSheets}</span>
          )}
          <div className="close" onClick={() => openModalDelete(leagueIndex)}>
            del
          </div>
        </div>
      ))}
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

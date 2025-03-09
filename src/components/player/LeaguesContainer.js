import React, { useState } from "react";
import "./PlayerContainer.css";
import { FcAddDatabase } from "react-icons/fc";
import { CgCloseR } from "react-icons/cg";
import { db } from "../../firebase/firebase.js";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import NewStatsLeagues from "../../modal/NewStatsLeagues";
import DeleteSeason from "../../modal/DeleteSeason";
import { getAuth } from "firebase/auth";
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

  const updateFifaData = async () => {
    const fifaDocRef = doc(db, "fifaData", props.carrer.id);
    const fifaDoc = await getDoc(fifaDocRef);

    if (!fifaDoc.exists()) {
      return;
    }

    const fifaData = fifaDoc.data();

    const updatedSeasons = fifaData.seasons.map((season) =>
      season.id === props.season.id
        ? {
            ...season,
            players: season.players.map((player) =>
              player.playerName === props.player.playerName
                ? { ...props.player }
                : player
            ),
          }
        : season
    );

    await updateDoc(fifaDocRef, { seasons: updatedSeasons });
    props.updatePage({ ...fifaData, seasons: updatedSeasons });
  };

  const addLeagueToPlayer = async (league) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user?.uid) {
      console.error("Usuário não autenticado.");
      return;
    }

    const fifaDocRef = doc(db, "users", user.uid, "fifaData", props.carrer.id);
    const fifaDoc = await getDoc(fifaDocRef);

    if (!fifaDoc.exists()) {
      return;
    }

    const fifaData = fifaDoc.data();

    const updatedSeasons = fifaData.seasons.map((season) =>
      season.id === props.season.id
        ? {
            ...season,
            players: season.players.map((player) =>
              player.playerName === props.player.playerName
                ? {
                    ...player,
                    leagues: [...(player.leagues || []), league],
                  }
                : player
            ),
          }
        : season
    );

    await updateDoc(fifaDocRef, { seasons: updatedSeasons });
  };

  const deleteLeagueFromPlayer = async () => {
    if (leagueToDelete !== null) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user?.uid) {
          console.error("Usuário não autenticado.");
          return;
        }

        const fifaDocRef = doc(
          db,
          "users",
          user.uid,
          "fifaData",
          props.carrer.id
        );
        const fifaDoc = await getDoc(fifaDocRef);

        if (!fifaDoc.exists()) {
          return;
        }

        const fifaData = fifaDoc.data();

        const updatedSeasons = fifaData.seasons.map((season) =>
          season.id === props.season.id
            ? {
                ...season,
                players: season.players.map((player) =>
                  player.playerName === props.player.playerName
                    ? {
                        ...player,
                        leagues: player.leagues.filter(
                          (league, index) => index !== leagueToDelete
                        ),
                      }
                    : player
                ),
              }
            : season
        );

        await updateDoc(fifaDocRef, { seasons: updatedSeasons });

        if (typeof props.setSeasons === "function") {
          props.setSeasons(updatedSeasons);
        }
      } catch (error) {
        console.error("Erro ao deletar liga do jogador: ", error);
      }

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

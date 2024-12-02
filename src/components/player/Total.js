import React, { useEffect, useState } from "react";
import Infos from "./Infos.js";
import PlayerTotal from "./PlayerTotal.js";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

export default function Total(props) {
  const [playersStatsTotal, setPlayersStatsTotal] = useState([]);
  const [openSeasons, setOpenSeasons] = useState([]);

  useEffect(() => {
    if (props.seasons) {
      getTotalPlayers();
    }
  }, [props.seasons]);

  const getTotalPlayers = () => {
    const playersStats = {};

    props.seasons.forEach((season) => {
      season.players.forEach((player) => {
        const { playerName, balonDors, overall } = player;
        if (!playersStats[playerName]) {
          playersStats[playerName] = {
            playerName: playerName,
            games: 0,
            goals: 0,
            assists: 0,
            balonDors: 0,
            ratingSum: 0,
            ratingCount: 0,
            overall: 0, // Inicializa como 0
            cleanSheets: 0,
            position: player.position,
            leagues: player.leagues,
          };
        }

        // Atualiza o balonDors
        playersStats[playerName].balonDors += Number(balonDors);

        // Atualiza o maior valor de overall diretamente do player
        const numericOverall = overall ? Number(overall) : 0;
        playersStats[playerName].overall = Math.max(
          playersStats[playerName].overall,
          numericOverall
        );

        // Agora, vamos iterar sobre as ligas
        player.leagues?.forEach((league) => {
          const { games, goals, assists, cleanSheets, rating } = league;

          // Atualizando as estatísticas gerais
          playersStats[playerName].games += Number(games);
          playersStats[playerName].goals += Number(goals);
          playersStats[playerName].assists += Number(assists);
          playersStats[playerName].cleanSheets += Number(cleanSheets || 0);

          playersStats[playerName].ratingSum += Number(rating || 0);
          playersStats[playerName].ratingCount += rating ? 1 : 0;
        });
      });
    });

    const formattedStats = Object.values(playersStats)
      .map((player) => ({
        ...player,
        rating:
          player.ratingCount > 0
            ? (player.ratingSum / player.ratingCount).toFixed(2)
            : 0,
        combinedValue:
          player.games * 0.2 +
          (player.position === 1
            ? player.cleanSheets * 0.25
            : (player.goals + player.assists) * 0.4) +
          (player.ratingSum / player.ratingCount || 0) * 0.5,
      }))
      .sort((a, b) => {
        if (b.balonDors !== a.balonDors) return b.balonDors - a.balonDors;
        return b.combinedValue - a.combinedValue;
      });

    setPlayersStatsTotal(formattedStats);
  };

  const toggleVisibility = (seasonId) => {
    setOpenSeasons((prev) => {
      if (prev.includes(seasonId)) {
        return prev.filter((id) => id !== seasonId);
      } else {
        return [...prev, seasonId];
      }
    });
  };

  return (
    <div className="container">
      <div className="seasons">
        <div
          onClick={() => toggleVisibility("total")}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Total
          {openSeasons.includes("total") ? (
            <span>
              <FaArrowUp />
            </span>
          ) : (
            <span>
              <FaArrowDown />
            </span>
          )}
        </div>
        {openSeasons.includes("total") && (
          <div className="containerStatsTotal">
            {playersStatsTotal.length > 0 ? (
              playersStatsTotal.map((player, index) => (
                <div className="borderTotal" key={index}>
                  <Infos
                    show={false}
                    overall={player.overall}
                    playerName={player.playerName}
                    playerPosition={player.position}
                  />
                  <PlayerTotal
                    seasons={props.seasons}
                    player={player}
                    leagues={player.league}
                    playerPosition={player.position}
                    total
                    games={player.games}
                    goals={player.goals}
                    assists={player.assists}
                    balonDors={player.balonDors}
                    cleanSheets={player.cleanSheets}
                    rating={player.rating}
                    overall={player.overall}
                  />
                </div>
              ))
            ) : (
              <div>Nenhum jogador disponível</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

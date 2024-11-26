import React, { useEffect, useState } from "react";
import Infos from "./Infos.js";
import PlayerTotal from "./PlayerTotal.js";

export default function Total(props) {
  const [playersStatsTotal, setPlayersStatsTotal] = useState([]);

  useEffect(() => {
    if (props.seasons) {
      getTotalPlayers();
    }
  }, [props.seasons]);

  const getTotalPlayers = () => {
    const playersStats = {};

    props.seasons.forEach((season) => {
      season.players.forEach((player) => {
        const { playerName, balonDors } = player;
        if (!playersStats[playerName]) {
          playersStats[playerName] = {
            playerName: playerName,
            games: 0,
            goals: 0,
            assists: 0,
            balonDors: 0,
            ratingSum: 0,
            ratingCount: 0,
            overall: 0,
            cleanSheets: 0,
            position: player.position,
            leagues: player.leagues,
          };
        }
        playersStats[playerName].balonDors += Number(balonDors);
        player.leagues?.forEach((league) => {
          const { games, goals, assists, cleanSheets, rating, overall } =
            league;
          playersStats[playerName].games += Number(games);
          playersStats[playerName].goals += Number(goals);
          playersStats[playerName].assists += Number(assists);
          playersStats[playerName].cleanSheets += Number(cleanSheets || 0);

          playersStats[playerName].overall = Math.max(
            playersStats[playerName].overall,
            Number(overall || 0)
          );

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
          player.games * 0.6 +
          player.goals * 0.3 +
          (player.ratingSum / player.ratingCount || 0) * 0.1, // Ponderação
      }))
      .sort((a, b) => b.combinedValue - a.combinedValue); // Ordena pela soma ponderada

    setPlayersStatsTotal(formattedStats);
  };

  return (
    <div className="container">
      <div className="seasons">
        total
        <div className="containerStatsTotal">
          {playersStatsTotal.length > 0 ? (
            playersStatsTotal.map((player, index) => (
              <div className="borderTotal" key={index}>
                <Infos
                  show={false}
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
            <div>Nenhum jogador disponivel</div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import PlayerContainer from "./PlayerContainer.js";
import Infos from "./Infos.js";

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
        const {
          playerName,
          games,
          goals,
          assists,
          balonDors,
          cleanSheets,
          rating,
          overall,
        } = player;

        if (!playersStats[playerName]) {
          playersStats[playerName] = {
            playerName: playerName,
            games: 0,
            goals: 0,
            assists: 0,
            balonDors: 0,
            ratingSum: 0,
            overall: 0,
            cleanSheets: 0,
            position: player.position,
          };
        }

        playersStats[playerName].games += Number(games);
        playersStats[playerName].goals += Number(goals);
        playersStats[playerName].assists += Number(assists);
        playersStats[playerName].balonDors += Number(balonDors);
        playersStats[playerName].cleanSheets += Number(cleanSheets || 0);

        playersStats[playerName].overall = Math.max(
          playersStats[playerName].overall,
          Number(overall || 0)
        );

        playersStats[playerName].ratingSum += Number(rating || 0);
      });
    });

    const formattedStats = Object.values(playersStats).map((player) => ({
      ...player,
      rating:
        player.games > 0 ? (player.ratingSum / player.games).toFixed(2) : 0,
    }));

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
                  playerName={player.playerName}
                  playerPosition={player.position}
                />
                <PlayerContainer
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

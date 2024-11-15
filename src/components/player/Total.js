import React, { useEffect, useState } from "react";
import PlayerContainer from "./PlayerContainer.js";

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
        const { playerName, games, goals, assists, balonDors, cleanSheets } =
          player;

        if (!playersStats[playerName]) {
          playersStats[playerName] = {
            playerName: playerName,
            games: 0,
            goals: 0,
            assists: 0,
            balonDors: 0,
            cleanSheets: 0,
            position: player.position,
          };
        }

        playersStats[playerName].games += Number(games);
        playersStats[playerName].goals += Number(goals);
        playersStats[playerName].assists += Number(assists);
        playersStats[playerName].balonDors += Number(balonDors);
        playersStats[playerName].cleanSheets += Number(cleanSheets || 0);
      });
    });

    setPlayersStatsTotal(Object.values(playersStats));
  };

  return (
    <div className="container">
      <div className="seasons">
        total
        <div className="containerStatsTotal">
          {playersStatsTotal.length > 0 ? (
            playersStatsTotal.map((player, index) => (
              <div className="borderTotal" key={index}>
                <PlayerContainer
                  playerPosition={player.position}
                  playerName={player.playerName}
                  games={player.games}
                  goals={player.goals}
                  assists={player.assists}
                  balonDors={player.balonDors}
                  cleanSheets={player.cleanSheets}
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

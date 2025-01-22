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
      const isLegendSeason = season.season === 0;
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
            gamesSum: 0,
            overall: 0,
            cleanSheets: 0,
            position: player.position,
            leagues: player.leagues,
            isLegend: false,
          };
        }

        if (isLegendSeason) {
          playersStats[playerName].isLegend = true;
        }

        playersStats[playerName].balonDors += Number(balonDors);

        const numericOverall = overall ? Number(overall) : 0;
        playersStats[playerName].overall = Math.max(
          playersStats[playerName].overall,
          numericOverall
        );

        player.leagues?.forEach((league) => {
          const { games, goals, assists, cleanSheets, rating } = league;

          const gamesNumber = Number(games) || 0;
          const ratingNumber = Number(rating) || 0;

          playersStats[playerName].games += gamesNumber;
          playersStats[playerName].goals += Number(goals);
          playersStats[playerName].assists += Number(assists);
          playersStats[playerName].cleanSheets += Number(cleanSheets || 0);

          playersStats[playerName].ratingSum += ratingNumber * gamesNumber;
          playersStats[playerName].gamesSum += gamesNumber;
        });
      });
    });

    const formattedStats = Object.values(playersStats)
      .map((player) => ({
        ...player,
        rating:
          player.gamesSum > 0
            ? (player.ratingSum / player.gamesSum).toFixed(2)
            : 0,
        combinedValue:
          (player.games * 0.3 +
            (player.position === 1
              ? player.cleanSheets * 0.4
              : player.goals * 1) +
            player.assists * 0.8 +
            (player.isLegend
              ? 0.2
              : (player.ratingSum / player.gamesSum || 0) * 0.8)) *
          (player.isLegend ? 1.2 : 1),
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

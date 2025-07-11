import React, { useEffect, useState } from "react";
import Infos from "./Infos.js";
import PlayerTotal from "./PlayerTotal.js";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import "../../pages/pageForTeams/StyleTeams.css";

export default function Total(props) {
  const [playersStatsTotal, setPlayersStatsTotal] = useState([]);
  const [openSeasons, setOpenSeasons] = useState([]);

  useEffect(() => {
    if (props.seasons) {
      getTotalPlayers();
    }
  }, [props.seasons]);

  useEffect(() => {
    const section = localStorage.getItem("openSectionOnReturn");
    if (section) {
      setOpenSeasons((prev) =>
        prev.includes(section) ? prev : [...prev, section]
      );
      localStorage.removeItem("openSectionOnReturn");
    }
  }, []);

  const toggleVisibility = (seasonId) => {
    let newSeasons = [];
    setOpenSeasons((prev) => {
      const isOpen = prev.includes(seasonId);
      newSeasons = isOpen
        ? prev.filter((id) => id !== seasonId)
        : [...prev, seasonId];
      return newSeasons;
    });

    if (props.setOpenedSection) {
      const sectionValue = newSeasons.includes(seasonId) ? seasonId : "";
      props.setOpenedSection(sectionValue);
      localStorage.setItem("openSectionOnReturn", sectionValue);
    }
  };

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
            gamesSum: 0,
            overall: 0,
            cleanSheets: 0,
            position: player.position,
            leagues: player.leagues,
          };
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
      .map((player) => {
        const isLegendLeague = player.leagues?.some(
          (league) => league.leagueName === "Lendas do clube"
        );

        return {
          ...player,
          rating:
            player.gamesSum > 0
              ? (player.ratingSum / player.gamesSum).toFixed(2)
              : 0,
          combinedValue: isLegendLeague
            ? 0
            : player.games * 0.15 +
              (player.position === 1
                ? player.cleanSheets * 0.2
                : player.goals * 1) +
              player.assists * 0.6 +
              (player.ratingSum / player.gamesSum || 0) * 0.8,
        };
      })
      .sort((a, b) => {
        if (b.balonDors !== a.balonDors) return b.balonDors - a.balonDors;
        return b.combinedValue - a.combinedValue;
      });

    setPlayersStatsTotal(formattedStats);
  };

  return (
    <div className="containerAllSeasons">
      <div className="seasons">
        <div onClick={() => toggleVisibility("total")} className="openSeasons">
          <div className="seasonsSummed">Temporadas Somadas</div>
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
                    total
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

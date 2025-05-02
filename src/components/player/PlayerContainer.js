import React, { useState, useEffect } from "react";
import "./PlayerContainer.css";
import LeaguesContainer from "./LeaguesContainer";
import { GrExpand } from "react-icons/gr";
import { GrContract } from "react-icons/gr";

export default function PlayerContainer(props) {
  const [openStatsInLeagues, setOpenStatesInLeagues] = useState(false);

  const showStatsInleagues = () => {
    setOpenStatesInLeagues(!openStatsInLeagues);
  };

  const leagues = props.player?.leagues || [];
  const totalGames = leagues.reduce(
    (acc, league) => acc + (parseInt(league.games) || 0),
    0
  );
  const totalGoals = leagues.reduce(
    (acc, league) => acc + (parseInt(league.goals) || 0),
    0
  );
  const totalAssists = leagues.reduce(
    (acc, league) => acc + (parseInt(league.assists) || 0),
    0
  );
  const totalCleanSheets =
    props.playerPosition === 1
      ? leagues.reduce(
          (acc, league) => acc + (parseInt(league.cleanSheets) || 0),
          0
        )
      : 0;

  const weightedAverageRating = leagues.length
    ? leagues.reduce(
        (acc, league) => {
          const rating = parseFloat(league.rating) || 0;
          const games = parseInt(league.games, 10) || 0;
          return {
            totalRating: acc.totalRating + rating * games,
            totalGames: acc.totalGames + games,
          };
        },
        { totalRating: 0, totalGames: 0 }
      )
    : { totalRating: 0, totalGames: 0 };

  const averageRating = weightedAverageRating.totalGames
    ? weightedAverageRating.totalRating / weightedAverageRating.totalGames
    : 0;

  return (
    <>
      <div>
        <div className="infosTitleStats" onClick={showStatsInleagues}>
          {props.total && (
            <span className="total">
              Expandir
              {!openStatsInLeagues ? <GrContract /> : <GrExpand size={10} />}
            </span>
          )}

          <span className="statsNumber">{totalGames}</span>
          {props.playerPosition == 0 && (
            <span className="statsNumber">{totalGoals}</span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">{totalCleanSheets}</span>
          )}
          <span className="statsNumber">{totalAssists}</span>
          <span
            className="statsNumber overall"
            id="rating"
            style={{
              background:
                averageRating <= 6
                  ? "#E03131"
                  : averageRating <= 6.5
                  ? "#FD7E14"
                  : averageRating <= 7
                  ? "#FCC419"
                  : averageRating <= 7.5
                  ? "#66A80F"
                  : averageRating <= 8.5
                  ? "#2B8A3E"
                  : averageRating <= 9
                  ? "#1E88E5"
                  : "#00FF00",
            }}
          >
            {averageRating === 10 ? "10" : averageRating.toFixed(2)}
          </span>

          <span className="statsNumber">{props.balonDors}</span>
        </div>
        {openStatsInLeagues && (
          <>
            <LeaguesContainer
              updatePage={props.updatePage}
              showNewleagues={true}
              carrer={props.carrer}
              season={props.season}
              player={props.player}
              playerPosition={props.playerPosition}
            />
          </>
        )}
      </div>
    </>
  );
}

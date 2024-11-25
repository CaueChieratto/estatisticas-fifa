import React, { useState, useEffect } from "react";
import "./PlayerContainer.css";
import LeaguesContainer from "./LeaguesContainer";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";

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

  const averageRating = leagues.length
    ? leagues.reduce(
        (acc, league) => acc + (parseFloat(league.rating) || 0),
        0
      ) / leagues.length
    : 0;

  return (
    <>
      <div>
        <div className="infosTitleStats">
          {props.total && (
            <div className="containerNameClick" onClick={showStatsInleagues}>
              <span className="total">
                detalhes
                {!openStatsInLeagues ? <GoEyeClosed /> : <GoEye />}
              </span>
            </div>
          )}

          <span className="statsNumber">{totalGames}</span>
          <span className="statsNumber">{totalGoals}</span>
          <span className="statsNumber">{totalAssists}</span>
          <span className="statsNumber" id="rating">
            {averageRating === 10 ? "10" : averageRating.toFixed(2)}
          </span>
          {props.playerPosition == 0 && (
            <span className="statsNumber">{props.balonDors}</span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">{totalCleanSheets}</span>
          )}
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

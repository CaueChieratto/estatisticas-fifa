import React, { useState } from "react";
import "./PlayerContainer.css";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import LeaguesContainer from "./LeaguesContainer";

export default function PlayerContainer(props) {
  const [openStatsInLeagues, setOpenStatesInLeagues] = useState(false);

  const showStatsInleagues = () => {
    setOpenStatesInLeagues(!openStatsInLeagues);
  };

  return (
    <>
      <div>
        <div className="infosTitleStats">
          {props.playerName && (
            <div className="containerName">
              <span className="player">{props.playerName}</span>
            </div>
          )}
          {props.total && (
            <div className="containerNameClick" onClick={showStatsInleagues}>
              <span className="total">
                detalhes
                {!openStatsInLeagues ? (
                  <FaArrowAltCircleDown />
                ) : (
                  <FaArrowAltCircleUp />
                )}
              </span>
            </div>
          )}
          <span className="statsNumber" id="overall">
            {props.overall}
          </span>
          <span className="statsNumber">{props.games}</span>
          <span className="statsNumber">{props.goals}</span>
          <span className="statsNumber">{props.assists}</span>
          <span className="statsNumber" id="rating">
            {props.rating}
          </span>
          {props.playerPosition == 0 && (
            <span className="statsNumber">{props.balonDors}</span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">{props.cleanSheets}</span>
          )}
        </div>
        {openStatsInLeagues && (
          <>
            <LeaguesContainer
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

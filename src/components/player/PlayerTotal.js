import { React, useState } from "react";
import "./PlayerContainer.css";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import LeagueTotal from "./LeagueTotal";

export default function PlayerTotal(props) {
  const [openStatsInLeagues, setOpenStatesInLeagues] = useState(false);

  const showStatsInleagues = () => {
    setOpenStatesInLeagues(!openStatsInLeagues);
  };

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

          <span className="statsNumber">{props.games}</span>
          <span className="statsNumber">{props.goals}</span>
          <span className="statsNumber">{props.assists}</span>
          <span className="statsNumber" id="rating">
            {props.rating === 10 ? "10" : props.rating}
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
            <LeagueTotal
              seasons={props.seasons}
              updatePage={props.updatePage}
              showNewleagues={true}
              data={props.carrer}
              player={props.player}
              playerPosition={props.playerPosition}
            />
          </>
        )}
      </div>
    </>
  );
}

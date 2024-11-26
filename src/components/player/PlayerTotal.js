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
          {props.playerPosition == 0 && (
            <span className="statsNumber">{props.goals}</span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">{props.cleanSheets}</span>
          )}
          <span className="statsNumber">{props.assists}</span>
          <span
            className="statsNumber"
            id="rating"
            style={{
              color:
                props.rating >= 9
                  ? "#1E88E5"
                  : props.rating >= 8
                  ? "#33C771"
                  : props.rating >= 7
                  ? "#F08022"
                  : "#DD3636",
            }}
          >
            {props.rating === 10
              ? "10"
              : typeof props.rating === "number"
              ? props.rating.toFixed(2)
              : props.rating}{" "}
          </span>
          <span className="statsNumber">{props.balonDors}</span>
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

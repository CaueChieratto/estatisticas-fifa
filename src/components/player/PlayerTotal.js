import { React, useState } from "react";
import "./PlayerContainer.css";
import { GrExpand } from "react-icons/gr";
import { GrContract } from "react-icons/gr";
import LeagueTotal from "./LeagueTotal";

export default function PlayerTotal(props) {
  const [openStatsInLeagues, setOpenStatesInLeagues] = useState(false);

  const showStatsInleagues = () => {
    setOpenStatesInLeagues(!openStatsInLeagues);
  };

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

          <span className="statsNumber">{props.games}</span>
          <span className="statsNumber">{props.goals + props.assists}</span>
          {props.playerPosition == 0 && (
            <span className="statsNumber">{props.goals}</span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">{props.cleanSheets}</span>
          )}
          <span className="statsNumber">{props.assists}</span>
          <span
            className="statsNumber overall"
            id="rating"
            style={{
              background:
                props.rating <= 6
                  ? "#E03131"
                  : props.rating <= 6.5
                  ? "#FD7E14"
                  : props.rating <= 7
                  ? "#FCC419"
                  : props.rating <= 7.5
                  ? "#66A80F"
                  : props.rating <= 8.5
                  ? "#2B8A3E"
                  : props.rating <= 9
                  ? "#1E88E5"
                  : "#00FF00",
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

import React from "react";
import "./PlayerContainer.css";

export default function PlayerContainer(props) {
  return (
    <>
      <div className="playerContainer">
        <span className="player">{props.playerName}</span>
        <div className="playersStats">
          <span className="statsNumber">
            {props.games} <div className="statsName">Jogos</div>
          </span>
          <span className="statsNumber">
            {props.goals} <div className="statsName">Gols</div>
          </span>
          <span className="statsNumber">
            {props.assists}
            <div className="statsName">Assistencias</div>
          </span>
          {props.playerPosition == 0 && (
            <span className="statsNumber">
              {props.balonDors}
              <div className="statsName">bola de ouro</div>
            </span>
          )}
          {props.playerPosition == 1 && (
            <span className="statsNumber">
              {props.cleanSheets}
              <div className="statsName">jogos sem sofrer gols</div>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

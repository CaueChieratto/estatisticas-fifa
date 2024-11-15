import React from "react";
import "./PlayerContainer.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

export default function PlayerBeforeCarrer(props) {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="seasons">
          historico
          <div className="containerStats">
            <div className="pencil">
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
              <div className="edit">
                <GoPencil />
              </div>
            </div>
            <div className="wrapperNewPlayer">
              <div className="newPlayer">
                <IoAddCircleOutline size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

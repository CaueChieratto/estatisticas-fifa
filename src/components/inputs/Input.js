import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbStars } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";
import { TbSoccerField } from "react-icons/tb";
import { TbShieldCancel } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";

import "./Input.css";

export default function Input(props) {
  const changeValue = (event, input) => {
    const value =
      input === "playerName"
        ? event.target.value
        : Number(event.target.value) || 0;

    switch (input) {
      case "playerName":
        props.setEditedPlayer({ ...props.player, playerName: value });
        break;
      case "games":
        props.setEditedPlayer({ ...props.player, games: value });
        break;
      case "goals":
        props.setEditedPlayer({ ...props.player, goals: value });
        break;
      case "assists":
        props.setEditedPlayer({ ...props.player, assists: value });
        break;
      case "balonDors":
        props.setEditedPlayer({ ...props.player, balonDors: value });
        break;
      case "cleanSheets":
        props.setEditedPlayer({ ...props.player, cleanSheets: value });
        break;
      case "rating":
        props.setEditedPlayer({ ...props.player, rating: value });
        break;
      case "overall":
        props.setEditedPlayer({ ...props.player, overall: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="containerCreateCarrer">
      {!props.showAll && (
        <>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <FaUserCircle size={15} />
            </div>
            <input
              placeholder="Nome do Jogador"
              onChange={(event) => changeValue(event, "playerName")}
              className="inputsCreateCarrer"
              type="text"
              value={props.player.playerName}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <TbStars size={15} />
            </div>
            <input
              placeholder="Overall"
              onChange={(event) => changeValue(event, "overall")}
              className="inputsCreateCarrer"
              type="number"
              value={props.player.overall === 0 ? "" : props.player.overall}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <GiSoccerBall size={15} color="#FFD700" />
            </div>
            <input
              placeholder="Bola de Ouro"
              onChange={(event) => changeValue(event, "balonDors")}
              className="inputsCreateCarrer"
              type="number"
              value={props.player.balonDors === 0 ? "" : props.player.balonDors}
            />
          </div>
        </>
      )}
      {props.showAll && (
        <>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <TbSoccerField size={15} />
            </div>
            <input
              placeholder="Jogos"
              onChange={(event) => changeValue(event, "games")}
              className="inputsCreateCarrer"
              type="number"
              value={props.player.games === 0 ? "" : props.player.games}
            />
          </div>
          {props.playerPosition == 0 && (
            <div className="allInputsCreateCarrer">
              <div className="iconForInputsCreateCarrer">
                <GiSoccerBall size={15} />
              </div>
              <input
                placeholder="Gols"
                onChange={(event) => changeValue(event, "goals")}
                className="inputsCreateCarrer"
                type="number"
                value={props.player.goals === 0 ? "" : props.player.goals}
              />
            </div>
          )}
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <MdPeopleOutline size={15} />
            </div>
            <input
              placeholder="Assitências"
              onChange={(event) => changeValue(event, "assists")}
              className="inputsCreateCarrer"
              type="number"
              value={props.player.assists === 0 ? "" : props.player.assists}
            />
          </div>
          {props.playerPosition == 1 && (
            <div className="allInputsCreateCarrer">
              <div className="iconForInputsCreateCarrer">
                <TbShieldCancel size={15} />
              </div>
              <input
                placeholder="Jogos Sem Sofrer Gols"
                onChange={(event) => changeValue(event, "cleanSheets")}
                className="inputsCreateCarrer"
                type="number"
                value={
                  props.player.cleanSheets === 0 ? "" : props.player.cleanSheets
                }
              />
            </div>
          )}
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <FaStar size={15} />
            </div>
            <input
              placeholder="Nota"
              onChange={(event) => changeValue(event, "rating")}
              className="inputsCreateCarrer"
              type="number"
              value={props.player.rating === 0 ? "" : props.player.rating}
            />
          </div>
        </>
      )}
    </div>
  );
}

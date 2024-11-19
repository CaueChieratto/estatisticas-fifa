import React from "react";
import "./Input.css";

export default function Input(props) {
  const changeValue = (event, input) => {
    const { value } = event.target;
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
    <div className="cardContainer">
      <div className="containerCardModal">
        {!props.showAll && (
          <>
            <div className="allInputs">
              <div className="titleInput">Nome do jogador</div>
              <input
                onChange={(event) => changeValue(event, "playerName")}
                className="inputPlayer"
                type="text"
                value={props.player.playerName}
              />
            </div>
            <div className="allInputs">
              <div className="titleInput">overall</div>
              <input
                onChange={(event) => changeValue(event, "overall")}
                className="inputs"
                type="number"
                value={props.player.overall}
              />
            </div>
            {props.playerPosition == 0 && (
              <div className="allInputs">
                <div className="titleInput">Bolas de Ouro</div>
                <input
                  onChange={(event) => changeValue(event, "balonDors")}
                  className="inputs"
                  type="number"
                  value={props.player.balonDors}
                />
              </div>
            )}
          </>
        )}
        {props.showAll && (
          <>
            <div className="allInputs">
              <div className="titleInput">Jogos</div>
              <input
                onChange={(event) => changeValue(event, "games")}
                className="inputs"
                type="number"
                value={props.player.games}
              />
            </div>
            {props.playerPosition == 0 && (
              <div className="allInputs">
                <div className="titleInput">Gols</div>
                <input
                  onChange={(event) => changeValue(event, "goals")}
                  className="inputs"
                  type="number"
                  value={props.player.goals}
                />
              </div>
            )}
            <div className="allInputs">
              <div className="titleInput">Assistencias</div>
              <input
                onChange={(event) => changeValue(event, "assists")}
                className="inputs"
                type="number"
                value={props.player.assists}
              />
            </div>
            {props.playerPosition == 1 && (
              <div className="allInputs">
                <div className="titleInput">Jogos sem sofrer gols</div>
                <input
                  onChange={(event) => changeValue(event, "cleanSheets")}
                  className="inputs"
                  type="number"
                  value={props.player.cleanSheets}
                />
              </div>
            )}
            <div className="allInputs">
              <div className="titleInput">nota</div>
              <input
                onChange={(event) => changeValue(event, "rating")}
                className="inputs"
                type="number"
                value={props.player.rating}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

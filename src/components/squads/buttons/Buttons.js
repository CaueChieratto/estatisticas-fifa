import React from "react";
import "./Buttons.css";

export default function Buttons(props) {
  return (
    <div className="containerButtonsAddSquad">
      <div className="buttonSquad" onClick={props.abrirBuyPlayers}>
        Contratação
      </div>
      <div
        className="buttonSquad"
        onClick={() => props.handleModoSelecao("venda")}
      >
        Venda
      </div>
      <div
        className="buttonSquad"
        onClick={() => props.handleModoSelecao("renovacao")}
      >
        Renovação
      </div>
    </div>
  );
}

import React from "react";
import "./Input.css";
import ButtonGreen from "../buttons/ButtonGreen.js";

export default function InputsForTransfers(props) {
  return (
    <div className="cardContainer">
      <div className="containerCardModal">
        <div className="allInputs">
          <div className="titleInput">Nome do jogador</div>
          <input className="inputPlayer" type="text" />
        </div>
        <div className="allInputs">
          <div className="titleInput">Idade do Jogador</div>
          <input className="inputPlayer" type="number" />
        </div>
        {props.transferType === "Transferência" && (
          <div className="allInputs">
            <div className="titleInput">Valor da Transferência</div>
            <input className="inputPlayer" type="number" />
          </div>
        )}
        {props.transferType === "Empréstimo" && (
          <div className="allInputs">
            <div className="titleInput">Tempo de Empréstimo</div>
            <input className="inputPlayer" type="text" />
          </div>
        )}
        <div className="allInputs">
          <div className="titleInput">Clube</div>
          <input className="inputPlayer" type="text" />
        </div>
        <div className="allInputs">
          <div className="titleInput">Data da Negociação</div>
          <input className="inputPlayer" type="date" />
        </div>
        <ButtonGreen nameButtonSave="salvar" onClick={props.closeAddPlayer} />
      </div>
    </div>
  );
}

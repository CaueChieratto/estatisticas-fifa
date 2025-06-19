import React from "react";
import { FaCalendar } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { GrMap } from "react-icons/gr";
import { FaTshirt } from "react-icons/fa";

export default function PlayerData(props) {
  return (
    <>
      <div className="cardGeral">
        <div className="containerCardGeral">
          <div className="title">Informações do Jogador</div>
          <div className="containerInfoGeral">
            <div className="containerInfoSquadGeral">
              {props.dadosSquad.nation || "N/A"}
              <span className="numberGeral">
                {props.dadosSquad.playerName || "N/A"}
              </span>
              <div className="iconGeral">
                <FaUserLarge />
              </div>
            </div>
            <div className="containerInfoSquadGeral">
              {props.dadosSquad.detailPosition || "N/A"}
              <span className="numberGeral">Posição</span>{" "}
              <div className="iconGeral">
                <GrMap />
              </div>
            </div>
            <div className="containerInfoSquadGeral">
              {props.dadosSquad.ageRenovacao ?? props.dadosSquad.age ?? "N/A"}
              <span className="numberGeral">Idade</span>{" "}
              <div className="iconGeral">
                <FaCalendar />
              </div>
            </div>
            <div className="containerInfoSquadGeral">
              {props.dadosSquad.shirtNumber || "N/A"}
              <span className="numberGeral">Número da camisa</span>{" "}
              <div className="iconGeral">
                <FaTshirt />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cardGeral">
        <div className="containerCardGeral">
          <div className="title">Informações do Contrato</div>
          <div className="containerInfoGeral contract">
            <div className="containerInfoSquadGeral">
              Valor do Jogador
              <span className="numberGeral">
                €
                {props.dadosSquad.valueRenovacao ??
                  props.dadosSquad.value ??
                  "N/A"}
                M
              </span>
            </div>
            <div className="containerInfoSquadGeral">
              Salário semanal
              <span className="numberGeral">
                {props.dadosSquad.salary || "N/A"}mil
              </span>
            </div>
            <div className="containerInfoSquadGeral">
              Tempo de Contrato
              <span className="numberGeral">
                {props.dadosSquad.contract || "N/A"} anos
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

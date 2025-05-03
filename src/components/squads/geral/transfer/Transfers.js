import React from "react";
import "./Transfers.css";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Transfers(props) {
  const allPlayers = [
    ...(props.squad?.attackers || []),
    ...(props.squad?.midfielders || []),
    ...(props.squad?.defenders || []),
    ...(props.squad?.goalkeepers || []),
    ...(props.squad?.transferList || []),
  ];

  const ultimasChegadas = allPlayers
    .filter((p) => p.buy === true)
    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
    .slice(0, 3);

  const ultimasSaidas = (props.squad?.transferList || [])
    .filter((p) => p.sell === true)
    .sort((a, b) => parseFloat(b.valueTransfer) - parseFloat(a.valueTransfer))
    .slice(0, 3);

  return (
    <>
      <div
        className="containerInfoSquadTransfers"
        onClick={() => props.openModalClick("chegadas")}
      >
        <div style={props.colorArrivals} className="statsPlayer">
          Chegadas
          <span className="iconInfoTransfer">
            <IoMdInformationCircleOutline />
          </span>
        </div>
      </div>
      <div
        className="containerInfoSquadTransfers"
        onClick={() => props.openModalClick("saidas")}
      >
        <div style={props.colorExits} className="statsPlayer">
          Saídas
          <span className="iconInfoTransfer">
            <IoMdInformationCircleOutline />
          </span>
        </div>
      </div>

      <div>
        {ultimasChegadas.map((player, index) => (
          <div className="containerInfoSquadTransfers" key={`chegada-${index}`}>
            <span className="playerName">{player.playerName}</span>
          </div>
        ))}
      </div>

      <div>
        {ultimasSaidas.map((player, index) => (
          <div className="containerInfoSquadTransfers" key={`saida-${index}`}>
            <span className="playerName">{player.playerName}</span>
          </div>
        ))}
      </div>
    </>
  );
}

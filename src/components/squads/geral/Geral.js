import React from "react";
import "./Geral.css";
import InfoSquad from "./infoSquad/InfoSquad.js";
import Transfers from "./transfer/Transfers.js";
import Balance from "./transfer/transfersBalance.js/balance.js";

export default function Geral(props) {
  const colorExits = { color: "#0bb32a" };
  const colorArrivals = { color: "#c81419" };

  return (
    <div className="geral">
      <div className="cardGeral">
        <div className="containerCardGeral">
          <div className="title">Resumo da Equipe</div>
          <div className="containerInfoGeral">
            <InfoSquad squad={props.squad} />
          </div>
        </div>
      </div>
      <div className="cardGeral">
        <div className="containerCardGeral">
          <div className="title">Transferências</div>
          <div className="containerInfoGeral">
            <Transfers
              squad={props.squad}
              modoSelecao={props.modoSelecao}
              openModalTransferGeral={props.openModalTransferGeral}
              openModalClick={props.openModalClick}
              colorExits={colorExits}
              colorArrivals={colorArrivals}
            />
          </div>
        </div>
      </div>
      <div className="cardGeral">
        <div className="containerCardGeral">
          <div className="title">Balanço de transferências</div>
          <div className="containerInfoGeral balance">
            <Balance
              squad={props.squad}
              colorExits={colorExits}
              colorArrivals={colorArrivals}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

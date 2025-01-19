import React from "react";
import "./styleTransfer.css";

export default function Arrivals(props) {
  return (
    <>
      <div className="containerTransfers">
        <div className="containerInfos">
          <div className="infosPlayer">
            <div className="infosTitles">
              {props.playerTransfer}
              <span className="infos">
                <span className="number"> / {props.age} anos</span>
              </span>
            </div>
            <div className="infos infoValues">
              {props.transfer && <div> Transferência: </div>}
              {props.loan && (
                <>
                  <div>
                    Empréstimo:{" "}
                    <span
                      className="number"
                      style={{ color: props.arrival ? "#c81419" : "#0bb32a" }}
                    >
                      {props.loan} meses
                    </span>
                  </div>
                </>
              )}
              {props.endLoan && <div> Fim do Empréstimo </div>}
              {props.numberValue && (
                <span
                  className="number"
                  style={{ color: props.arrival ? "#c81419" : "#0bb32a" }}
                >
                  €{props.value}M
                </span>
              )}
              {!props.numberValue && (
                <span
                  className="number"
                  style={{ color: props.arrival ? "#c81419" : "#0bb32a" }}
                >
                  {props.value}
                </span>
              )}
            </div>
          </div>
          <div className="infosTransfer">
            <div className="infosTitles">{props.team}</div>
            <div className="infos">{props.dataTransfer}</div>
          </div>
        </div>
      </div>
    </>
  );
}

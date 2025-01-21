import React from "react";
import "./styleTransfer.css";

export default function Arrivals(props) {
  const formatarData = (data) => {
    if (!data) return "";
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(dataObj);
  };

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
              {props.endLoan && <div> Fim do Empréstimo </div>}
              {props.transfer && <div> Transferência: </div>}
              {props.loan && (
                <>
                  <div>
                    Empréstimo:{" "}
                    <span
                      className="number"
                      style={{
                        color: props.arrival ? "#c81419" : "#0bb32a",
                        width: "fit-content",
                      }}
                    >
                      {props.loan}
                    </span>
                  </div>
                </>
              )}
              {props.transfer && (
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
            <div className="infos">{formatarData(props.dataTransfer)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

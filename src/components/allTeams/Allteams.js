import React from "react";
import "./StyleAllTeams.css";

export default function Allteams(props) {
  return (
    <>
      {props.club && (
        <>
          <div className="containerAllTeams">
            <span id="listTitle" className="list">
              {props.club}
            </span>
            <div className="containerList">
              <span className="list">
                titulos <div className="numbers">{props.numberTitles}</div>
              </span>
              <span className="list">
                Ligas <div className="numbers">{props.numberLeagues}</div>
              </span>
              <span className="list">
                copas nacionais{" "}
                <div className="numbers">{props.numberCupsNationals}</div>
              </span>
              <span className="list">
                copas internacionais
                <div className="numbers"> {props.numberCupsInternationals}</div>
              </span>
            </div>
            <span id="listData" className="list">
              {props.data}
            </span>
          </div>
        </>
      )}
    </>
  );
}

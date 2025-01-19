import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import "./StyleAllTeams.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Allteams(props) {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleListTitle = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <>
      {props.club && (
        <div className="containerAllTeams">
          <span id="listTitle" className="list" onClick={toggleListTitle}>
            {props.club}{" "}
            <div className="eye">
              {isListOpen ? <GoEye /> : <GoEyeClosed />}
            </div>
          </span>
          {isListOpen && (
            <div className="containerList">
              <span className="list">
                Pais <div className="numbers">{props.nation}</div>
              </span>
              <span className="list">
                Titulos <div className="numbers">{props.numberTitles}</div>
              </span>
              <span className="list">
                Ligas <div className="numbers">{props.numberLeagues}</div>
              </span>
              <span className="list">
                Copas Nacionais{" "}
                <div className="numbers">{props.numberCupsNationals}</div>
              </span>
              <span className="list">
                Copas Internacionais
                <div className="numbers">{props.numberCupsInternationals}</div>
              </span>
              <span id="listData" className="list">
                {props.data ? formatDate(props.data) : "Data não disponível"}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

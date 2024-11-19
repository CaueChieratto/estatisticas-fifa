import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./StyleAllTeams.css";

export default function Allteams(props) {
  const navigate = useNavigate();
  const [isListOpen, setIsListOpen] = useState(false);

  function linkTeams(carrer) {
    navigate("/PageForTeams", { state: { carrer: carrer } });
  }

  const toggleListTitle = () => {
    setIsListOpen((prev) => !prev);
  };

  return (
    <>
      {props.club && (
        <>
          <div className="containerAllTeams">
            <span id="listTitle" className="list" onClick={toggleListTitle}>
              {props.club}{" "}
              {isListOpen ? <FaArrowUp size={18} /> : <FaArrowDown size={18} />}{" "}
            </span>
            {isListOpen && (
              <div
                className="containerList"
                onClick={() => linkTeams(props.carrer)}
              >
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
                  <div className="numbers">
                    {" "}
                    {props.numberCupsInternationals}
                  </div>
                </span>
              </div>
            )}
            <span id="listData" className="list">
              {props.data}
            </span>
          </div>
        </>
      )}
    </>
  );
}

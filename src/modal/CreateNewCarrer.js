import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";

export default function PageForNewCarrer(props) {
  const [carrerData, setCarrerData] = useState({
    uuid: "",
    club: "",
    numberTitles: "",
    numberLeagues: "",
    numberCupsNationals: "",
    numberCupsInternationals: "",
    date: "",
    seasons: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarrerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveCarrer = () => {
    const newId = uuidv4();
    const fifaData = JSON.parse(localStorage.getItem("fifaData")) || {
      carrers: [],
    };
    fifaData.carrers.push({ ...carrerData, uuid: newId });
    localStorage.setItem("fifaData", JSON.stringify(fifaData));
    props.closeNewCarrer();
  };

  return (
    <div onClick={props.closeNewCarrer} className="containerModal">
      <div className="cardModal" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div className="allInputs">
            <div className="titleInput">Clube</div>
            <input
              className="inputs"
              type="text"
              name="club"
              value={carrerData.club}
              onChange={handleChange}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">Titulos</div>
            <input
              className="inputs"
              type="text"
              name="numberTitles"
              value={carrerData.numberTitles}
              onChange={handleChange}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">Ligas</div>
            <input
              className="inputs"
              type="number"
              name="numberLeagues"
              value={carrerData.numberLeagues}
              onChange={handleChange}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">Copas Nacionais</div>
            <input
              className="inputs"
              type="number"
              name="numberCupsNationals"
              value={carrerData.numberCupsNationals}
              onChange={handleChange}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">Copas Internacionais</div>
            <input
              className="inputs"
              type="number"
              name="numberCupsInternationals"
              value={carrerData.numberCupsInternationals}
              onChange={handleChange}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">Data</div>
            <input
              className="inputDate"
              type="date"
              name="date"
              value={carrerData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <ButtonGreen nameButtonSave="Salvar" onClick={saveCarrer} />
      </div>
    </div>
  );
}

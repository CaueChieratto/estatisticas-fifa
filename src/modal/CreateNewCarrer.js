import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";

export default function PageForNewCarrer(props) {
  const [animationClass, setAnimationClass] = useState("slide-in-left");
  const [carrerData, setCarrerData] = useState({
    uuid: "",
    club: "",
    numberTitles: "",
    numberLeagues: "",
    numberCupsNationals: "",
    numberCupsInternationals: "",
    date: "",
    nation: "",
    leagues: [],
    seasons: [],
  });

  const countryLeagues = {
    Espanha: ["La Liga", "La Liga 2", "Copa da Espanha", "Supercopa"],
    Inglaterra: ["Premier League", "FA Cup", "Carabao Cup"],
    Germany: ["Bundesliga", "DFB-Pokal", "Supercup"],
    Italy: ["Serie A", "Coppa Italia", "Supercoppa"],
    France: ["Ligue 1", "Coupe de France", "Trophée des Champions"],
  };

  const globalLeagues = [
    "Champions League",
    "Europa League",
    "Conference League",
    "UEFA Supercup",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCarrerData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "nation") {
        updatedData.leagues = [
          ...(countryLeagues[value] || []),
          ...globalLeagues,
        ];
      }

      return updatedData;
    });
  };

  const saveCarrer = () => {
    if (!carrerData.nation) {
      alert("Por favor, selecione um país antes de salvar.");
      return;
    }

    const newId = uuidv4();
    const fifaData = JSON.parse(localStorage.getItem("fifaData")) || {
      carrers: [],
    };
    fifaData.carrers.push({ ...carrerData, uuid: newId });
    localStorage.setItem("fifaData", JSON.stringify(fifaData));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setAnimationClass("slide-out-left");
    setTimeout(() => {
      props.closeNewCarrer();
    }, 500);
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`containerModalCreateCarrer ${animationClass}`}
    >
      <div onClick={handleCloseModal}>fechar</div>
      <div
        className="cardModalCreateCarrer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerCreateCarrer">
          <div className="allInputs">
            <div className="titleInput">Pais</div>
            <select
              className="inputs"
              name="nation"
              value={carrerData.nation}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um país
              </option>
              <option value="Espanha">Espanha</option>
              <option value="Inglaterra">Inglaterra</option>
              <option value="Germany">Alemanha</option>
              <option value="Italy">Itália</option>
              <option value="France">França</option>
            </select>
          </div>
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

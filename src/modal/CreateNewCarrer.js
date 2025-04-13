import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase.js";
import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IoMdClose } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { PiShieldCheckeredDuotone } from "react-icons/pi";
import { BiFootball } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { GiTrophyCup } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";

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
    Inglaterra: [
      "Premier League",
      "FA Cup",
      "Carabao Cup",
      "EFL Championship",
      "Community Shield",
      "League One",
      "League Two",
      "BSM Trophy",
      "Playoff EFL",
      "Playoff Lg One",
      "Playoff Lg Two",
    ],
    Alemanha: ["Bundesliga", "DFB-Pokal", "Supercup"],
    Italia: ["Serie A", "Coppa Italia", "Supercoppa"],
    Franca: ["Ligue 1", "Coupe de France", "Super Cup"],
    Arabia: ["Saudi Pro League", "Champions Asiatica"],
    Holanda: ["Eredivisie", "Oranje Beker"],
  };

  const globalLeagues = [
    "Champions League",
    "Europa League",
    "Conference League",
    "UEFA Supercup",
    "Lendas do clube",
    "Historico do Jogador",
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

  const saveCarrer = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (!uid) {
      alert("Usuário não está logado.");
      return;
    }

    if (!carrerData.nation) {
      alert("Por favor, selecione um país antes de salvar.");
      return;
    }

    if (!carrerData.club) {
      alert("Por favor, forneça o nome do clube.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `users/${uid}/fifaData`), {
        ...carrerData,
        uuid: uuidv4(),
      });

      const clubName = carrerData.club;

      if (!clubName) {
        console.error("Nome do clube está indefinido.");
        return;
      }

      const newDocRef = doc(db, `users/${uid}/fifaData`, clubName);

      await setDoc(newDocRef, {
        club: carrerData.club,
        date: carrerData.date,
        nation: carrerData.nation,
        numberCupsInternationals: carrerData.numberCupsInternationals,
        numberCupsNationals: carrerData.numberCupsNationals,
        numberLeagues: carrerData.numberLeagues,
        numberTitles: carrerData.numberTitles,
        leagues: carrerData.leagues,
        seasons: carrerData.seasons,
        uuid: uuidv4(),
      });

      await deleteDoc(docRef);

      setCarrerData({ ...carrerData, id: clubName });

      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar carreira:", error);
    }
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
      <div
        className="cardModalCreateCarrer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerHeader">
          <div className="addClub">Adicionar Clube</div>
          <div onClick={handleCloseModal} className="closeModalCreateCarrer">
            <IoMdClose size={25} />
          </div>
        </div>
        <div className="containerCreateCarrer">
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <BiWorld size={15} />
            </div>
            <select
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                marginRight: "4px",
              }}
              className="inputsCreateCarrer"
              name="nation"
              value={carrerData.nation}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um País
              </option>
              <option value="Espanha">Espanha</option>
              <option value="Inglaterra">Inglaterra</option>
              <option value="Alemanha">Alemanha</option>
              <option value="Italia">Itália</option>
              <option value="Franca">França</option>
              <option value="Holanda">Holanda</option>
              <option value="Arabia">Arábia Saudita</option>
            </select>
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <PiShieldCheckeredDuotone size={15} />
            </div>
            <input
              placeholder="Clube"
              className="inputsCreateCarrer"
              type="text"
              name="club"
              value={carrerData.club}
              onChange={handleChange}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <GoTrophy size={15} />
            </div>
            <input
              placeholder="Títulos"
              className="inputsCreateCarrer"
              type="number"
              name="numberTitles"
              value={carrerData.numberTitles}
              onChange={handleChange}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <BiFootball size={15} />
            </div>
            <input
              placeholder="Ligas"
              className="inputsCreateCarrer"
              type="number"
              name="numberLeagues"
              value={carrerData.numberLeagues}
              onChange={handleChange}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <GrTrophy size={15} />
            </div>
            <input
              placeholder="Copas Nacionais"
              className="inputsCreateCarrer"
              type="number"
              name="numberCupsNationals"
              value={carrerData.numberCupsNationals}
              onChange={handleChange}
            />
          </div>
          <div className="allInputsCreateCarrer">
            <div className="iconForInputsCreateCarrer">
              <GiTrophyCup size={15} />
            </div>
            <input
              placeholder="Copas Internacionais"
              className="inputsCreateCarrer"
              type="number"
              name="numberCupsInternationals"
              value={carrerData.numberCupsInternationals}
              onChange={handleChange}
            />
          </div>
          <div
            className="allInputsCreateCarrer"
            onClick={() =>
              document.getElementById("customDateInput").showPicker()
            }
          >
            <div className="iconForInputsCreateCarrer">
              <CiCalendar size={15} />
            </div>
            <input
              id="customDateInput"
              className="inputsCreateCarrer"
              type="date"
              name="date"
              value={carrerData.date}
              onChange={handleChange}
              placeholder="Data"
            />
          </div>
        </div>
        <ButtonGreen nameButtonSaveCarrer="Salvar" onClick={saveCarrer} />
      </div>
    </div>
  );
}

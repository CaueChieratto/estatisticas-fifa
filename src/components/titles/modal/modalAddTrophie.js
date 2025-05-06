import React, { useState } from "react";
import "./modalAddTitles.css";
import ButtonGreen from "../../buttons/ButtonGreen.js";
import { IoMdClose } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { HiOutlineSelector } from "react-icons/hi";
import { db } from "../../../firebase/firebase.js";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ModalAddTrophie(props) {
  const handleLeagueChange = (event) => {
    const selectedLeague = event.target.value;

    const leagueImages = {
      "Champions League": "./trophies/champions.png",
      "Europa League": "./trophies/europaLeague.png",
      "Conference League": "./trophies/conferenceLeague.png",
      "UEFA Supercup": "./trophies/uefaSupercopa.png",

      // espanha
      "La Liga": "./trophies/espanha/laliga.png",
      "La Liga 2": "./trophies/espanha/laliga2.png",
      "Copa da Espanha": "./trophies/espanha/copaDoRey.png",
      Supercopa: "./trophies/espanha/supercopaEspanha.png",

      // inglaterra
      "FA Cup": "./trophies/inglaterra/faCup.png",
      "Carabao Cup": "./trophies/inglaterra/carabao.png",
      "League Two": "./trophies/inglaterra/leagueTwo.png",
      "BSM Trophy": "./trophies/inglaterra/bsm.png",
      "League One": "./trophies/inglaterra/leagueOne.png",
      "EFL Championship": "./trophies/inglaterra/championship.png",
      "Community Shield": "./trophies/inglaterra/supercopa.png",
      "Premier League": "./trophies/inglaterra/premierLeague.png",
    };

    props.setTrophie((prev) => ({
      ...prev,
      league: selectedLeague,
      leagueImage: leagueImages[selectedLeague] || "",
    }));
  };

  const availableLeagues = props.carrer.leagues || [];

  const filteredLeagues = availableLeagues.filter((league) => {
    const normalized = league.trim().toLowerCase();
    return (
      normalized !== "lendas do clube" &&
      normalized !== "historico do jogador" &&
      league !== "Playoff EFL" &&
      league !== "Playoff Lg Two" &&
      league !== "Playoff Lg One"
    );
  });

  const addTrophieToClub = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user?.uid) return;

    const fifaDocRef = doc(db, "users", user.uid, "fifaData", props.carrer.id);
    const fifaDoc = await getDoc(fifaDocRef);

    if (!fifaDoc.exists()) return;

    const fifaData = fifaDoc.data();
    const existingTrophies = fifaData.trophies || [];

    const updatedTrophies = [...existingTrophies];

    const existingIndex = updatedTrophies.findIndex(
      (t) => t.league === props.trophie.league
    );

    if (existingIndex !== -1) {
      const newSeasons = props.trophie.seasons.filter(
        (season) => !updatedTrophies[existingIndex].seasons.includes(season)
      );
      updatedTrophies[existingIndex].seasons.push(...newSeasons);
    } else {
      updatedTrophies.push(props.trophie);
    }

    await updateDoc(fifaDocRef, {
      trophies: updatedTrophies,
    });
    await props.atualizarCarrer();
    props.fecharModalAddTitles();

    props.fecharModalAddTitles();
  };

  const save = () => {
    props.runWithDelayedLoad(async () => {
      if (
        !props.trophie.league ||
        !props.trophie.seasons ||
        props.trophie.seasons.length === 0
      ) {
        alert("Preencha todos os campos!");
        return;
      }

      await addTrophieToClub(props.trophie);

      props.fecharModalAddTitles();
    });
  };

  return (
    <div
      className="containerModalAddTitles"
      onClick={props.fecharModalAddTitles}
    >
      <div className="cardModalAddTitles" onClick={(e) => e.stopPropagation()}>
        <div className="containerHeaderAddTitles">
          <div className="addClubAddTitles">Adicionar Novo Título</div>
          <div
            onClick={props.fecharModalAddTitles}
            className="closeModalAddTitles"
          >
            <IoMdClose size={25} />
          </div>
        </div>
        <div className="allInputsAddTitles">
          <div className="iconForInputsAddTitles">
            <HiOutlineSelector size={15} />
          </div>
          <select
            className="inputsAddTitles"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              marginRight: "4px",
            }}
            name="league"
            value={props.trophie.league}
            onChange={handleLeagueChange}
          >
            <option value="" disabled>
              Selecione uma Liga
            </option>
            {filteredLeagues.map((league, index) => (
              <option key={index} value={league}>
                {league}
              </option>
            ))}
          </select>
        </div>
        <div className="allInputsAddTitles">
          <div className="iconForInputsAddTitles">
            <IoCalendar size={15} />
          </div>
          <input
            placeholder="Temporada"
            className="inputsAddTitles"
            type="text"
            name="season"
            value={props.trophie.seasons[0] || ""}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 4) value = value.slice(0, 4);
              if (value.length > 2)
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
              props.setTrophie((prev) => ({
                ...prev,
                seasons: [value],
              }));
            }}
          />
        </div>
        <ButtonGreen onClick={save} nameButtonAddTitleModal="Salvar" />
      </div>
    </div>
  );
}

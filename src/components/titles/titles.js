import React, { useRef, useEffect, useState } from "react";
import "./titles.css";
import ButtonGreen from "../buttons/ButtonGreen.js";
import ModalAddTrophie from "./modal/modalAddTrophie.js";
import { db } from "../../firebase/firebase.js";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Titles(props) {
  const cardRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openModalAddTitles, setOpenModalAddTitles] = useState(false);

  const abrirModalAddTitles = () => {
    setOpenModalAddTitles(true);
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fecharModalAddTitles = () => {
    setOpenModalAddTitles(false);
    setTrophie({ league: "", seasons: [] });
    document.querySelector(".containerTitles").style.overflowY = "auto";
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    currentY.current = y - startY.current;
    if (currentY.current > 0) {
      setTranslateY(currentY.current);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentY.current > 150) {
      props.closeModalTitles();
    } else {
      setTranslateY(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const [trophie, setTrophie] = useState({
    league: "",
    seasons: [],
  });

  const atualizarCarrer = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user?.uid) return;

    const fifaDocRef = doc(db, "users", user.uid, "fifaData", props.carrer.id);
    const fifaDoc = await getDoc(fifaDocRef);

    if (fifaDoc.exists()) {
      const updatedData = fifaDoc.data();
      props.refreshCarrer({ ...props.carrer, ...updatedData });
    }
  };

  const removeSeasonFromTrophie = async (leagueName, seasonToRemove) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user?.uid) return;

    const fifaDocRef = doc(db, "users", user.uid, "fifaData", props.carrer.id);
    const fifaDoc = await getDoc(fifaDocRef);

    if (!fifaDoc.exists()) return;

    const fifaData = fifaDoc.data();
    const trophies = fifaData.trophies || [];

    const updatedTrophies = trophies
      .map((trophie) => {
        if (trophie.league === leagueName) {
          const filteredSeasons = trophie.seasons.filter(
            (season) => season !== seasonToRemove
          );

          if (filteredSeasons.length === 0) return null;

          return { ...trophie, seasons: filteredSeasons };
        }
        return trophie;
      })
      .filter(Boolean);

    await updateDoc(fifaDocRef, { trophies: updatedTrophies });
    await atualizarCarrer();
  };

  return (
    <>
      {openModalAddTitles && (
        <ModalAddTrophie
          atualizarCarrer={atualizarCarrer}
          trophie={trophie}
          setTrophie={setTrophie}
          carrer={props.carrer}
          fecharModalAddTitles={fecharModalAddTitles}
        />
      )}
      <div className="backgroundModalTitles" onClick={props.closeModalTitles}>
        <div
          ref={cardRef}
          className={`cardModalTitles ${
            !isDragging && translateY === 0 ? "open" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: isDragging ? `translateY(${translateY}px)` : undefined,
            transition: isDragging ? "none" : undefined,
            position: "relative",
          }}
        >
          <div
            className="containerTopModalTitles"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="barContainer">
              <div className="barTitles"></div>
            </div>
          </div>
          <div className="buttonAddTitles">
            <ButtonGreen
              onClick={abrirModalAddTitles}
              nameButtonAddTitle="Adicionar"
            />
          </div>
          <div className="containerTitles">
            {props.carrer.trophies?.map((trophie, index) => (
              <div className="cardTitles" key={index}>
                <div className="headline">
                  {trophie.seasons.length}X CAMPEÃO DA{" "}
                  {trophie.league.toUpperCase()}
                </div>
                <div className="containerInsideCard">
                  <img
                    src={trophie.leagueImage}
                    alt={trophie.league}
                    className="imageTitle"
                  />
                  <div className="seasonThatWon">
                    {trophie.seasons.map((season, idx) => (
                      <span
                        className="infoSeasonWon"
                        key={idx}
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            `Deseja remover a temporada ${season} da ${trophie.league}?`
                          );
                          if (confirmDelete) {
                            removeSeasonFromTrophie(trophie.league, season);
                          }
                        }}
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import "./playerSeason.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FcCalculator } from "react-icons/fc";
import { leagueLevels } from "../../../leaguesAndTrophies/leaguesAndTrophies.js";
import InfoPlayerStats from "./infoPlayerStats/infoPlayerStats";
import PlayerStatsData from "./playerStatsData/playerStatsData";
import PlayerLeaguesWin from "./playerLeaguesWin/playerLeaguesWin";

export default function PlayerSeasons(props) {
  const [openSeasons, setOpenSeasons] = useState([]);

  const toggleVisibility = (leagueImage) => {
    setOpenSeasons((prev) => {
      if (prev.includes(leagueImage)) {
        return prev.filter((id) => id !== leagueImage);
      } else {
        return [...prev, leagueImage];
      }
    });
  };

  const isGoleiro = Number(props.posicao) === 1;

  return (
    <div key={props.temporada.id} className="temporadaCard">
      <InfoPlayerStats
        isGoleiro={isGoleiro}
        temporada={props.temporada}
        formatarTemporada={props.formatarTemporada}
      />
      <div className="containerSeasonPlayerTotal">
        {props.dadosJogador.leagues
          ?.sort((ligaA, ligaB) => {
            const levelA = leagueLevels[ligaA.league] ?? 100;
            const levelB = leagueLevels[ligaB.league] ?? 100;
            return levelA - levelB;
          })
          .map((liga, index) => (
            <div key={index} className="containerTotalStatsPlayer">
              <PlayerStatsData
                toggleVisibility={toggleVisibility}
                temporada={props.temporada}
                formatarTemporada={props.formatarTemporada}
                liga={liga}
                openSeasons={openSeasons}
                isGoleiro={isGoleiro}
                dadosJogador={props.dadosJogador}
              />
              {openSeasons.includes(liga.leagueImage) && (
                <PlayerLeaguesWin
                  formatarTemporada={props.formatarTemporada}
                  temporada={props.temporada}
                  titulosPorTemporada={props.titulosPorTemporada}
                  liga={liga}
                />
              )}
            </div>
          ))}

        <div className="containerTotalStatsPlayer">
          <div
            className="infoStatsPlayerSeason"
            onClick={() => toggleVisibility("titulosTemporada")}
          >
            <div className="containerSeasonAndLeagueImage">
              <div className="seasonLeague">
                <FcCalculator size={20} />
              </div>
              {openSeasons.includes("titulosTemporada") ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </div>
            <div className="containerLeagueStatsPlayer">
              <div className="leagueStats">{props.totaisTemporada.jogos}</div>
              <div className="leagueStats">
                {props.totaisTemporada.gols +
                  props.totaisTemporada.assistencias}
              </div>
              {!isGoleiro && (
                <div className="leagueStats">{props.totaisTemporada.gols}</div>
              )}
              {isGoleiro && (
                <div className="leagueStats">
                  {props.totaisTemporada.cleanSheets}
                </div>
              )}
              <div className="leagueStats">
                {props.totaisTemporada.assistencias}
              </div>
              <div
                className="leagueStats rating"
                style={{
                  background:
                    props.totaisTemporada.rating <= 6
                      ? "#E03131"
                      : props.totaisTemporada.rating <= 6.5
                      ? "#FD7E14"
                      : props.totaisTemporada.rating <= 7
                      ? "#FCC419"
                      : props.totaisTemporada.rating <= 7.5
                      ? "#66A80F"
                      : props.totaisTemporada.rating <= 8.5
                      ? "#2B8A3E"
                      : props.totaisTemporada.rating <= 9
                      ? "#1E88E5"
                      : "#00FF00",
                }}
              >
                {props.totaisTemporada.rating}
              </div>
            </div>
          </div>

          {openSeasons.includes("titulosTemporada") &&
            (() => {
              const temporadaFormatada = props.formatarTemporada(
                Number(props.temporada.season)
              );
              const titulos =
                props.titulosPorTemporada[temporadaFormatada] || [];

              return (
                <div
                  className={
                    titulos.length === 0
                      ? "containerLeaguesWon"
                      : "containerLeaguesWonTotal"
                  }
                >
                  {titulos.length === 0 ? (
                    <h2>Sem títulos nesta temporada</h2>
                  ) : (
                    titulos.map((titulo, index) => (
                      <div key={index} className="TitleWonTotal">
                        <img
                          src={titulo.leagueImage.replace(/^\.\//, "/")}
                          alt={titulo.league}
                          className="imageTitleWonSeason"
                        />
                        <span className="trophyCount">{titulo.league}</span>
                      </div>
                    ))
                  )}
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}

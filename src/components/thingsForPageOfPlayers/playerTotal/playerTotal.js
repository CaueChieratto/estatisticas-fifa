import React, { useState } from "react";
import InfoPlayerStats from "../playerSeasons/infoPlayerStats/infoPlayerStats";
import PlayerStatsTotalData from "./playerStatsTotalData";
import PlayerLeagueWonTotal from "./playerLeagueWonTotal";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function PlayerTotal(props) {
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

  const statsGerais = props.totais;
  const trofeus = props.contagemTitulos;

  const leagueLevels = {
    // Liga nacional
    "La Liga": 1,
    "Premier League": 1,
    Bundesliga: 1,
    "Serie A": 1,
    "Ligue 1": 1,
    "Saudi Pro League": 1,
    Eredivisie: 1,
    SUPERLIGA: 1,

    // Campeonato continental principal
    "Champions League": 2,
    "Champions Asiatica": 2,

    // Copa nacional
    "Copa da Espanha": 3,
    "FA Cup": 3,
    "DFB-Pokal": 3,
    "Coppa Italia": 3,
    "Coupe de France": 3,
    "Oranje Beker": 3,
    "Copa Romena": 3,

    // Supercopa nacional
    Supercopa: 4,
    Supercup: 4,
    Supercoppa: 4,
    "Super Cup": 4,

    // Supercopa europeia
    "UEFA Supercup": 5,

    // Competições continentais inferiores
    "Europa League": 6,
    "Conference League": 7,

    // Copa nacional inferior
    "Carabao Cup": 7,
    "Community Shield": 7,
    "BSM Trophy": 8,

    // Outras divisões
    "La Liga 2": 7,
    "EFL Championship": 7,
    "League One": 8,
    "League Two": 9,
    "Playoff EFL": 10,
    "Playoff Lg One": 11,
    "Playoff Lg Two": 12,
  };

  return (
    <>
      <div className="temporadaCard">
        <InfoPlayerStats isGoleiro={isGoleiro} />
        <div className="containerSeasonPlayerTotal">
          <div className="containerTotalStatsPlayer">
            {Object.entries(props.totaisPorLiga)
              .sort(([ligaA], [ligaB]) => {
                const levelA = leagueLevels[ligaA] ?? 100;
                const levelB = leagueLevels[ligaB] ?? 100;
                return levelA - levelB;
              })
              .map(([liga, dados], index) => (
                <React.Fragment key={index}>
                  <PlayerStatsTotalData
                    toggleVisibility={toggleVisibility}
                    dados={dados}
                    liga={liga}
                    isGoleiro={isGoleiro}
                    openSeasons={openSeasons}
                  />
                  <PlayerLeagueWonTotal
                    openSeasons={openSeasons}
                    liga={liga}
                    contagemTitulos={props.contagemTitulos}
                    dados={dados}
                  />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <div className="temporadaCard">
        <InfoPlayerStats isGoleiro={isGoleiro} total />
        <div className="containerSeasonPlayerTotal">
          <div className="containerTotalStatsPlayer">
            <div
              className="infoStatsPlayerSeason"
              onClick={() => toggleVisibility("geral")}
            >
              <div className="containerSeasonAndLeagueImage">
                <div className="seasonLeague">Total</div>
                {openSeasons.includes("geral") ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>

              <div className="containerLeagueStatsPlayer">
                <div className="leagueStats">{statsGerais.jogos}</div>
                <div className="leagueStats">
                  {statsGerais.gols + statsGerais.assistencias}
                </div>

                {!isGoleiro && (
                  <div className="leagueStats">{statsGerais.gols}</div>
                )}
                {isGoleiro && (
                  <div className="leagueStats">{statsGerais.cleanSheets}</div>
                )}
                <div className="leagueStats">{statsGerais.assistencias}</div>
                <div
                  className="leagueStats rating"
                  style={{
                    background:
                      statsGerais.rating <= 6
                        ? "#E03131"
                        : statsGerais.rating <= 6.5
                        ? "#FD7E14"
                        : statsGerais.rating <= 7
                        ? "#FCC419"
                        : statsGerais.rating <= 7.5
                        ? "#66A80F"
                        : statsGerais.rating <= 8.5
                        ? "#2B8A3E"
                        : statsGerais.rating <= 9
                        ? "#1E88E5"
                        : "#00FF00",
                  }}
                >
                  {statsGerais.rating}
                </div>
              </div>
            </div>
            {openSeasons.includes("geral") && (
              <div
                className={
                  Object.entries(trofeus).length === 0
                    ? "containerLeaguesWon"
                    : "containerLeaguesWonTotal"
                }
              >
                {Object.entries(trofeus).length === 0 ? (
                  <h2>Esse jogador não ganhou títulos</h2>
                ) : (
                  <>
                    {Object.entries(trofeus).map(([nome, info]) => (
                      <div className="TitleWonTotal" key={nome}>
                        <img
                          className="imageTitleWonSeason"
                          src={info.leagueImage.replace(/^\.\//, "/")}
                          alt={nome}
                        />
                        <span className="trophyCount">
                          {info.quantidade} {nome}
                        </span>
                      </div>
                    ))}
                    {statsGerais.balonDors > 0 && (
                      <div className="TitleWonTotal" key="balonDors">
                        <img
                          className="imageTitleWonSeason"
                          src="/bolaDeOuro.jpeg"
                          alt="Balon D'Or"
                        />
                        <span className="trophyCount">
                          {statsGerais.balonDors} Bolas de Ouro
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

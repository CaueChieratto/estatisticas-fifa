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

  return (
    <>
      <div className="temporadaCard">
        <InfoPlayerStats isGoleiro={isGoleiro} />
        <div className="containerSeasonPlayerTotal">
          <div className="containerTotalStatsPlayer">
            {Object.entries(props.totaisPorLiga).map(([liga, dados], index) => (
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
              <div className="containerLeaguesWonTotal">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

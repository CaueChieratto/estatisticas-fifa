import React, { useState } from "react";
import "./playerSeason.css";

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
        {props.dadosJogador.leagues?.map((liga, index) => (
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
      </div>
    </div>
  );
}

import React, { useState } from "react";
import InfoPlayerStats from "../playerSeasons/infoPlayerStats/infoPlayerStats";
import PlayerStatsTotalData from "./playerStatsTotalData";
import PlayerLeagueWonTotal from "./playerLeagueWonTotal";

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

  return (
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
  );
}

import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function PlayerStatsTotalData(props) {
  return (
    <div
      className="infoStatsPlayerSeason"
      onClick={() => props.toggleVisibility(props.dados.leagueImage)}
    >
      <div className="containerSeasonAndLeagueImage">
        <div className="seasonLeague">
          <img
            className="leaguesPlayer"
            src={props.dados.leagueImage.replace(/^\.\//, "/")}
            alt={props.liga}
          />
        </div>
        {props.openSeasons.includes(props.dados.leagueImage) ? (
          <IoIosArrowUp />
        ) : (
          <IoIosArrowDown />
        )}
      </div>
      <div className="containerLeagueStatsPlayer">
        <div className="leagueStats">{props.dados.jogos}</div>
        {!props.isGoleiro && (
          <div className="leagueStats">{props.dados.gols}</div>
        )}
        {props.isGoleiro && (
          <div className="leagueStats">{props.dados.semSoferGols}</div>
        )}
        <div className="leagueStats">{props.dados.assistencias}</div>
        <div
          className="leagueStats rating"
          style={{
            background:
              props.dados.rating <= 6
                ? "#E03131"
                : props.dados.rating <= 6.5
                ? "#FD7E14"
                : props.dados.rating <= 7
                ? "#FCC419"
                : props.dados.rating <= 7.5
                ? "#66A80F"
                : props.dados.rating <= 8.5
                ? "#2B8A3E"
                : props.dados.rating <= 9
                ? "#1E88E5"
                : "#00FF00",
          }}
        >
          {props.dados.rating}
        </div>
        <div className="leagueStats">{props.dados.balonDors}</div>
      </div>
    </div>
  );
}

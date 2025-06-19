import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function PlayerStatsData(props) {
  return (
    <div
      className="infoStatsPlayerSeason"
      onClick={() => props.toggleVisibility(props.liga.leagueImage)}
    >
      <div className="containerSeasonAndLeagueImage">
        <div className="seasonLeague">
          <img
            className="leaguesPlayer"
            src={props.liga.leagueImage.replace(/^\.\//, "/")}
            alt={props.liga.league}
          />
        </div>
        {props.openSeasons.includes(props.liga.leagueImage) ? (
          <IoIosArrowUp />
        ) : (
          <IoIosArrowDown />
        )}
      </div>
      <div className="containerLeagueStatsPlayer">
        <div className="leagueStats">{props.liga.games}</div>
        {!props.isGoleiro && (
          <div className="leagueStats">{props.liga.goals}</div>
        )}
        {props.isGoleiro && (
          <div className="leagueStats">{props.liga.cleanSheets}</div>
        )}
        <div className="leagueStats">{props.liga.assists}</div>
        <div
          className="leagueStats rating"
          style={{
            background:
              props.liga.rating <= 6
                ? "#E03131"
                : props.liga.rating <= 6.5
                ? "#FD7E14"
                : props.liga.rating <= 7
                ? "#FCC419"
                : props.liga.rating <= 7.5
                ? "#66A80F"
                : props.liga.rating <= 8.5
                ? "#2B8A3E"
                : props.liga.rating <= 9
                ? "#1E88E5"
                : "#00FF00",
          }}
        >
          {props.liga.rating}
        </div>
        <div className="leagueStats">{props.dadosJogador.balonDors}</div>
      </div>
    </div>
  );
}

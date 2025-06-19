import React from "react";
import { TbSoccerField } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbShieldCancel } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";

export default function InfoPlayerStats(props) {
  return (
    <div className="containerInfoPlayerStats">
      <div className="containerInfosYearsAndLeagues">
        {props.formatarTemporada && (
          <span>{props.formatarTemporada(Number(props.temporada.season))}</span>
        )}
        {!props.formatarTemporada && !props.total && (
          <span>Total por Liga</span>
        )}
        {!props.formatarTemporada && props.total && <span>História</span>}

        <span></span>
      </div>
      <div className="containerIconsStatsPlayer">
        <span className="iconInfosPlayerStats">
          <TbSoccerField />
        </span>
        {!props.isGoleiro && (
          <span className="iconInfosPlayerStats">
            <GiSoccerBall />
          </span>
        )}
        {props.isGoleiro && (
          <span className="iconInfosPlayerStats">
            <TbShieldCancel />
          </span>
        )}
        <span className="iconInfosPlayerStats">
          <MdPeopleOutline />
        </span>
        <span className="iconInfosPlayerStats" style={{ minWidth: "30px" }}>
          <FaStar />
        </span>
      </div>
    </div>
  );
}

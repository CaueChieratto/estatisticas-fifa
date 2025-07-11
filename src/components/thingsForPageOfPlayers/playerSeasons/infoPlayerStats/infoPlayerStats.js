import React from "react";
import { TbSoccerField } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbShieldCancel } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa6";

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
          <div className="explainIcon hidden">Jogos</div>
          <TbSoccerField />
        </span>
        <span className="iconInfosPlayerStats">
          <div className="explainIcon hidden">Gols + Assistências</div>
          <FaRegHandshake />
        </span>
        {!props.isGoleiro && (
          <span className="iconInfosPlayerStats">
            <div className="explainIcon hidden">Gols</div>
            <GiSoccerBall />
          </span>
        )}
        {props.isGoleiro && (
          <span className="iconInfosPlayerStats">
            <div className="explainIcon hidden">Jogos Sem Sofrer Gols</div>
            <TbShieldCancel />
          </span>
        )}
        <span className="iconInfosPlayerStats">
          <div className="explainIcon hidden">Assistências</div>
          <MdPeopleOutline />
        </span>
        <span className="iconInfosPlayerStats" style={{ minWidth: "30px" }}>
          <div className="explainIcon hidden">Média</div>
          <FaStar />
        </span>
      </div>
    </div>
  );
}

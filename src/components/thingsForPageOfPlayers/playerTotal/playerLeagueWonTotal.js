import React from "react";

export default function PlayerLeagueWonTotal(props) {
  return (
    <>
      {props.openSeasons.includes(props.dados.leagueImage) ? (
        <div className="containerLeaguesWon">
          {props.contagemTitulos[props.liga] ? (
            <div className="TitleWonSeason">
              <img
                src={props.contagemTitulos[props.liga].leagueImage.replace(
                  /^\.\//,
                  "/"
                )}
                alt={props.liga}
                className="imageTitleWonSeason"
              />
              <h2>
                {props.contagemTitulos[props.liga].quantidade}x Campeão da{" "}
                <br /> {props.liga}
              </h2>
            </div>
          ) : (
            <h2>Não ganhou a {props.liga}</h2>
          )}
        </div>
      ) : null}
    </>
  );
}

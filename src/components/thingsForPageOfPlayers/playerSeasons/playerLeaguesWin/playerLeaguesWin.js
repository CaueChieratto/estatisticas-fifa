import React from "react";

export default function PlayerLeaguesWin(props) {
  const temporadaFormatada = props.formatarTemporada(
    Number(props.temporada.season)
  );
  const titulosDaTemporada =
    props.titulosPorTemporada[temporadaFormatada] || [];

  const trofeusDaLiga = titulosDaTemporada.filter((titulo) => {
    return titulo.league.toLowerCase() === props.liga.league.toLowerCase();
  });

  return (
    <div className="containerLeaguesWon">
      {trofeusDaLiga.length > 0 ? (
        trofeusDaLiga.map((titulo, index) => (
          <div key={index} className="TitleWonSeason">
            <img
              src={titulo.leagueImage.replace(/^\.\//, "/")}
              alt={titulo.league}
              className="imageTitleWonSeason"
            />
            <h2>
              Campeão da <br /> {props.liga.league}
            </h2>
          </div>
        ))
      ) : (
        <h2>Não ganhou a {props.liga.league}</h2>
      )}
    </div>
  );
}

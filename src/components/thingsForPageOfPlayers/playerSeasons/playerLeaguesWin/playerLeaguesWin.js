import React from "react";

export default function PlayerLeaguesWin(props) {
  const temporadaFormatada = props.formatarTemporada(
    Number(props.temporada.season)
  );
  const titulosDaTemporada =
    props.titulosPorTemporada[temporadaFormatada] || [];

  const getFileName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  const trofeusDaLiga = titulosDaTemporada.filter((titulo) => {
    const arquivoTitulo = getFileName(titulo.leagueImage).toLowerCase();
    const arquivoLiga = getFileName(props.liga.leagueImage).toLowerCase();
    return arquivoTitulo === arquivoLiga;
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

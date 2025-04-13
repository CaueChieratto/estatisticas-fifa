import React from "react";
import "./StyleAllTeams.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const countryCodes = {
  Espanha: "es",
  Inglaterra:
    "https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg",
  Alemanha: "de",
  Italia: "it",
  Franca: "fr",
  Arabia: "sa",
  Holanda: "nl",
};

export default function Allteams(props) {
  return (
    <>
      {props.club && (
        <div className="containerAllTeams">
          <span className="listTitle">
            {props.club}
            <img
              src={
                countryCodes[props.nation].startsWith("http")
                  ? countryCodes[props.nation]
                  : `https://flagcdn.com/w40/${countryCodes[props.nation]}.png`
              }
              alt={props.nation}
              style={{
                marginLeft: 6,
                width: 21,
                height: 15,
                objectFit: "cover",
              }}
            />
          </span>
          <div className="containerList">
            <div className="containerTitlesCarrer">
              <span className="list">
                Titulos: <div className="numbers">{props.numberTitles}</div>
              </span>
              <span id="listData" className="list">
                {props.data ? formatDate(props.data) : "Data não disponível"}
              </span>
            </div>
            <div className="containerTitlesCarrer">
              <span className="list">
                Ligas: <div className="numbers">{props.numberLeagues}</div>
              </span>
              <span className="list">
                Copas Nacionais:
                <div className="numbers">{props.numberCupsNationals}</div>
              </span>
              <span className="list">
                Copas Internacionais:
                <div className="numbers">{props.numberCupsInternationals}</div>
              </span>
            </div>
          </div>
          <div className="buttonForCarrers">
            <div className="button" onClick={props.linkTeams}>
              Temporadas
            </div>
            <div className="button buttonTwo" onClick={props.showEditCarrer}>
              Editar
            </div>
            <div
              className="button buttonTwo"
              onClick={props.showModalDeleteClub}
            >
              Excluir
            </div>
          </div>
        </div>
      )}
    </>
  );
}

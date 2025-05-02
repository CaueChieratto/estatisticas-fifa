import React from "react";
import "./Header.css";

export default function Header(props) {
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

  return (
    <>
      <div className="containerHeaderSquads">
        <div className="containerHead">
          <div className="club">
            {props.carrer.club.charAt(0).toUpperCase() +
              props.carrer.club.slice(1)}
            <img
              src={
                countryCodes[props.carrer.nation].startsWith("http")
                  ? countryCodes[props.carrer.nation]
                  : `https://flagcdn.com/w80/${
                      countryCodes[props.carrer.nation]
                    }.png`
              }
              alt={props.carrer.nation}
              className="imageNation"
            />
          </div>
          <div className="buttonExitSquad" onClick={props.Back}>
            Voltar
          </div>
        </div>
      </div>
      <div className="containerMenuSquads">
        <div className="menuSquads">
          <div
            className={`optionsInMenu ${
              props.selectedTab === "Wrapper" ? "able" : ""
            }`}
            onClick={() => props.setSelectedTab("Wrapper")}
          >
            Temporadas
          </div>
          <div
            className={`optionsInMenu ${
              props.selectedTab === "Elenco" ? "able" : ""
            }`}
            onClick={() => props.setSelectedTab("Elenco")}
          >
            Elenco
          </div>

          <div
            className={`optionsInMenu ${
              props.selectedTab === "Geral" ? "able" : ""
            }`}
            onClick={() => props.setSelectedTab("Geral")}
          >
            Geral
          </div>
        </div>
      </div>
    </>
  );
}

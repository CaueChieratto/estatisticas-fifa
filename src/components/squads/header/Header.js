import React from "react";
import "./Header.css";
import MenuMovel from "./MenuMovel";

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
  const nationCode = props?.carrer?.nation;
  const flagCode = countryCodes[nationCode];

  return (
    <>
      <div className="containerHeaderSquads">
        <div className="containerHead">
          {props.carrer && (
            <div className="club">
              {props.carrer.club.charAt(0).toUpperCase() +
                props.carrer.club.slice(1)}
              <img
                src={
                  flagCode
                    ? flagCode.startsWith("http")
                      ? flagCode
                      : `https://flagcdn.com/w80/${flagCode}.png`
                    : "https://flagcdn.com/w80/un.png"
                }
                alt={props.carrer.nation}
                className="imageNation"
              />
            </div>
          )}

          {props.jogador && (
            <div>
              <h1>
                {props.jogador?.playerName} {props.maiorOverall}
              </h1>
            </div>
          )}
          <div className="buttonExitSquad" onClick={props.Back}>
            Voltar
          </div>
        </div>
      </div>
      <MenuMovel
        setSelectedTab={props.setSelectedTab}
        selectedTab={props.selectedTab}
        first={props.first}
        firstStyle={props.firstStyle}
        second={props.second}
        secondStyle={props.secondStyle}
        third={props.third}
        thirdStyle={props.thirdStyle}
      />
    </>
  );
}

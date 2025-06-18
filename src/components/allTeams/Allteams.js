import React, { useState, useEffect } from "react";
import "./StyleAllTeams.css";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
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
  const [topScorer, setTopScorer] = useState("");
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalAssists, setTotalAssists] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [topAssists, setTopAssists] = useState("");
  const [topGames, setTopGames] = useState("");
  const [highestBuy, setHighestBuy] = useState({ playerName: "", value: 0 });
  const [highestSell, setHighestSell] = useState({ playerName: "", value: 0 });
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const playerStats = {};

    props.seasons.forEach((season) => {
      season.players.forEach((player) => {
        if (!playerStats[player.playerName]) {
          playerStats[player.playerName] = { goals: 0, assists: 0, games: 0 };
        }

        player.leagues?.forEach((league) => {
          playerStats[player.playerName].goals += parseInt(league.goals) || 0;
          playerStats[player.playerName].assists +=
            parseInt(league.assists) || 0;
          playerStats[player.playerName].games += parseInt(league.games) || 0;
        });
      });
    });

    let maxGoals = 0,
      maxAssists = 0,
      maxGames = 0;
    let topScorerName = "",
      topAssistsName = "",
      topGamesName = "";

    Object.entries(playerStats).forEach(([name, stats]) => {
      if (stats.goals > maxGoals) {
        maxGoals = stats.goals;
        topScorerName = name;
      }
      if (stats.assists > maxAssists) {
        maxAssists = stats.assists;
        topAssistsName = name;
      }
      if (stats.games > maxGames) {
        maxGames = stats.games;
        topGamesName = name;
      }
    });

    setTopScorer(
      topScorerName.charAt(0).toUpperCase() + topScorerName.slice(1)
    );
    setTotalGoals(maxGoals);

    setTopAssists(
      topAssistsName.charAt(0).toUpperCase() + topAssistsName.slice(1)
    );
    setTotalAssists(maxAssists);

    setTopGames(topGamesName.charAt(0).toUpperCase() + topGamesName.slice(1));
    setTotalGames(maxGames);

    let highestBuyLocal = { playerName: "", value: 0 };
    let highestSellLocal = { playerName: "", value: 0 };

    props.carrer.squads?.forEach((squad) => {
      const allPlayers = [
        ...(squad.attackers || []),
        ...(squad.midfielders || []),
        ...(squad.defenders || []),
        ...(squad.goalkeepers || []),
        ...(squad.transferList || []),
      ];

      allPlayers.forEach((player) => {
        if (player.buy) {
          const value = parseFloat(player.value);
          if (value > highestBuyLocal.value) {
            highestBuyLocal = {
              playerName: player.playerName,
              value,
            };
          }
        }

        if (player.sell) {
          const value = parseFloat(player.valueTransfer);
          if (value > highestSellLocal.value) {
            highestSellLocal = {
              playerName: player.playerName,
              value,
            };
          }
        }
      });
    });

    setHighestBuy(highestBuyLocal);
    setHighestSell(highestSellLocal);
  }, [props]);

  const totalSeasons = props.carrer.trophies?.reduce((acc, trophie) => {
    return acc + trophie.seasons.length;
  }, 0);

  const code = countryCodes[props.nation];

  return (
    <>
      {props.club && (
        <div className="containerAllTeams">
          <span className="listTitle">
            <div className="titleCardTeams">
              {props.club.charAt(0).toUpperCase() + props.club.slice(1)}
              <img
                className="imgNationsMedia"
                src={
                  code
                    ? code.startsWith("http")
                      ? code
                      : `https://flagcdn.com/w40/${code}.png`
                    : "https://flagcdn.com/w40/un.png"
                }
                alt={props.nation}
                style={{
                  marginLeft: 6,
                  width: 21,
                  height: 15,
                  objectFit: "cover",
                }}
              />
            </div>
          </span>
          <span className={`listTitleCard ${!showStats ? "border" : ""}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Títulos Totais:
              <div className="numbers">{totalSeasons}</div>
            </div>
            {showStats ? (
              <LuEye
                style={{ cursor: "pointer" }}
                onClick={() => setShowStats(false)}
              />
            ) : (
              <LuEyeClosed
                style={{ cursor: "pointer" }}
                onClick={() => setShowStats(true)}
              />
            )}
          </span>
          {showStats && (
            <div className="containerList">
              <div className="containerTitlesCarrer">
                <span className="list">
                  <div>Mais Jogos </div>
                  <div className="numbers">
                    {topGames}: {totalGames}
                  </div>
                </span>
                <span className="list">
                  <div>Mais Gols </div>
                  <div className="numbers">
                    {topScorer}: {totalGoals}
                  </div>
                </span>
                <span className="list">
                  <div>Mais Assistências </div>
                  <div className="numbers">
                    {topAssists}: {totalAssists}
                  </div>
                </span>
              </div>
              <div className="containerTitlesCarrer">
                <span className="list ">
                  <div>Maior Compra </div>
                  <div className="numbers">
                    {highestBuy.playerName}: €{highestBuy.value}M
                  </div>
                </span>
                <span className="list border">
                  <div>Maior Venda </div>
                  <div className="numbers">
                    {highestSell.playerName}: €{highestSell.value}M
                  </div>
                </span>
              </div>
            </div>
          )}
          {props.data && (
            <div id="listData">Criado em {formatDate(props.data)}</div>
          )}

          <div className="buttonForCarrers">
            <div className="button" onClick={props.linkTeams}>
              Temporadas
            </div>
            <div className="button buttonTwo" onClick={props.openModalTitles}>
              Títulos
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

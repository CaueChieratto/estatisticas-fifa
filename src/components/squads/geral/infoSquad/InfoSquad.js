import React, { useEffect, useState } from "react";
import "./InfoSquad.css";
import { FaUserGroup } from "react-icons/fa6";
import { BsCalendar4 } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";

export default function InfoSquad(props) {
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const squad = props.squad || {
      attackers: [],
      defenders: [],
      goalkeepers: [],
      midfielders: [],
    };

    // Garantir que os arrays existam e são arrays válidos
    const players = [
      ...(Array.isArray(squad.attackers) ? squad.attackers : []),
      ...(Array.isArray(squad.defenders) ? squad.defenders : []),
      ...(Array.isArray(squad.goalkeepers) ? squad.goalkeepers : []),
      ...(Array.isArray(squad.midfielders) ? squad.midfielders : []),
    ];

    setAllPlayers(players);
  }, [props.squad]);

  const countPlayers = () => allPlayers.length;

  const calculateAverageAge = () => {
    if (allPlayers.length === 0) return "0.0";
    const totalAge = allPlayers.reduce(
      (acc, player) => acc + (parseInt(player.age) || 0),
      0
    );
    return (totalAge / allPlayers.length).toFixed(1);
  };

  const calculateTotalSalary = () => {
    if (allPlayers.length === 0) return "0.0";
    const totalSalary = allPlayers.reduce(
      (acc, player) => acc + (parseFloat(player.salary) || 0),
      0
    );
    return (totalSalary / 1000).toFixed(1); // Em milhões
  };

  const calculateTotalValue = () => {
    if (allPlayers.length === 0) return "0.0";
    const totalValue = allPlayers.reduce(
      (acc, player) => acc + (parseFloat(player.value) || 0),
      0
    );
    return totalValue.toFixed(1);
  };

  return (
    <>
      <div className="containerInfoSquadGeral">
        Total de jogadores
        <span className="numberGeral">{countPlayers()}</span>
        <div className="iconGeral">
          <FaUserGroup />
        </div>
      </div>
      <div className="containerInfoSquadGeral">
        Média de idade
        <span className="numberGeral">{calculateAverageAge()}</span>
        <div className="iconGeral">
          <BsCalendar4 />
        </div>
      </div>
      <div className="containerInfoSquadGeral">
        Salários Semanais
        <span className="numberGeral">€{calculateTotalSalary()}M</span>
        <div className="iconGeral">
          <FaHandHoldingUsd />
        </div>
      </div>
      <div className="containerInfoSquadGeral">
        Valor do Plantel
        <span className="numberGeral">€{calculateTotalValue()}M</span>
        <div className="iconGeral">
          <FaMoneyBillWave />
        </div>
      </div>
    </>
  );
}

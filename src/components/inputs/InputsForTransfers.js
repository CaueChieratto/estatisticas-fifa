import React, { useState, useEffect } from "react";
import "./Input.css";
import ButtonGreen from "../buttons/ButtonGreen.js";

export default function InputsForTransfers(props) {
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("fifaData"));
    if (storedData) {
      const currentCarrer = storedData.carrers.find(
        (c) => c.club === props.carrer.club
      );
      if (currentCarrer) {
        const lastTransfer = currentCarrer.transfers?.slice(-1)[0];
        if (lastTransfer) {
          setNewPlayer({
            playerTransfer: lastTransfer.playerTransfer || "",
            age: lastTransfer.age || "",
            value: lastTransfer.value || "",
            team: lastTransfer.team || "",
            dataTransfer: lastTransfer.dataTransfer || "",
          });
        }
      }
    }
  }, [props.carrer.club]);

  const [newPlayer, setNewPlayer] = useState({
    playerTransfer: "",
    age: "",
    value: "",
    team: "",
    dataTransfer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    let transferValue = newPlayer.value;

    if (props.transferType === "Transferência") {
      transferValue = parseFloat(newPlayer.value) || 0;
    } else if (props.transferType === "Empréstimo") {
      transferValue = newPlayer.value || "";
    } else if (props.transferType === "Fim de Empréstimo") {
      transferValue = "endloan";
    }

    const updatedCarrer = props.addPlayerToTransfer({
      carrer: props.carrer,
      seasons: props.seasons,
      seasonId: props.season.id,
      negotiationType: props.negotiationType,
      transferType: props.transferType,
      newPlayer: {
        ...newPlayer,
        value: transferValue,
      },
    });

    const fifaData = JSON.parse(localStorage.getItem("fifaData"));
    const updatedFifaData = {
      ...fifaData,
      carrers: fifaData.carrers.map((c) =>
        c.club === props.carrer.club ? updatedCarrer : c
      ),
    };
    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));

    setNewPlayer({
      playerTransfer: "",
      age: "",
      value: "",
      team: "",
      dataTransfer: "",
    });

    props.updatePage(updatedFifaData);
    props.closeAddPlayer();
  };

  return (
    <div className="cardContainer">
      <div className="containerCardModal">
        <div className="allInputs">
          <div className="titleInput">Nome do jogador</div>
          <input
            className="inputPlayer"
            type="text"
            onChange={handleChange}
            value={newPlayer.playerTransfer}
            name="playerTransfer"
          />
        </div>
        <div className="allInputs">
          <div className="titleInput">Idade do Jogador</div>
          <input
            className="inputPlayer"
            name="age"
            type="number"
            value={newPlayer.age}
            onChange={handleChange}
          />
        </div>
        {props.transferType === "Transferência" && (
          <div className="allInputs">
            <div className="titleInput">Valor da Transferência</div>
            <input
              className="inputPlayer"
              name="value"
              type="number"
              value={newPlayer.value}
              onChange={handleChange}
            />
          </div>
        )}
        {props.transferType === "Empréstimo" && (
          <div className="allInputs">
            <div className="titleInput">Tempo de Empréstimo</div>
            <input
              className="inputPlayer"
              name="value"
              type="text"
              value={newPlayer.value}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="allInputs">
          <div className="titleInput">Clube</div>
          <input
            className="inputPlayer"
            type="text"
            onChange={handleChange}
            value={newPlayer.team}
            name="team"
          />
        </div>
        <div className="allInputs">
          <div className="titleInput">Data da Negociação</div>
          <input
            className="inputPlayer"
            type="date"
            onChange={handleChange}
            value={newPlayer.dataTransfer}
            name="dataTransfer"
          />
        </div>
        <ButtonGreen nameButtonSave="salvar" onClick={handleSave} />
      </div>
    </div>
  );
}

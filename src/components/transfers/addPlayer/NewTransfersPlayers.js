import React, { useState } from "react";
import { SlClose } from "react-icons/sl";
import "./NewTransfer.css";
import InputsForTransfers from "../../inputs/InputsForTransfers";

export default function NewTransfersPlayers(props) {
  const handleOpen = () => {
    setPlayerTransfer({
      arrival: "",
      playerTransfer: "",
      age: "",
      value: 0,
      team: "",
      dataTransfer: "",
    });
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const [negotiationType, setNegotiationType] = useState(0);
  const [transferType, setTransferType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [playerTransfer, setPlayerTransfer] = useState({
    arrival: "",
    playerTransfer: "",
    age: "",
    value: 0,
    team: "",
    dataTransfer: "",
  });

  const inputValue = (e) => {
    setTransferType(e.target.value);
  };

  function addPlayerToTransfer({
    carrer,
    seasons,
    seasonId,
    negotiationType,
    transferType,
    newPlayer,
  }) {
    const updatedSeasons = seasons.map((season) => {
      if (season.id === seasonId) {
        const updatedTransfer = [
          ...season.transfer,
          {
            arrival: negotiationType === 0,
            playerTransfer: newPlayer.playerTransfer,
            age: newPlayer.age,
            value:
              transferType === "Transferência"
                ? newPlayer.value
                : transferType == "Empréstimo"
                ? undefined
                : "endLoan",
            loan:
              transferType === "Empréstimo"
                ? newPlayer.value + " meses"
                : undefined,
            team: newPlayer.team,
            dataTransfer: newPlayer.dataTransfer,
          },
        ];
        return { ...season, transfer: updatedTransfer };
      }
      return season;
    });

    carrer.seasons = updatedSeasons;

    return carrer;
  }

  return (
    <>
      <div className={`containerNewTransfer ${isOpen ? "open" : ""}`}>
        <div onClick={handleClose} className="closeNewTransfer">
          FECHAR
          <span className="iconCloseNewTransfer">
            <SlClose />
          </span>
        </div>
        <div className="containerButtonsTransfers">
          <div
            onClick={() => setNegotiationType(0)}
            className={`buttonNewTransfer ${
              negotiationType == 0 ? "selectedTransfer" : ""
            }`}
          >
            Chegou
          </div>
          <div
            onClick={() => setNegotiationType(1)}
            className={`buttonNewTransfer ${
              negotiationType == 1 ? "selectedTransfer" : ""
            }`}
          >
            Saiu
          </div>
        </div>
        <div className="containerSelectsTransfers">
          <select
            className="selectTransfer"
            name="league"
            value={transferType}
            onChange={inputValue}
            required
          >
            <option className="optionTransfers" value="" disabled>
              Tipo de Negociação
            </option>
            <option className="optionTransfers" value="Transferência">
              Transferência
            </option>
            <option className="optionTransfers" value="Empréstimo">
              Empréstimo
            </option>
            <option className="optionTransfers" value="Fim do Empréstimo">
              Fim do Empréstimo
            </option>
          </select>
        </div>
        <InputsForTransfers
          updatePage={props.updatePage}
          carrer={props.carrer}
          addPlayerToTransfer={addPlayerToTransfer}
          seasons={props.seasons}
          season={props.season}
          negotiationType={negotiationType}
          transferType={transferType}
          closeAddPlayer={handleClose}
        />
      </div>
      <div className="addPlayer" onClick={handleOpen}>
        Adicionar Jogadores
      </div>
    </>
  );
}

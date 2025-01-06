import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";

export default function PageForNewCarrer(props) {
  const [editedCarrer, setEditedCarrer] = useState(props.carrer);

  const changeValueCarrer = (event, input) => {
    const newValue = Number(event.target.value);

    const updatedCarrer = { ...editedCarrer, [input]: newValue };

    updatedCarrer.numberTitles =
      (Number(updatedCarrer.numberLeagues) || 0) +
      (Number(updatedCarrer.numberCupsNationals) || 0) +
      (Number(updatedCarrer.numberCupsInternationals) || 0);

    setEditedCarrer(updatedCarrer);
  };

  const saveChanges = () => {
    props.onSave(editedCarrer);
    props.closeEditCarrer();
  };

  return (
    <div onClick={props.closeEditCarrer} className="containerModal">
      <div className="cardModalEditCarrer" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div className="allInputs">
            <div className="titleInput">ligas</div>
            <input
              onChange={(event) => changeValueCarrer(event, "numberLeagues")}
              className="inputs"
              type="number"
              value={editedCarrer.numberLeagues}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">copas nacionais</div>
            <input
              onChange={(event) =>
                changeValueCarrer(event, "numberCupsNationals")
              }
              className="inputs"
              type="number"
              value={editedCarrer.numberCupsNationals}
            />
          </div>
          <div className="allInputs">
            <div className="titleInput">copas internacionais</div>
            <input
              onChange={(event) =>
                changeValueCarrer(event, "numberCupsInternationals")
              }
              className="inputs"
              type="number"
              value={editedCarrer.numberCupsInternationals}
            />
          </div>
        </div>
        <ButtonGreen nameButtonSave="Salvar" onClick={saveChanges} />
      </div>
    </div>
  );
}

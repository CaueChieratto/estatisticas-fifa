import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";

export default function PageForNewCarrer(props) {
  const [editedCarrer, setEditedCarrer] = useState(props.carrer);

  const changeValueCarrer = (event, input) => {
    const { value } = event.target;
    switch (input) {
      case "numberTitles":
        setEditedCarrer({ ...editedCarrer, numberTitles: value });
        break;
      case "numberLeagues":
        setEditedCarrer({ ...editedCarrer, numberLeagues: value });
        break;
      case "numberCupsNationals":
        setEditedCarrer({ ...editedCarrer, numberCupsNationals: value });
        break;
      case "numberCupsInternationals":
        setEditedCarrer({
          ...editedCarrer,
          numberCupsInternationals: value,
        });
        break;
      default:
        break;
    }
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
            <div className="titleInput">titulos</div>
            <input
              onChange={(event) => changeValueCarrer(event, "numberTitles")}
              className="inputs"
              type="number"
              value={editedCarrer.numberTitles}
            />
          </div>
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

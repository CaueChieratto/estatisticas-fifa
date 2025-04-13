import React, { useState } from "react";
import ButtonGreen from "../components/buttons/ButtonGreen.js";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { GiTrophyCup } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";

export default function PageForNewCarrer(props) {
  const [editedCarrer, setEditedCarrer] = useState({
    ...props.carrer,
    numberLeagues: props.carrer?.numberLeagues || "",
    numberCupsNationals: props.carrer?.numberCupsNationals || "",
    numberCupsInternationals: props.carrer?.numberCupsInternationals || "",
  });

  const changeValueCarrer = (event, input) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    const updatedCarrer = { ...editedCarrer, [input]: value };

    updatedCarrer.numberTitles =
      (Number(updatedCarrer.numberLeagues) || 0) +
      (Number(updatedCarrer.numberCupsNationals) || 0) +
      (Number(updatedCarrer.numberCupsInternationals) || 0);

    setEditedCarrer(updatedCarrer);
  };

  const saveChanges = () => {
    const updatedCarrer = {
      ...editedCarrer,
      numberTitles:
        (Number(editedCarrer.numberLeagues) || 0) +
        (Number(editedCarrer.numberCupsNationals) || 0) +
        (Number(editedCarrer.numberCupsInternationals) || 0),
    };
    props.onSave(updatedCarrer);
    props.closeEditCarrer();
  };

  return (
    <div onClick={props.closeEditCarrer} className="containerModal">
      <div className="cardModalEdit" onClick={(e) => e.stopPropagation()}>
        <div className="containerHeader">
          <div className="addClub">Editar Títulos</div>
          <div
            onClick={props.closeEditCarrer}
            className="closeModalCreateCarrer"
          >
            <IoMdClose size={25} />
          </div>
        </div>
        <div className="allInputsEditCarrer">
          <div className="iconForInputsCreateCarrer">
            <BiFootball size={15} />
          </div>
          <input
            placeholder="Ligas"
            onChange={(event) => changeValueCarrer(event, "numberLeagues")}
            className="inputsCreateCarrer"
            type="number"
            value={editedCarrer.numberLeagues}
          />
        </div>
        <div className="allInputsEditCarrer">
          <div className="iconForInputsCreateCarrer">
            <GrTrophy size={15} />
          </div>
          <input
            placeholder="Copas Nacionais"
            onChange={(event) =>
              changeValueCarrer(event, "numberCupsNationals")
            }
            className="inputsCreateCarrer"
            type="number"
            value={editedCarrer.numberCupsNationals}
          />
        </div>
        <div className="allInputsEditCarrer">
          <div className="iconForInputsCreateCarrer">
            <GiTrophyCup size={15} />
          </div>
          <input
            placeholder="Copas Internacionais"
            onChange={(event) =>
              changeValueCarrer(event, "numberCupsInternationals")
            }
            className="inputsCreateCarrer"
            type="number"
            value={editedCarrer.numberCupsInternationals}
          />
        </div>
        <ButtonGreen nameButtonSaveCarrer="Salvar" onClick={saveChanges} />
      </div>
    </div>
  );
}

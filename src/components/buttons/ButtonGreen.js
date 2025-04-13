import React from "react";
import "./ButtonGreen.css";
import "../EmptyCareers/EmptyCareers.css";
import { GoPlus } from "react-icons/go";

export default function buttonNewCarrer(props) {
  return (
    <>
      {props.nameButtonNewCarrer && (
        <button onClick={props.onClick} className="new-career-btn">
          {props.nameButtonNewCarrer}
        </button>
      )}
      {props.nameButtonNewCarrerWithCarrer && (
        <button onClick={props.onClick} className="new-career-btn1">
          <div className="plus">
            <GoPlus size={15} />
          </div>
          {props.nameButtonNewCarrerWithCarrer}
        </button>
      )}
      {props.nameButtonSave && (
        <div onClick={props.onClick} className="buttonSave">
          {props.nameButtonSave}
        </div>
      )}
      {props.nameButtonSaveCarrer && (
        <button onClick={props.onClick} className="buttonSaveCarrer">
          {props.nameButtonSaveCarrer}
        </button>
      )}
      {props.newPlayer && (
        <div onClick={props.onClick} className="buttonNewCarrer">
          {props.newPlayer}
        </div>
      )}
    </>
  );
}

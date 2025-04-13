import React from "react";
import "./ButtonGreen.css";
import "../EmptyCareers/EmptyCareers.css";
import { GoPlus } from "react-icons/go";
import { MdOutlinePostAdd } from "react-icons/md";

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
      {props.nameButtonNewSeason && (
        <button onClick={props.onClick} className="new-career-btn3">
          <div style={{ height: "20px" }}>
            <MdOutlinePostAdd size={20} />
          </div>
          {props.nameButtonNewSeason}
        </button>
      )}
      {props.nameButtonExit && (
        <button onClick={props.onClick} className="new-career-btn2">
          {props.nameButtonExit}
        </button>
      )}
      {props.nameButtonSaveCarrer && (
        <button onClick={props.onClick} className="buttonSaveCarrer">
          {props.nameButtonSaveCarrer}
        </button>
      )}
      {props.nameButtonSave && (
        <div onClick={props.onClick} className="buttonSave">
          {props.nameButtonSave}
        </div>
      )}
    </>
  );
}

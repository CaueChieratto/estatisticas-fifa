import React from "react";
import "./ButtonGreen.css";
import "../EmptyCareers/EmptyCareers.css";
import { MdOutlinePostAdd } from "react-icons/md";
import { GiTrophiesShelf } from "react-icons/gi";

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
          {props.nameButtonNewCarrerWithCarrer}
        </button>
      )}
      {props.nameButtonAddTitle && (
        <button onClick={props.onClick} className="new-career-btn4">
          {props.nameButtonAddTitle}
          <div className="plus">
            <GiTrophiesShelf size={15} />
          </div>
        </button>
      )}
      {props.nameButtonAddTitleModal && (
        <button onClick={props.onClick} className="new-career-btn5">
          {props.nameButtonAddTitleModal}
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
      {props.nameButtonSaveCarrerBack && (
        <button onClick={props.onClick} className="buttonSaveCarrerBack">
          {props.nameButtonSaveCarrerBack}
        </button>
      )}
    </>
  );
}

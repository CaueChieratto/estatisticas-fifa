import React from "react";
import "./ButtonGreen.css";

export default function buttonNewCarrer(props) {
  return (
    <>
      {props.nameButtonNewCarrer && (
        <div className="buttonBackground">
          <div onClick={props.onClick} className="textButton">
            {props.nameButtonNewCarrer}
          </div>
        </div>
      )}
      {props.nameButtonSave && (
        <div onClick={props.onClick} className="buttonSave">
          {props.nameButtonSave}
        </div>
      )}
      {props.newPlayer && (
        <div onClick={props.onClick} className="buttonNewCarrer">
          {props.newPlayer}
        </div>
      )}
    </>
  );
}

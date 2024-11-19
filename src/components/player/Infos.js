import React from "react";
import "./PlayerContainer.css";
import { TbSoccerField } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbShieldCancel } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";
import { BsFillClipboard2PulseFill } from "react-icons/bs";

export default function Infos(props) {
  return (
    <div className="infosTitle">
      <div className="containerName">
        <span className="player">{props.playerName}</span>
      </div>
      <span className="statsNumber">
        <BsFillClipboard2PulseFill />
      </span>
      <span className="statsNumber">
        <TbSoccerField />
      </span>
      <span className="statsNumber">
        <GiSoccerBall />
      </span>
      <span className="statsNumber">
        <MdPeopleOutline />
      </span>
      <span className="statsNumber">
        <FaStar />
      </span>
      {props.playerPosition == 0 && (
        <span className="statsNumber">
          <GiSoccerBall color="#FFD700" />
        </span>
      )}
      {props.playerPosition == 1 && (
        <span className="statsNumber">
          <TbShieldCancel />
        </span>
      )}
    </div>
  );
}

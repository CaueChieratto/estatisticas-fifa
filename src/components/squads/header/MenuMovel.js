import React from "react";
import "./Header.css";

export default function MenuMovel(props) {
  return (
    <div className="containerMenuSquads">
      <div className="menuSquads">
        <div
          className={`optionsInMenu ${
            props.selectedTab === `${props.firstStyle}` ? "able" : ""
          }`}
          onClick={() => props.setSelectedTab(`${props.firstStyle}`)}
        >
          {props.first}
        </div>
        <div
          className={`optionsInMenu ${
            props.selectedTab === `${props.secondStyle}` ? "able" : ""
          }`}
          onClick={() => props.setSelectedTab(`${props.secondStyle}`)}
        >
          {props.second}
        </div>

        <div
          className={`optionsInMenu ${
            props.selectedTab === `${props.thirdStyle}` ? "able" : ""
          }`}
          onClick={() => props.setSelectedTab(`${props.thirdStyle}`)}
        >
          {props.third}
        </div>
      </div>
    </div>
  );
}

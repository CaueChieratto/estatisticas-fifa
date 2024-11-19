import React from "react";

export default function StatsLeagues(props) {
  return (
    <>
      <div className="wrapperStatsLeagues">
        <div className="containerIMGleagues">
          <img className="leagues" src="/laliga.png" />
          la liga
        </div>
        <span className="statsNumber">34</span>
        <span className="statsNumber">40</span>
        <span className="statsNumber">26</span>
        <span className="statsNumber" id="rating">
          9.8
        </span>
        {props.playerPosition == 1 && <span className="statsNumber">27</span>}
      </div>
      <div className="wrapperStatsLeagues">
        <div className="containerIMGleagues">
          <img className="leagues" src="/champions.png" />
          champions league
        </div>
        <span className="statsNumber">13</span>
        <span className="statsNumber">12</span>
        <span className="statsNumber">2</span>
        <span className="statsNumber" id="rating">
          10
        </span>
        {props.playerPosition == 1 && <span className="statsNumber">27</span>}
      </div>
      <div className="wrapperStatsLeagues">
        <div className="containerIMGleagues">
          <img className="leagues" src="/copaDoRey.png" />
          copa do rey
        </div>
        <span className="statsNumber">6</span>
        <span className="statsNumber">4</span>
        <span className="statsNumber">6</span>
        <span className="statsNumber" id="rating">
          9.6
        </span>
        {props.playerPosition == 1 && <span className="statsNumber">27</span>}
      </div>
    </>
  );
}

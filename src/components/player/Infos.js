import { React, useState } from "react";
import "./PlayerContainer.css";
import { TbSoccerField } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbShieldCancel } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";
import { RiCloseCircleLine } from "react-icons/ri";
import DeleteSeason from "../../modal/DeleteSeason";

export default function Infos(props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [seasonToDelete, setSeasonToDelete] = useState(null);

  const showModalDelete = (season) => {
    setSeasonToDelete(season);
    setOpenDelete(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalDelete = () => {
    setOpenDelete(false);
    document.body.style.overflowY = "auto";
  };

  const handleDelete = () => {
    if (!props.season || !props.season.players) {
      console.error("A temporada ou os jogadores não estão definidos.");
      return;
    }

    const updatedPlayers = props.season.players.filter(
      (player) => player.playerName !== props.playerName
    );

    const updatedSeason = {
      ...props.season,
      players: updatedPlayers,
    };

    const updatedSeasons = props.seasons.map((season) =>
      season.id === updatedSeason.id ? updatedSeason : season
    );

    props.setSeasons(updatedSeasons);

    const updatedCarrer = { ...props.carrer, seasons: updatedSeasons };
    const fifaData = JSON.parse(localStorage.getItem("fifaData"));
    const updatedFifaData = {
      ...fifaData,
      carrers: fifaData.carrers.map((c) =>
        c.club === props.carrer.club ? updatedCarrer : c
      ),
    };

    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
  };

  return (
    <div className="infosTitle">
      <div className="containerName">
        <span className="player">
          {props.playerName}
          <div>{props.overall}</div>
          {props.show && (
            <div onClick={showModalDelete}>
              <RiCloseCircleLine />
            </div>
          )}
        </span>
      </div>
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
      {openDelete && (
        <DeleteSeason
          textDelete="apagar jogador"
          delete={handleDelete}
          closeModalDelete={closeModalDelete}
        ></DeleteSeason>
      )}
    </div>
  );
}

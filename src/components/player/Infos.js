import { React, useState, useEffect } from "react";
import "./PlayerContainer.css";
import { TbSoccerField } from "react-icons/tb";
import { MdPeopleOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbShieldCancel } from "react-icons/tb";
import { GiSoccerBall } from "react-icons/gi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import DeleteSeason from "../../modal/DeleteSeason";
import { db } from "../../firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Infos(props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [seasonToDelete, setSeasonToDelete] = useState(null);
  const [lastOpenedSection, setLastOpenedSection] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (props.openedSection) {
      setLastOpenedSection(props.openedSection);
    }
  }, [props.openedSection]);

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
      setTimeout(() => {
        localStorage.removeItem("scrollPosition");
      }, 2000);
    }
  }, []);

  function linkPlayer() {
    localStorage.setItem("scrollPosition", window.scrollY);
    localStorage.setItem("openSectionOnReturn", "total");
    console.log("section being saved:", lastOpenedSection);
    navigate(`/PageForPlayer/${encodeURIComponent(props.playerName)}`, {
      state: {
        jogador: props.player,
        carrer: props.carrer,
      },
    });
  }

  const showModalDelete = (season) => {
    setSeasonToDelete(season);
    setOpenDelete(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalDelete = () => {
    setOpenDelete(false);
    document.body.style.overflowY = "auto";
  };

  const handleDelete = async () => {
    if (!props.season || !props.season.players) {
      console.error("A temporada ou os jogadores não estão definidos.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user?.uid) {
        console.error("Usuário não autenticado.");
        return;
      }

      const carrerRef = doc(db, "users", user.uid, "fifaData", props.carrer.id);
      const carrerSnap = await getDoc(carrerRef);

      if (carrerSnap.exists()) {
        const carrerData = carrerSnap.data();

        const updatedPlayers = props.season.players.filter(
          (player) => player.playerName !== props.playerName
        );

        const updatedSeason = {
          ...props.season,
          players: updatedPlayers,
        };

        const updatedSeasons = carrerData.seasons.map((season) =>
          season.id === updatedSeason.id ? updatedSeason : season
        );

        await updateDoc(carrerRef, { seasons: updatedSeasons });

        props.setSeasons(updatedSeasons);
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao deletar jogador: ", error);
    }
  };

  return (
    <div
      className="infosTitle"
      onClick={props.total ? () => linkPlayer() : undefined}
      style={props.total ? { cursor: "pointer" } : undefined}
    >
      <div className="containerName">
        <span className="player">
          {props.playerName.charAt(0).toUpperCase() + props.playerName.slice(1)}
          <div
            style={{
              color:
                props.overall <= 55
                  ? "#E03131"
                  : props.overall <= 60
                  ? "#FD7E14"
                  : props.overall <= 70
                  ? "#FCC419"
                  : props.overall <= 80
                  ? "#66a80f"
                  : props.overall <= 89
                  ? "#2B8A3E"
                  : props.overall > 95
                  ? "#00FF00"
                  : "#1E88E5",
              fontSize: "12px",
            }}
          >
            {props.overall}
          </div>
          {props.show && (
            <div onClick={showModalDelete} style={{ height: "14px" }}>
              <RiCloseCircleLine />
            </div>
          )}
        </span>
      </div>
      <span className="statsNumber">
        <div className="explainIcons hidden">Jogos</div>
        <TbSoccerField />
      </span>

      <span className="statsNumber">
        <div className="explainIcons hidden">Gols + Assistências</div>
        <FaRegHandshake />
      </span>
      {props.playerPosition == 0 && (
        <span className="statsNumber">
          <div className="explainIcons hidden">Gols</div>
          <GiSoccerBall />
        </span>
      )}
      {props.playerPosition == 1 && (
        <span className="statsNumber">
          <div className="explainIcons hidden">Jogos Sem Sofrer Gols</div>
          <TbShieldCancel />
        </span>
      )}
      <span className="statsNumber">
        <div className="explainIcons hidden">Assistências</div>
        <MdPeopleOutline />
      </span>
      <span className="statsNumber">
        <div className="explainIcons hidden">Média</div>
        <FaStar />
      </span>
      <span className="statsNumber">
        <div className="explainIconBallonDor hidden">Bola de Ouro</div>
        <GiSoccerBall color="#FFD700" />
      </span>
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

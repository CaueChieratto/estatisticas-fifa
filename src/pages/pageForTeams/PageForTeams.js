import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StyleTeams.css";
import ButtonGreen from "../../components/buttons/ButtonGreen";
import { IoAddCircleOutline } from "react-icons/io5";
import PlayerContainer from "../../components/player/PlayerContainer";
import Total from "../../components/player/Total.js";
import NewPlayerModal from "../../modal/NewPlayerModal.js";
import DeleteSeason from "../../modal/DeleteSeason.js";
import { MdOutlinePostAdd } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import EditPlayers from "../../modal/EditPlayer.js";
import { RiCloseCircleLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Infos from "../../components/player/Infos.js";
import { CgCloseR } from "react-icons/cg";
import Transfers from "../../components/transfers/Transfers.js";

export default function PageForTeams() {
  const location = useLocation();
  const { carrer } = location.state || {};
  const navigate = useNavigate();

  const [seasons, setSeasons] = useState(carrer.seasons || []);
  const [historicPlayers, setHistoricPlayers] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("fifaData"));
    if (storedData) {
      const currentCarrer = storedData.carrers.find(
        (c) => c.club === carrer.club
      );
      if (currentCarrer) setSeasons(currentCarrer.seasons);
    }
  }, [carrer.club]);

  function Save() {
    const updatedCarrer = { ...carrer, seasons };
    const fifaData = JSON.parse(localStorage.getItem("fifaData"));
    const updatedFifaData = {
      ...fifaData,
      carrers: fifaData.carrers.map((c) =>
        c.club === carrer.club ? updatedCarrer : c
      ),
    };
    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
    navigate("/");
  }

  const addSeason = () => {
    const newSeason = {
      id: uuidv4(),
      season: seasons.length - 1 + 1,
      players: [],
      transfer: [],
    };
    const updatedSeasons = [...seasons, newSeason];
    setSeasons(updatedSeasons);

    const updatedCarrer = { ...carrer, seasons: updatedSeasons };
    const fifaData = JSON.parse(localStorage.getItem("fifaData"));
    const updatedFifaData = {
      ...fifaData,
      carrers: fifaData.carrers.map((c) =>
        c.club === carrer.club ? updatedCarrer : c
      ),
    };
    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
  };

  const [openStats, setOpenStats] = useState(false);
  const [player, setPlayer] = useState({});
  const [season, setSeason] = useState({});

  const showStats = (player, season) => {
    setSeason(season);
    setPlayer(player);
    setOpenStats(true);
    document.body.style.overflowY = "hidden";
  };
  const closeStats = () => {
    setOpenStats(false);
    document.body.style.overflowY = "auto";
  };

  const [newPlayer, setNewPlayer] = useState({});
  const [openNewStats, setOpenNewStats] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const showNewPlayer = (season) => {
    if (selectedSeason === season && openNewStats) {
      setOpenNewStats(false);
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
      setOpenNewStats(true);
    }
  };

  const closeNewPlayer = () => {
    setOpenNewStats(false);
  };

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

  const deleteSeason = () => {
    if (seasonToDelete) {
      const updatedSeasons = seasons.filter(
        (season) => season.season !== seasonToDelete.season
      );

      setSeasons(updatedSeasons);
      const updatedCarrer = { ...carrer, seasons: updatedSeasons };
      const fifaData = JSON.parse(localStorage.getItem("fifaData"));
      const updatedFifaData = {
        ...fifaData,
        carrers: fifaData.carrers.map((c) =>
          c.club === carrer.club ? updatedCarrer : c
        ),
      };
      localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));

      closeModalDelete();
    }
  };

  const addPlayerToSeason = (newPlayer, seasonNumber) => {
    const playerWithId = { ...newPlayer, id: uuidv4() };
    const updatedSeasons = [...seasons];
    const seasonIndex = updatedSeasons.findIndex(
      (season) => season.season === seasonNumber
    );

    if (seasonIndex !== -1) {
      const playerExists = updatedSeasons[seasonIndex].players.some(
        (player) => player.playerName === newPlayer.playerName
      );

      if (playerExists) {
        alert("Este jogador já existe na temporada.");
        return;
      }

      updatedSeasons[seasonIndex].players.push(newPlayer);
      setSeasons(updatedSeasons);

      const updatedHistoric = historicPlayers.filter(
        (player) => player.id !== playerWithId.id
      );
      setHistoricPlayers(updatedHistoric);

      const updatedCarrer = { ...carrer, seasons: updatedSeasons };
      const fifaData = JSON.parse(localStorage.getItem("fifaData"));
      const updatedFifaData = {
        ...fifaData,
        carrers: fifaData.carrers.map((c) =>
          c.club === carrer.club ? updatedCarrer : c
        ),
      };
      localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
    }
  };

  const saveEditedPlayer = (editedPlayer, seasonNumber) => {
    const updatedSeasons = [...seasons];

    const seasonIndex = updatedSeasons.findIndex((season) => {
      if (season.season === seasonNumber) {
        return season.players.some(
          (p) => p.playerName === editedPlayer.playerName
        );
      }
    });

    if (seasonIndex !== -1) {
      const playerIndex = updatedSeasons[seasonIndex].players.findIndex(
        (p) => p.playerName === editedPlayer.playerName
      );

      if (playerIndex !== -1) {
        updatedSeasons[seasonIndex].players[playerIndex] = editedPlayer;
        setSeasons(updatedSeasons);

        const updatedCarrer = { ...carrer, seasons: updatedSeasons };
        const fifaData = JSON.parse(localStorage.getItem("fifaData"));
        const updatedFifaData = {
          ...fifaData,
          carrers: fifaData.carrers.map((c) =>
            c.club === carrer.club ? updatedCarrer : c
          ),
        };
        localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
      }
    }
  };

  const updatePage = (fifaData) => {
    const currentCarrer = fifaData.carrers.find((c) => c.club === carrer.club);
    if (currentCarrer) setSeasons(currentCarrer.seasons);
  };

  const [openSeasons, setOpenSeasons] = useState([]);

  const toggleVisibility = (seasonId) => {
    if (openStats || openNewStats || openDelete) return;

    setOpenSeasons((prev) => {
      if (prev.includes(seasonId)) {
        return prev.filter((id) => id !== seasonId);
      } else {
        return [...prev, seasonId];
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        {seasons.map((season) => (
          <div className="container" key={season.id}>
            <div
              className="deleteButton"
              onClick={() => showModalDelete(season)}
            >
              <RiCloseCircleLine />
            </div>
            <div className="seasons">
              <div
                className="openSeasons"
                onClick={() => toggleVisibility(season.id)}
              >
                Temporada {season.season}
                {openSeasons.includes(season.id) ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDown />
                )}
              </div>
              <div
                className={`containerStats ${
                  openSeasons.includes(season.id) ? "visible" : "hidden"
                }`}
              >
                {season.players.map((player) => (
                  <div
                    key={
                      player.id +
                      player.playerName +
                      player.position +
                      player.games +
                      player.goals +
                      player.assists +
                      player.balonDors +
                      player.cleanSheets
                    }
                  >
                    <div className="classForPencilEdit">
                      <div
                        className="edit"
                        onClick={() => showStats(player, season.season)}
                      >
                        <GoPencil />
                      </div>
                    </div>
                    <div className="wrapperInfos">
                      <Infos
                        show={true}
                        overall={player.overall}
                        playerName={player.playerName}
                        playerPosition={player.position}
                        season={season}
                        seasons={seasons}
                        setSeasons={setSeasons}
                        carrer={carrer}
                      />
                    </div>
                    <div className="pencil">
                      <PlayerContainer
                        updatePage={updatePage}
                        total
                        playerPosition={player.position}
                        games={player.games}
                        goals={player.goals}
                        assists={player.assists}
                        rating={player.rating}
                        nation={carrer.nation}
                        overall={player.overall}
                        balonDors={player.balonDors}
                        cleanSheets={player.cleanSheets}
                        carrer={carrer}
                        season={season}
                        player={player}
                      />
                    </div>
                  </div>
                ))}
                <div
                  className="wrapperNewPlayer"
                  onClick={() => showNewPlayer(season.season)}
                >
                  <div className="newPlayer">
                    {selectedSeason === season.season && openNewStats
                      ? "fechar"
                      : "adicionar jogador"}
                  </div>
                  {selectedSeason === season.season && openNewStats ? (
                    <CgCloseR size={20} />
                  ) : (
                    <IoAddCircleOutline size={25} />
                  )}
                </div>
                {openNewStats && (
                  <NewPlayerModal
                    addPlayerToSeason={(player) =>
                      addPlayerToSeason(player, selectedSeason)
                    }
                    closeNewPlayer={closeNewPlayer}
                  />
                )}
              </div>
            </div>
            <div
              className={`hiddenText ${
                openSeasons.includes(season.id) ? "visible" : "hidden"
              }`}
            >
              <Transfers
                updatePage={updatePage}
                carrer={carrer}
                seasons={seasons}
                season={season}
                setSeasons={setSeasons}
              />
            </div>
          </div>
        ))}

        <div className="newSeason">
          <div onClick={addSeason} className="addSeason">
            <MdOutlinePostAdd size={30} />
          </div>
        </div>
      </div>
      <Total player={player} seasons={seasons}></Total>
      <div onClick={Save}>
        <ButtonGreen nameButtonSave="Salvar e Sair" />
      </div>

      {openStats && (
        <EditPlayers
          saveEditedPlayer={saveEditedPlayer}
          player={player}
          season={season}
          closeStats={closeStats}
        ></EditPlayers>
      )}

      {openDelete && (
        <DeleteSeason
          closeModalDelete={closeModalDelete}
          delete={deleteSeason}
        ></DeleteSeason>
      )}
    </>
  );
}

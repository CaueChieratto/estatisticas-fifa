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
import { db } from "../../firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

export default function PageForTeams() {
  const location = useLocation();
  const { carrer } = location.state || {};
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState(carrer.seasons || []);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user?.uid || !carrer?.id) return;

      const carrerRef = doc(db, "users", user.uid, "fifaData", carrer.id);

      const unsubscribeFirestore = onSnapshot(carrerRef, (docSnap) => {
        if (docSnap.exists()) {
          setSeasons(docSnap.data().seasons);
        }
      });

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, [carrer?.id]);

  function Save() {
    navigate("/PageForAllTeams");
  }

  const addSeason = async () => {
    if (!user?.uid || !carrer || !carrer.seasons) {
      console.error(
        "Erro: 'user', 'carrer' ou 'carrer.seasons' não está definido."
      );
      return;
    }

    const newSeason = {
      id: uuidv4(),
      season: seasons.length + 1,
      players: [],
      transfer: [],
    };

    setSeasons((prevSeasons) => [...prevSeasons, newSeason]);

    try {
      const carrerRef = doc(db, "users", user.uid, "fifaData", carrer.id);
      const carrerSnap = await getDoc(carrerRef);

      if (carrerSnap.exists()) {
        const updatedSeasons = [...carrerSnap.data().seasons, newSeason];

        await updateDoc(carrerRef, { seasons: updatedSeasons });
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao adicionar temporada: ", error);
    }
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

  const deleteSeason = async () => {
    if (!user?.uid || !seasonToDelete) return;

    try {
      const carrerRef = doc(db, "users", user.uid, "fifaData", carrer.id);
      const carrerSnap = await getDoc(carrerRef);

      if (carrerSnap.exists()) {
        const updatedSeasons = carrerSnap
          .data()
          .seasons.filter((season) => season.season !== seasonToDelete.season);

        await updateDoc(carrerRef, { seasons: updatedSeasons });

        setSeasons(updatedSeasons);
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao deletar temporada: ", error);
    }

    closeModalDelete();
  };

  const addPlayerToSeason = async (seasonId, newPlayer) => {
    if (!user?.uid || !carrer || !carrer.id) {
      console.error("Erro: 'user' ou 'carrer' não está definido.");
      return;
    }

    try {
      const carrerRef = doc(db, "users", user.uid, "fifaData", carrer.id);
      const carrerSnap = await getDoc(carrerRef);

      if (carrerSnap.exists()) {
        const carrerData = carrerSnap.data();

        const seasonIndex = carrerData.seasons.findIndex(
          (season) => season.season === Number(seasonId)
        );

        if (seasonIndex === -1) {
          console.error("Erro: Temporada não encontrada.");
          return;
        }

        const updatedSeasons = [...carrerData.seasons];
        updatedSeasons[seasonIndex] = {
          ...updatedSeasons[seasonIndex],
          players: [...updatedSeasons[seasonIndex].players, newPlayer],
        };

        await updateDoc(carrerRef, { seasons: updatedSeasons });
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao adicionar jogador: ", error);
    }
  };

  const saveEditedPlayer = async (editedPlayer, seasonNumber) => {
    if (!user?.uid || !carrer || !carrer.id) {
      console.error("Erro: 'user' ou 'carrer' não está definido.");
      return;
    }

    try {
      const carrerRef = doc(db, "users", user.uid, "fifaData", carrer.id);
      const carrerSnap = await getDoc(carrerRef);

      if (carrerSnap.exists()) {
        const carrerData = carrerSnap.data();

        const seasonIndex = carrerData.seasons.findIndex(
          (season) => season.season === seasonNumber
        );

        if (seasonIndex === -1) {
          console.error("Erro: Temporada não encontrada.");
          return;
        }

        const updatedSeasons = [...carrerData.seasons];
        const playerIndex = updatedSeasons[seasonIndex].players.findIndex(
          (p) => p.playerName === editedPlayer.playerName
        );

        if (playerIndex !== -1) {
          updatedSeasons[seasonIndex].players[playerIndex] = editedPlayer;

          await updateDoc(carrerRef, { seasons: updatedSeasons });
        }
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao salvar jogador editado: ", error);
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

  const deletePlayerFromTransfer = (playerId) => {
    const updatedSeasons = seasons.map((season) => {
      const updatedTransfers = season.transfer.filter(
        (transfer) => transfer.id !== playerId
      );
      return { ...season, transfer: updatedTransfers };
    });

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
                      addPlayerToSeason(selectedSeason, player)
                    }
                    closeNewPlayer={closeNewPlayer}
                  />
                )}
              </div>
            </div>
            {/* <div
              className={`hiddenText ${
                openSeasons.includes(season.id) ? "visible" : "hidden"
              }`}
            >
              <Transfers
                deletePlayerFromTransfer={deletePlayerFromTransfer}
                updatePage={updatePage}
                carrer={carrer}
                seasons={seasons}
                season={season}
                setSeasons={setSeasons}
              />
            </div> */}
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
          textDelete="apagar temporada"
          closeModalDelete={closeModalDelete}
          delete={deleteSeason}
        ></DeleteSeason>
      )}
    </>
  );
}

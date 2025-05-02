import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StyleTeams.css";
import ButtonGreen from "../../components/buttons/ButtonGreen";
import { IoAddCircleOutline } from "react-icons/io5";
import PlayerContainer from "../../components/player/PlayerContainer";
import Total from "../../components/player/Total.js";
import NewPlayerModal from "../../modal/NewPlayerModal.js";
import DeleteSeason from "../../modal/DeleteSeason.js";
import { GoPencil } from "react-icons/go";
import EditPlayers from "../../modal/EditPlayer.js";
import { RiCloseCircleLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Infos from "../../components/player/Infos.js";
import { db } from "../../firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { motion, useAnimation } from "framer-motion";
import Header from "../../components/squads/header/Header.js";
import Squad from "../../components/squads/squad/Squad.js";
import Buttons from "../../components/squads/buttons/Buttons.js";
import Modal from "../../modal/squads/Modal.js";
import Geral from "../../components/squads/geral/Geral.js";
import ModalTransferGeral from "../../components/squads/geral/transfer/modal/modal.js";

export default function PageForTeams() {
  const location = useLocation();
  const { carrer } = location.state || {};
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState(carrer.seasons || []);
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;
  const [openStats, setOpenStats] = useState(false);
  const [player, setPlayer] = useState({});
  const [season, setSeason] = useState({});
  const [openNewStats, setOpenNewStats] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [seasonToDelete, setSeasonToDelete] = useState(null);
  const [openSeasons, setOpenSeasons] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modoSelecao, setModoSelecao] = useState(null);
  const [openModalTransferGeral, setOpenModalTransferGeral] = useState(false);
  const [tipoTransferencia, setTipoTransferencia] = useState(null);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);
  const [abrirModalBuyPlayerSquads, setAbrirModalBuyPlayerSquads] =
    useState(false);
  const [abrirModalSquadsButtons, setAbrirModalSquadsButtons] = useState(false);
  const refreshSquad = () => setRefreshKey((prev) => prev + 1);
  const [selectedTab, setSelectedTab] = useState("Elenco");
  const controls = useAnimation();
  const [squad, setSquad] = useState({
    attackers: [],
    midfielders: [],
    defenders: [],
    goalkeepers: [],
    transferList: [],
  });

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

  useEffect(() => {
    if (selectedTab === "Wrapper") {
      controls.start({ x: 0 });
    } else if (selectedTab === "Elenco") {
      controls.start({ x: -window.innerWidth });
    } else if (selectedTab === "Geral") {
      controls.start({ x: -window.innerWidth * 2 });
    }
  }, [selectedTab, controls]);

  useEffect(() => {
    setSelectedTab("Wrapper");
    controls.start({ x: 0 });
  }, []);

  useEffect(() => {
    if (!uid || !carrer?.id) return;

    const docRef = doc(db, "users", uid, "fifaData", carrer.id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSquad({
          attackers: data.squads?.[0]?.attackers || [],
          midfielders: data.squads?.[0]?.midfielders || [],
          defenders: data.squads?.[0]?.defenders || [],
          goalkeepers: data.squads?.[0]?.goalkeepers || [],
          transferList: data.squads?.[0]?.transferList || [],
        });
      }
    });

    return () => unsubscribe();
  }, [uid, carrer?.id]);

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

  const showNewPlayer = (season) => {
    if (selectedSeason === season && openNewStats) {
      setOpenNewStats(false);
      setSelectedSeason(null);
    } else {
      setSelectedSeason(season);
      setOpenNewStats(true);
    }
    document.body.style.overflowY = "hidden";
  };

  const closeNewPlayer = () => {
    setOpenNewStats(false);
    document.body.style.overflowY = "auto";
  };

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

  const abrirBuyPlayers = () => {
    setAbrirModalBuyPlayerSquads(true);
    document.body.style.overflowY = "hidden";
  };

  const fechar = () => {
    setAbrirModalBuyPlayerSquads(false);
    setAbrirModalSquadsButtons(false);
    setModoSelecao(null);
    document.body.style.overflowY = "auto";
  };

  const abrirModalJogador = (jogador) => {
    if (!modoSelecao) return;
    setJogadorSelecionado(jogador);
    setAbrirModalSquadsButtons(true);
    document.body.style.overflowY = "hidden";
  };

  const deletarJogador = async (jogador, posicao = modoSelecao) => {
    const confirmacao = window.confirm(
      `Deseja realmente remover ${jogador.playerName}?`
    );
    if (!confirmacao) return;
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;
    const clubeId = carrer.id;

    if (!uid || !clubeId) return;

    const docRef = doc(db, `users/${uid}/fifaData/${clubeId}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    const novaSquad = {
      attackers:
        data.squads?.[0]?.attackers?.filter(
          (j) => j.playerName !== jogador.playerName
        ) || [],
      midfielders:
        data.squads?.[0]?.midfielders?.filter(
          (j) => j.playerName !== jogador.playerName
        ) || [],
      defenders:
        data.squads?.[0]?.defenders?.filter(
          (j) => j.playerName !== jogador.playerName
        ) || [],
      goalkeepers:
        data.squads?.[0]?.goalkeepers?.filter(
          (j) => j.playerName !== jogador.playerName
        ) || [],
      transferList:
        data.squads?.[0]?.transferList?.filter(
          (j) => j.playerName !== jogador.playerName
        ) || [],
    };

    await updateDoc(docRef, {
      squads: [novaSquad],
    });

    refreshSquad?.();
  };

  const handleModoSelecao = (modo) => {
    setModoSelecao((prevModo) => (prevModo === modo ? null : modo));
  };
  const openModalClick = (tipo) => {
    setTipoTransferencia(tipo);
    document.body.style.overflowY = "hidden";
    setOpenModalTransferGeral(true);
  };
  const closeModalClick = () => {
    setOpenModalTransferGeral(false);
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      <Header
        Back={() => navigate("/PageForAllTeams")}
        setSelectedTab={(tab) => {
          setSelectedTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });

          if (tab === "Wrapper") controls.start({ x: 0 });
          if (tab === "Elenco") controls.start({ x: -window.innerWidth });
          if (tab === "Geral") controls.start({ x: -window.innerWidth * 2 });
        }}
        selectedTab={selectedTab}
        carrer={carrer}
      />

      <div className="carouselSquads">
        <motion.div
          className="carouselTrack"
          drag="x"
          dragConstraints={{ left: -window.innerWidth * 2, right: 0 }}
          onDragEnd={(event, info) => {
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            const scrollToTop = () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            };

            if (offset < -150 || velocity < -1000) {
              if (selectedTab === "Wrapper") {
                setSelectedTab("Elenco");
                controls.start({ x: -window.innerWidth });
                scrollToTop();
              } else if (selectedTab === "Elenco") {
                setSelectedTab("Geral");
                controls.start({ x: -window.innerWidth * 2 });
                scrollToTop();
              }
            } else if (offset > 150 || velocity > 1000) {
              if (selectedTab === "Geral") {
                setSelectedTab("Elenco");
                controls.start({ x: -window.innerWidth });
                scrollToTop();
              } else if (selectedTab === "Elenco") {
                setSelectedTab("Wrapper");
                controls.start({ x: 0 });
                scrollToTop();
              }
            } else {
              if (selectedTab === "Wrapper") {
                controls.start({ x: 0 });
              }
              if (selectedTab === "Elenco") {
                controls.start({ x: -window.innerWidth });
              }
              if (selectedTab === "Geral") {
                controls.start({ x: -window.innerWidth * 2 });
              }
            }
          }}
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          initial={{ x: 0 }}
        >
          <div className="carouselSlide">
            <div className="wrapper">
              {seasons.map((season) => (
                <div className="containerAllSeasons" key={season.id}>
                  <div className="seasons">
                    <div className="openSeasons">
                      <div className="seasonAndDeleteButton">
                        Temporada {season.season}
                        <div
                          className="deleteButton"
                          onClick={() => showModalDelete(season)}
                        >
                          <RiCloseCircleLine />
                        </div>
                      </div>
                      <div
                        className="arrows"
                        onClick={() => toggleVisibility(season.id)}
                      >
                        {openSeasons.includes(season.id) ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )}
                      </div>
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
                        <div className="newPlayer">Adicionar Jogador</div>
                        <IoAddCircleOutline size={25} />
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
                </div>
              ))}

              <div className="newSeason">
                <div onClick={addSeason} className="addSeason">
                  <ButtonGreen nameButtonNewSeason="Nova Temporada" />
                </div>
              </div>
              <Total player={player} seasons={seasons}></Total>
            </div>
          </div>

          <div className="carouselSlide">
            <div className="containerGeralSquads">
              <Squad
                modoSelecao={modoSelecao}
                abrirModalJogador={abrirModalJogador}
                deletarJogador={deletarJogador}
                squad={squad}
                refreshKey={refreshKey}
              />
              <Buttons
                abrirBuyPlayers={abrirBuyPlayers}
                handleModoSelecao={handleModoSelecao}
              />
            </div>
          </div>

          <div className="carouselSlide">
            <div className="containerGeralSquads">
              <Geral
                squad={squad}
                modoSelecao={modoSelecao}
                openModalTransferGeral={openModalTransferGeral}
                openModalClick={openModalClick}
                carrer={carrer}
                updatePage={updatePage}
                seasons={seasons}
                season={season}
                setSeasons={setSeasons}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {abrirModalBuyPlayerSquads && (
        <Modal onSave={refreshSquad} carrer={carrer} fechar={fechar} />
      )}
      {abrirModalSquadsButtons && (
        <Modal
          onSave={refreshSquad}
          carrer={carrer}
          fechar={fechar}
          jogadorSelecionado={jogadorSelecionado}
          modoSelecao={modoSelecao}
        />
      )}

      {openStats && (
        <EditPlayers
          saveEditedPlayer={saveEditedPlayer}
          player={player}
          season={season}
          closeStats={closeStats}
        />
      )}

      {openDelete && (
        <DeleteSeason
          textDelete="apagar temporada"
          closeModalDelete={closeModalDelete}
          delete={deleteSeason}
        />
      )}
      {openModalTransferGeral && (
        <ModalTransferGeral
          deletarJogador={deletarJogador}
          squad={squad}
          tipoTransferencia={tipoTransferencia}
          jogadorSelecionado={jogadorSelecionado}
          modoSelecao={modoSelecao}
          carrer={carrer}
          closeModalClick={closeModalClick}
        />
      )}
    </>
  );
}

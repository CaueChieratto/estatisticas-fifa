import { React, useEffect, useState } from "react";
import ButtonGreen from "../../components/buttons/ButtonGreen";
import "./StyleForAllTeams.css";
import Allteams from "../../components/allTeams/Allteams";
import Load from "../../components/load/load.js";
import CreateNewCarrer from "../../modal/CreateNewCarrer.js";
import DeleteSeason from "../../modal/DeleteSeason.js";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EmptyCareers from "../../components/EmptyCareers/EmptyCareers.js";
import Titles from "../../components/titles/titles.js";

export default function PageForAllTeams() {
  const [fifaData, setFifaData] = useState({ carrers: [] });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setLoad(true);
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        const unsubscribeFirestore = onSnapshot(
          collection(db, `users/${uid}/fifaData`),
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setFifaData({ carrers: data });
            setLoad(false);
          }
        );

        return () => unsubscribeFirestore();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const navigate = useNavigate();

  function linkTeams(carrer) {
    navigate("/PageForTeams", { state: { carrer: carrer } });
  }

  const [createNewCarrer, setCreateNewCarrer] = useState(false);
  const [newCarrer, setNewCarrer] = useState({});

  const [editCarrer, setEditCarrer] = useState(false);
  const [carrer, setCarrer] = useState({});

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCarrerModal, setDeleteCarrer] = useState({});

  const [titles, setTitles] = useState(null);

  const openModalTitles = (carrer) => {
    const updatedCarrer = fifaData.carrers.find((c) => c.id === carrer.id);
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTitles(updatedCarrer);
  };

  const closeModalTitles = () => {
    document.body.style.overflowY = "auto";
    document.documentElement.style.overflow = "auto";
    setTitles(null);
  };

  const showNewCarrer = () => {
    setNewCarrer({});
    setCreateNewCarrer(true);
  };

  const closeNewCarrer = () => {
    setCreateNewCarrer(false);
  };

  const showEditCarrer = (carrer) => {
    setCarrer(carrer);
    setEditCarrer(true);
    document.body.style.overflowY = "hidden";
  };

  const showModalDeleteClub = (carrer) => {
    setDeleteCarrer(carrer);
    setOpenDelete(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalDeleteClub = () => {
    setOpenDelete(false);
    document.body.style.overflowY = "auto";
  };

  const deleteCarrer = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
      await deleteDoc(doc(db, `users/${uid}/fifaData`, deleteCarrerModal.id));
      setFifaData((prev) => ({
        carrers: prev.carrers.filter((x) => x.id !== deleteCarrerModal.id),
      }));
      closeModalDeleteClub();
    }
  };

  const refreshCarrer = (updatedCarrer) => {
    setFifaData((prev) => ({
      carrers: prev.carrers.map((c) =>
        c.id === updatedCarrer.id ? updatedCarrer : c
      ),
    }));
    setTitles(updatedCarrer);
  };

  const runWithDelayedLoad = async (asyncCallback) => {
    let timeoutId = setTimeout(() => setLoad(true), 1000);

    try {
      await asyncCallback();
    } catch (err) {
      console.error("Erro ao executar função com loading:", err);
    } finally {
      clearTimeout(timeoutId);
      setLoad(false);
    }
  };

  return (
    <>
      {fifaData.carrers && fifaData.carrers.length > 0 ? (
        <div className="containerPageOne">
          <div className="containerHeaderPageOne">
            <h2 className="tituloPageOne">Minhas Carreiras</h2>
            <div className="containerButton">
              <div onClick={showNewCarrer} style={{ width: "fit-content" }}>
                <ButtonGreen nameButtonNewCarrerWithCarrer="Nova Carreira" />
              </div>
            </div>
          </div>
          {[...fifaData.carrers]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((carrer, index) => (
              <div className="containerAllClubs" key={carrer.club + index}>
                <Allteams
                  squads={carrer.squads}
                  trophies={carrer.trophies}
                  openModalTitles={() => openModalTitles(carrer)}
                  showModalDeleteClub={() => showModalDeleteClub(carrer)}
                  showEditCarrer={() => showEditCarrer(carrer)}
                  linkTeams={() => linkTeams(carrer)}
                  carrer={carrer}
                  club={carrer.club}
                  nation={carrer.nation}
                  seasons={carrer.seasons}
                  data={carrer.date}
                />
              </div>
            ))}
        </div>
      ) : (
        <EmptyCareers onClick={showNewCarrer} />
      )}
      {titles && (
        <Titles
          setLoad={setLoad}
          load={load}
          runWithDelayedLoad={runWithDelayedLoad}
          refreshCarrer={refreshCarrer}
          carrer={titles}
          closeModalTitles={closeModalTitles}
        />
      )}

      {createNewCarrer && (
        <CreateNewCarrer
          runWithDelayedLoad={runWithDelayedLoad}
          setLoad={setLoad}
          load={load}
          closeNewCarrer={closeNewCarrer}
        />
      )}
      {openDelete && (
        <DeleteSeason
          delete={deleteCarrer}
          textDelete="apagar a carreira"
          closeModalDelete={closeModalDeleteClub}
        />
      )}
      {load && <Load />}
    </>
  );
}

import { React, useEffect, useState } from "react";
import ButtonGreen from "../../components/buttons/ButtonGreen";
import "./StyleForAllTeams.css";
import Allteams from "../../components/allTeams/Allteams";
import EditCarrers from "../../modal/EditCarrers.js";
import CreateNewCarrer from "../../modal/CreateNewCarrer.js";
import { GoPencil } from "react-icons/go";
import DeleteSeason from "../../modal/DeleteSeason.js";
import { RiCloseCircleLine } from "react-icons/ri";
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

export default function PageForAllTeams() {
  const [fifaData, setFifaData] = useState({ carrers: [] });

  useEffect(() => {
    const auth = getAuth();
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

  const closeEditCarrer = () => {
    setEditCarrer(false);
    document.body.style.overflowY = "auto";
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
      await deleteDoc(doc(db, `users/${uid}/fifaData`, deleteCarrerModal.id)); // Usando o uid do usuário logado
      setFifaData((prev) => ({
        carrers: prev.carrers.filter((x) => x.id !== deleteCarrerModal.id),
      }));
      closeModalDeleteClub();
    }
  };

  const saveEditedCarrer = async (editedCarrer) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
      const carrerRef = doc(db, `users/${uid}/fifaData`, editedCarrer.id); // Usando o uid do usuário logado
      await updateDoc(carrerRef, editedCarrer);

      setFifaData((prev) => ({
        carrers: prev.carrers.map((c) =>
          c.id === editedCarrer.id ? editedCarrer : c
        ),
      }));
      closeEditCarrer();
    }
  };

  return (
    <>
      {fifaData.carrers &&
        fifaData.carrers.length > 0 &&
        fifaData.carrers.map((carrer, index) => (
          <div className="container" key={carrer.club + index}>
            <div
              className="deleteButton"
              onClick={() => showModalDeleteClub(carrer)}
            >
              <RiCloseCircleLine />
            </div>
            <div className="containerAllClubs">
              <div className="carrers">
                <Allteams
                  carrer={carrer}
                  club={carrer.club}
                  nation={carrer.nation}
                  seasons={carrer.seasons}
                  numberTitles={carrer.numberTitles}
                  numberLeagues={carrer.numberLeagues}
                  numberCupsNationals={carrer.numberCupsNationals}
                  numberCupsInternationals={carrer.numberCupsInternationals}
                  data={carrer.date}
                />
              </div>
              <div
                className="editCarrer"
                onClick={() => showEditCarrer(carrer)}
              >
                <GoPencil />
              </div>
              <div className="containerButtonsCarrer">
                <div
                  className="buttonForCarrers"
                  onClick={() => linkTeams(carrer)}
                >
                  <div className="button">temporadas</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="containerButton">
        <div onClick={showNewCarrer} style={{ width: "fit-content" }}>
          <ButtonGreen nameButtonNewCarrer="nova carreira" />
        </div>
      </div>

      {editCarrer && (
        <EditCarrers
          onSave={saveEditedCarrer}
          carrer={carrer}
          closeEditCarrer={closeEditCarrer}
        />
      )}

      {createNewCarrer && <CreateNewCarrer closeNewCarrer={closeNewCarrer} />}

      {openDelete && (
        <DeleteSeason
          delete={deleteCarrer}
          textDelete="apagar a carreira"
          closeModalDelete={closeModalDeleteClub}
        />
      )}
    </>
  );
}

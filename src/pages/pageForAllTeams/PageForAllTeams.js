import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGreen from "../../components/buttons/ButtonGreen";
import "./StyleForAllTeams.css";
import Allteams from "../../components/allTeams/Allteams";
import EditCarrers from "../../modal/EditCarrers.js";
import CreateNewCarrer from "../../modal/CreateNewCarrer.js";
import { GoPencil } from "react-icons/go";
import DeleteSeason from "../../modal/DeleteSeason.js";
import { RiCloseCircleLine } from "react-icons/ri";

export default function PageForAllTeams() {
  useEffect(() => {
    const storedData = localStorage.getItem("fifaData");
    if (storedData) {
      setFifaData(JSON.parse(storedData));
    }
  }, []);

  const navigate = useNavigate();

  function linkTeams(carrer) {
    navigate("/PageForTeams", { state: { carrer: carrer } });
  }

  const [createNewCarrer, setCreateNewCarrer] = useState(false);
  const [newCarrer, setNewCarrer] = useState({});

  const [editCarrer, setEditCarrer] = useState(false);
  const [carrer, setCarrer] = useState({});

  const [fifaData, setFifaData] = useState({});

  const showNewCarrer = () => {
    setNewCarrer();
    setCreateNewCarrer(true);
    document.body.style.overflowY = "hidden";
  };
  const closeNewCarrer = () => {
    const storedData = localStorage.getItem("fifaData");
    if (storedData) {
      setFifaData(JSON.parse(storedData));
    }
    setCreateNewCarrer(false);
    document.body.style.overflowY = "auto";
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

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteCarrerModal, setDeleteCarrer] = useState({});

  const showModalDeleteClub = (carrer) => {
    setDeleteCarrer(carrer);
    setOpenDelete(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalDeleteClub = () => {
    const storedData = localStorage.getItem("fifaData");
    if (storedData) {
      setFifaData(JSON.parse(storedData));
    }
    setOpenDelete(false);
    document.body.style.overflowY = "auto";
  };

  const deleteCarrer = () => {
    var newFifaDataCarrers = fifaData.carrers.filter(
      (x) => x.uuid != deleteCarrerModal.uuid
    );
    var newFifaData = { carrers: newFifaDataCarrers };
    localStorage.setItem("fifaData", JSON.stringify(newFifaData));
    closeModalDeleteClub();
  };

  const saveEditedCarrer = (editedCarrer) => {
    const updatedCarrers = fifaData.carrers.map((c) =>
      c.uuid === editedCarrer.uuid ? editedCarrer : c
    );
    const updatedFifaData = { carrers: updatedCarrers };
    localStorage.setItem("fifaData", JSON.stringify(updatedFifaData));
    setFifaData(updatedFifaData);
    closeEditCarrer();
  };

  return (
    <>
      {fifaData &&
        fifaData.carrers &&
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
              <div className="carrers" onClick={() => linkTeams(carrer)}>
                <Allteams
                  club={carrer.club}
                  seasons={carrer.seasons}
                  numberTitles={carrer.numberTitles}
                  numberLeagues={carrer.numberLeagues}
                  numberCupsNationals={carrer.numberCupsNationals}
                  numberCupsInternationals={carrer.numberCupsInternationals}
                  data={carrer.data}
                ></Allteams>
              </div>
              <div
                className="editCarrer"
                onClick={() => showEditCarrer(carrer)}
              >
                <GoPencil />
              </div>
            </div>
          </div>
        ))}
      <div className="containerButton">
        <div onClick={showNewCarrer} style={{ width: "fit-content" }}>
          <ButtonGreen nameButtonNewCarrer="nova carreira"></ButtonGreen>
        </div>
      </div>

      {editCarrer && (
        <EditCarrers
          onSave={saveEditedCarrer}
          carrer={carrer}
          closeEditCarrer={closeEditCarrer}
        ></EditCarrers>
      )}

      {createNewCarrer && (
        <CreateNewCarrer closeNewCarrer={closeNewCarrer}></CreateNewCarrer>
      )}

      {openDelete && (
        <DeleteSeason
          delete={deleteCarrer}
          textDelete="apagar a carreira"
          closeModalDelete={closeModalDeleteClub}
        ></DeleteSeason>
      )}
    </>
  );
}

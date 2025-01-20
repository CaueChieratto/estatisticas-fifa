import { React, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "./StyleTransfers.css";
import TransfersPlayers from "./modal/TransfersPlayers.js";
import NewTransfersPlayers from "./addPlayer/NewTransfersPlayers.js";

export default function Transfers(props) {
  const colorExits = { color: "#0bb32a" };
  const colorArrivals = { color: "#c81419" };
  const [openModalTransfers, setOpenModalTransfers] = useState(false);
  const [modalType, setModalType] = useState("");

  const [newTransferPlayer, setNewTransferPlayer] = useState({
    arrival: 0,
    transfer: Boolean,
    numberValue: Boolean,
    endLoan: Boolean,
    loan: Boolean,
    playerTransfer: "",
    age: "",
    value: "",
    team: "",
    dataTransfer: "",
  });

  const showModalTransfers = (type) => {
    setModalType(type);
    setOpenModalTransfers(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalTransfers = () => {
    setOpenModalTransfers(false);
    document.body.style.overflowY = "auto";
  };

  const exit = 10.3;
  const arrival = 55;
  const totalProfits = exit - arrival;

  return (
    <>
      <div className="containerTitle">
        <div className="titleTransfer">Tranferências da Temporada</div>

        <NewTransfersPlayers
          updatePage={props.updatePage}
          newTransferPlayer={newTransferPlayer}
          setNewTransferPlayer={setNewTransferPlayer}
          carrer={props.carrer}
          seasons={props.seasons}
          season={props.season}
          setSeasons={props.setSeasons}
        />
      </div>
      <>
        <div className="containerTransferInfos">
          <div
            className="infosTranfers"
            style={colorArrivals}
            onClick={() => showModalTransfers("arrivals")}
          >
            <span className="iconInfoTransfer">
              <IoMdInformationCircleOutline />
            </span>
            Chegadas: 1
          </div>
          <div
            className="infosTranfers"
            style={colorExits}
            onClick={() => showModalTransfers("exits")}
          >
            <span className="iconInfoTransfer">
              <IoMdInformationCircleOutline />
            </span>
            Saídas: 1
          </div>
          <div className="moneyMoved" style={colorArrivals}>
            Gastos: €{arrival}M
          </div>
          <div className="moneyMoved" style={colorExits}>
            Vendas: €{exit}M
          </div>
        </div>
        <div
          className="seasonProfit"
          style={totalProfits >= 0 ? colorExits : colorArrivals}
        >
          Total: €{Math.abs(totalProfits)}M
        </div>
      </>

      {openModalTransfers && (
        <TransfersPlayers
          newTransferPlayer={newTransferPlayer}
          setNewTransferPlayer={setNewTransferPlayer}
          carrer={props.carrer}
          seasons={props.seasons}
          season={props.season}
          closeModal={closeModalTransfers}
          modalType={modalType}
        />
      )}
    </>
  );
}

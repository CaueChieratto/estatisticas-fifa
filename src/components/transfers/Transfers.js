import { React, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "./StyleTransfers.css";
import TransfersPlayers from "./modal/TransfersPlayers.js";

export default function Transfers() {
  const colorExits = { color: "#15b168" };
  const colorArrivals = { color: "#c7361f" };

  const [openAddPlayer, setOpenAddPlayer] = useState(false);
  const [openModalTransfers, setOpenModalTransfers] = useState(false);
  const [modalType, setModalType] = useState("");

  const showAddPlayer = () => {
    setOpenAddPlayer(true);
    document.body.style.overflowY = "hidden";
  };

  const closeAddPlayer = () => {
    setOpenAddPlayer(false);
    document.body.style.overflowY = "auto";
  };

  const showModalTransfers = (type) => {
    setModalType(type);
    setOpenModalTransfers(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModalTransfers = () => {
    setOpenModalTransfers(false);
    document.body.style.overflowY = "auto";
  };

  return (
    <>
      <div className="containerTitle">
        <div className="titleTransfer">Tranferências da Temporada</div>
        <div className="addPlayer" onClick={showAddPlayer}>
          Adicionar Jogadores
        </div>
      </div>
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
          Gastos: €12,2M
        </div>
        <div className="moneyMoved" style={colorExits}>
          Vendas: €23.7M
        </div>
      </div>
      <div className="seasonProfit">Total: €11.5M</div>
      {openAddPlayer && <div onClick={closeAddPlayer}>aaaaaaaaaaa</div>}
      {openModalTransfers && (
        <TransfersPlayers
          closeModal={closeModalTransfers}
          modalType={modalType}
        />
      )}
    </>
  );
}

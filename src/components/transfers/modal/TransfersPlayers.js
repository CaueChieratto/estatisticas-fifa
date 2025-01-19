import React, { useState, useRef, useEffect } from "react";
import "./StyleModalTransfers.css";
import { AiOutlineClose } from "react-icons/ai";
import PlayersTransfers from "../../playerTransfer/PlayersTransfers.js";

export default function TransfersPlayers(props) {
  const [closing, setClosing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const handlePreventScroll = (e) => {
      if (!cardRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", handlePreventScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", handlePreventScroll);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(props.closeModal, 400);
  };

  const handleDragStart = (e) => {
    setDragging(true);
    startY.current = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;

    if (cardRef.current) {
      cardRef.current.style.transition = "none";
    }
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    e.preventDefault();

    currentY.current =
      e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (cardRef.current && deltaY >= 0) {
      cardRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    const deltaY = currentY.current - startY.current;

    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.3s ease";

      if (deltaY > 100) {
        handleClose();
      } else {
        cardRef.current.style.transform = "translateY(0)";
      }
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag, { passive: false });
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    }
  }, [dragging]);

  return (
    <div className="backgroundModalTransfers" onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`cardModalTransfer ${closing ? "closing" : ""}`}
        ref={cardRef}
      >
        <div
          className="containerTopModal"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="teste">
            <div className="bar"></div>
          </div>
          <div className="iconClose" onClick={handleClose}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="containerPlayersTransfer">
          {props.modalType === "arrivals" && (
            <div>
              <div className="titleTransfers">Contratações da Temporada</div>
              <PlayersTransfers
                arrival={true}
                transfer={true}
                numberValue={true}
                playerTransfer="Wojciech Szczęsny"
                age="34"
                value={0}
                team="Passes Livres"
                dataTransfer="1 de Out. de 2024"
              />
              <PlayersTransfers
                arrival={true}
                numberValue={true}
                transfer={true}
                playerTransfer="Dani Olmo"
                age="26"
                value={55}
                team="Leipzig"
                dataTransfer="8 de Ago. de 2024"
              />
              <PlayersTransfers
                arrival={true}
                numberValue={true}
                transfer={true}
                playerTransfer="Marc Bernal"
                age="18"
                value={0}
                team="Base"
                dataTransfer="30 de Jun. de 2024"
              />
              <PlayersTransfers
                arrival={true}
                playerTransfer="Chadi Riad"
                age="24"
                endLoan={true}
                team="Real Betis"
                dataTransfer="29 de Jun. de 2024"
              />
              <PlayersTransfers
                arrival={true}
                playerTransfer="Clément Lenglet"
                age="29"
                loan="12"
                team="Atletico de Madrid"
                dataTransfer="25 de Ago. de 2024"
              />
            </div>
          )}
          {props.modalType === "exits" && (
            <div>
              <div className="titleTransfers">Vendas da Temporada</div>
              <PlayersTransfers
                arrival={false}
                numberValue={true}
                transfer={true}
                playerTransfer="Mikayil Faye"
                age="20"
                value={10.3}
                team="Stade Rennes"
                dataTransfer="24 de Ago. de 2024"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ...tranfers.map((transfer)=>{if(transfer.arrival)<playerTransfer/>}) pra quem ta chegando
// ...tranfers.map((transfer)=>{if(!transfer.arrival)<playerTransfer/>}) pra quem ta saindo

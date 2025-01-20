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

              {props.season.transfer
                ?.filter((transfer) => transfer.arrival == true)
                .map((transfer, index) => (
                  <PlayersTransfers
                    key={index}
                    arrival={true}
                    numberValue={transfer.value != undefined}
                    transfer={
                      transfer.value != undefined && transfer.value != "endLoan"
                    }
                    loan={transfer.value == undefined}
                    endLoan={transfer.value == "endLoan"}
                    playerTransfer={transfer.playerTransfer}
                    age={transfer.age}
                    value={
                      transfer.value != undefined
                        ? transfer.value
                        : transfer.loan
                    }
                    team={transfer.team}
                    dataTransfer={transfer.dataTransfer}
                  />
                ))}
            </div>
          )}
          {props.modalType === "exits" && (
            <div>
              <div className="titleTransfers">Vendas da Temporada</div>
              {props.season.transfer
                ?.filter((transfer) => transfer.arrival == false)
                .map((transfer, index) => (
                  <PlayersTransfers
                    key={index}
                    arrival={false}
                    numberValue={transfer.value != undefined}
                    transfer={transfer.value != undefined}
                    loan={transfer.value == undefined}
                    playerTransfer={transfer.playerTransfer}
                    age={transfer.age}
                    value={
                      transfer.value != undefined
                        ? transfer.value
                        : transfer.loan
                    }
                    team={transfer.team}
                    dataTransfer={transfer.dataTransfer}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

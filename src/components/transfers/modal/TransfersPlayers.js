import React, { useState, useRef, useEffect } from "react";
import "./StyleModalTransfers.css";
import { AiOutlineClose } from "react-icons/ai";
import Arrivals from "../../arrivalsAndExits/Arrivals";

export default function TransfersPlayers(props) {
  const [closing, setClosing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

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

    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("touchmove", handleDrag);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchend", handleDragEnd);
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      handleDrag(e);
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
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
              <div className="titleTransfer">Contratações da Temporada</div>
              <Arrivals />
            </div>
          )}
          {props.modalType === "exits" && (
            <div className="titleTransfer">Vendas da Temporada</div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";
import "../../../../titles/titles.css";
import { MdDelete } from "react-icons/md";

export default function ModalTransferGeral(props) {
  const cardRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    currentY.current = y - startY.current;
    if (currentY.current > 0) {
      setTranslateY(currentY.current);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentY.current > 150) {
      props.closeModalClick();
    } else {
      setTranslateY(0);
    }
  };

  useEffect(() => {
    const el = cardRef.current;

    if (el) {
      el.style.overflow = isDragging ? "hidden" : "auto";
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);

      if (el) el.style.overflow = "auto";
    };
  }, [isDragging]);

  const squad = props.squad;
  const squadSell = props.squad.transferList || [];

  const jogadoresComprados = [
    ...(squad?.attackers || []),
    ...(squad?.defenders || []),
    ...(squad?.midfielders || []),
    ...(squad?.goalkeepers || []),
    ...(squad?.transferList || []),
  ].filter((jogador) => jogador.buy);

  const formatarData = (data) => {
    if (!data) return "";

    const partes = data.split("/");
    if (partes.length !== 3) return data;

    const [dia, mes, ano] = partes;

    const anoCompleto = ano.length === 2 ? `20${ano}` : ano;

    return `${dia} de ${abreviarMes(mes)} de ${anoCompleto}`;
  };

  const abreviarMes = (mes) => {
    const meses = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return meses[parseInt(mes, 10) - 1];
  };

  return (
    <div className="backgroundModalTitles" onClick={props.closeModalClick}>
      <div
        ref={cardRef}
        className={`cardModalTitles ${
          !isDragging && translateY === 0 ? "open" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isDragging ? `translateY(${translateY}px)` : undefined,
          transition: isDragging ? "none" : undefined,
          position: "relative",
        }}
      >
        <div
          className="containerTopModalTitles"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="barContainer">
            <div className="barTitles"></div>
          </div>
        </div>
        <div className="containerTransfersMedia">
          {props.tipoTransferencia === "chegadas" &&
            jogadoresComprados
              .slice()
              .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
              .map((player, index) => (
                <div
                  className="containerTransfers"
                  key={`${player.playerName}-${player.club}-${index}`}
                >
                  <div className="containerInfos">
                    <div className="infosPlayer">
                      <div className="infosTitles">{player.playerName}</div>
                      <div className="infos infoValues">
                        <div> Transferência: </div>
                        <span className="number" style={{ color: "#c81419" }}>
                          €{player.value}M
                        </span>
                      </div>
                    </div>
                    <div
                      className="iconDeletePlayerInTransferModal"
                      onClick={() => props.deletarJogador(player, "chegadas")}
                    >
                      <MdDelete />
                    </div>
                    <div className="infosTransfer">
                      <div className="infosTitles">{player.clubArrival}</div>
                      <div className="infos">
                        {formatarData(player.dataArrival)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

          {props.tipoTransferencia === "saidas" &&
            squadSell
              .filter((player) => player.sell)
              .slice()
              .sort(
                (a, b) =>
                  parseFloat(b.valueTransfer) - parseFloat(a.valueTransfer)
              )
              .map((player, index) => (
                <div
                  className="containerTransfers"
                  key={`${player.playerName}-${player.club}-${index}`}
                >
                  <div className="containerInfos">
                    <div className="infosPlayer">
                      <div className="infosTitles">{player.playerName}</div>
                      <div className="infos infoValues">
                        <div> Transferência: </div>
                        <span className="number" style={{ color: "#0bb32a" }}>
                          €{player.valueTransfer}M
                        </span>
                      </div>
                    </div>
                    <div
                      className="iconDeletePlayerInTransferModal"
                      onClick={() => props.deletarJogador(player, "saidas")}
                    >
                      <MdDelete />
                    </div>
                    <div className="infosTransfer">
                      <div className="infosTitles">{player.clubExit}</div>
                      <div className="infos">
                        {formatarData(player.dataExit)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

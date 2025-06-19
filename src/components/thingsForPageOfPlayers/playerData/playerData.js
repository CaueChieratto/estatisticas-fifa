import React from "react";
import { FaCalendar } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { GrMap } from "react-icons/gr";
import { FaTshirt } from "react-icons/fa";
import { GiPoliceBadge } from "react-icons/gi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";

export default function PlayerData(props) {
  return (
    <>
      {!props.dadosSquad.sell && (
        <div className="cardGeral">
          <div className="containerCardGeral">
            <div className="title">Informações do Jogador</div>
            <div className="containerInfoGeral">
              <div className="containerInfoSquadGeral">
                {props.dadosSquad.nation || "N/A"}
                <span className="numberGeral">
                  {props.dadosSquad.playerName || "N/A"}
                </span>
                <div className="iconGeral">
                  <FaUserLarge />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                {props.dadosSquad.detailPosition || "N/A"}
                <span className="numberGeral">Posição</span>{" "}
                <div className="iconGeral">
                  <GrMap />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                {props.dadosSquad.ageRenovacao ?? props.dadosSquad.age ?? "N/A"}
                <span className="numberGeral">Idade</span>{" "}
                <div className="iconGeral">
                  <FaCalendar />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                {props.dadosSquad.shirtNumber || "N/A"}
                <span className="numberGeral">Número da camisa</span>{" "}
                <div className="iconGeral">
                  <FaTshirt />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!props.dadosSquad.sell && (
        <div className="cardGeral">
          <div className="containerCardGeral">
            <div className="title">Informações do Contrato</div>
            <div className="containerInfoGeral contract">
              <div className="containerInfoSquadGeral">
                Valor do Jogador
                <span className="numberGeral">
                  €
                  {props.dadosSquad.valueRenovacao ??
                    props.dadosSquad.value ??
                    "N/A"}
                  M
                </span>
              </div>
              <div className="containerInfoSquadGeral">
                Salário semanal
                <span className="numberGeral">
                  {props.dadosSquad.salary || "N/A"}mil
                </span>
              </div>
              <div className="containerInfoSquadGeral">
                Tempo de Contrato
                <span className="numberGeral">
                  {props.dadosSquad.contract || "N/A"} anos
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.dadosSquad.buy === true && (
        <div className="cardGeral">
          <div className="containerCardGeral">
            <div className="title" style={{ color: "#c81419" }}>
              Informações da Compra
            </div>
            <div className="containerInfoGeral">
              <div className="containerInfoSquadGeral">
                Ultimo Clube
                <span className="numberGeral">
                  {props.dadosSquad.clubArrival}
                </span>
                <div className="iconGeral">
                  <GiPoliceBadge />
                </div>
              </div>
              <div
                className="containerInfoSquadGeral"
                style={{ color: "#c81419" }}
              >
                Valor da Compra
                <span className="numberGeral">€{props.dadosSquad.value}M</span>
                <div className="iconGeral">
                  <GiMoneyStack />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                Idade na Compra
                <span className="numberGeral">
                  {props.dadosSquad.age ??
                    props.dadosSquad.ageRenovacao ??
                    "N/A"}
                </span>
                <div className="iconGeral">
                  <BiRefresh />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                Data da Compra
                <span className="numberGeral">
                  {props.dadosSquad.dataArrival}
                </span>
                <div className="iconGeral">
                  <RiCalendarScheduleLine />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.dadosSquad.sell === true && (
        <div className="cardGeral">
          <div className="containerCardGeral">
            <div className="title" style={{ color: "#0bb32a" }}>
              Informações da Venda
            </div>
            <div className="containerInfoGeral">
              <div className="containerInfoSquadGeral">
                Clube que Comprou
                <span className="numberGeral">{props.dadosSquad.clubExit}</span>
                <div className="iconGeral">
                  <GiPoliceBadge />
                </div>
              </div>
              <div
                className="containerInfoSquadGeral"
                style={{ color: "#0bb32a" }}
              >
                Valor da Venda
                <span className="numberGeral">
                  €{props.dadosSquad.valueTransfer}M
                </span>
                <div className="iconGeral">
                  <GiMoneyStack />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                Idade na Venda
                <span className="numberGeral">
                  {props.dadosSquad.ageRenovacao ??
                    props.dadosSquad.age ??
                    "N/A"}
                </span>
                <div className="iconGeral">
                  <BiRefresh />
                </div>
              </div>
              <div className="containerInfoSquadGeral">
                Data da Venda
                <span className="numberGeral">{props.dadosSquad.dataExit}</span>
                <div className="iconGeral">
                  <RiCalendarScheduleLine />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.dadosSquad.sell === true && props.dadosSquad.buy === true && (
        <div className="cardGeral">
          <div className="containerCardGeral">
            <div className="title">Lucro com o Jogador</div>
            <div className="containerInfoGeral contract">
              <div className="containerInfoSquadGeral">
                Valor da Venda
                <span className="numberGeral" style={{ color: "#0bb32a" }}>
                  €{props.dadosSquad.valueTransfer || "N/A"}M
                </span>
              </div>
              -
              <div className="containerInfoSquadGeral">
                Valor da Compra
                <span className="numberGeral" style={{ color: "#c81419" }}>
                  €{props.dadosSquad.value || "N/A"}M
                </span>
              </div>
              =
              <div className="containerInfoSquadGeral">
                Lucro Total
                <span
                  className="numberGeral"
                  style={{
                    color:
                      props.dadosSquad.value && props.dadosSquad.valueTransfer
                        ? Number(props.dadosSquad.valueTransfer) -
                            Number(props.dadosSquad.value) >=
                          0
                          ? "#0bb32a"
                          : "#c81419"
                        : undefined,
                  }}
                >
                  {props.dadosSquad.value && props.dadosSquad.valueTransfer
                    ? `€${(
                        Number(props.dadosSquad.valueTransfer) -
                        Number(props.dadosSquad.value)
                      ).toFixed(2)}M`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from "react";
import "./Squad.css";
import { FaTrashCan } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Squad(props) {
  const formatContract = (contract) => {
    const years = contract - 1;
    const months = 11;
    return `${years}a ${months}m`;
  };

  const ordemAttack = ["PE", "PD", "ATA"];

  const atacantesOrdenados = (props.squad?.attackers || [])
    .slice()
    .sort(
      (a, b) =>
        ordemAttack.indexOf(a.detailPosition) -
        ordemAttack.indexOf(b.detailPosition)
    );

  const ordemMid = ["VOL", "ME", "MC", "MEI", "MD"];
  const meioOrdenado = (props.squad?.midfielders || [])
    .slice()
    .sort(
      (a, b) =>
        ordemMid.indexOf(a.detailPosition) - ordemMid.indexOf(b.detailPosition)
    );

  const ordemDef = ["LE", "ZAG", "LD"];
  const zagaOrdenada = (props.squad?.defenders || [])
    .slice()
    .sort(
      (a, b) =>
        ordemDef.indexOf(a.detailPosition) - ordemDef.indexOf(b.detailPosition)
    );

  const goleiros = (props.squad?.goalkeepers || []).slice();

  return (
    <div className="containerSquad">
      <div className="cardSquad">
        <div className="positionContainer">
          <div className="positonBarAttack"></div>
          <div className="positionNameAttack">Atacantes</div>
        </div>
        {atacantesOrdenados.map((jogador, index) => (
          <motion.div
            className="containerGeralPlayer"
            key={index}
            onClick={() => props.abrirModalJogador(jogador)}
            animate={
              props.modoSelecao
                ? {
                    x: [0, -0.8, 0.8, -0.8, 0.8, 0],
                    rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
                  }
                : {
                    x: 0,
                    rotate: 0,
                  }
            }
            transition={
              props.modoSelecao
                ? {
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: Math.random() * 0.5,
                  }
                : {
                    duration: 0.3,
                    ease: "easeOut",
                  }
            }
          >
            <div className="containerPlayer">
              <div className="namePlayer">
                {jogador.playerName}
                <div className="dadosPlayer">{jogador.detailPosition}</div>
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">
                  {jogador.ageRenovacao || jogador.age} anos
                </div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "attackers")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">
                €{jogador.valueRenovacao || jogador.value}M
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">€{jogador.salary}mil</div>
                <div className="dadosPlayer">
                  {formatContract(jogador.contract)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="cardSquad">
        <div className="positionContainer">
          <div className="positonBarMidfield"></div>
          <div className="positionNameMidfield">Meias</div>
        </div>
        {meioOrdenado.map((jogador, index) => (
          <motion.div
            className="containerGeralPlayer"
            key={index}
            onClick={() => props.abrirModalJogador(jogador)}
            animate={
              props.modoSelecao
                ? {
                    x: [0, -0.8, 0.8, -0.8, 0.8, 0],
                    rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
                  }
                : {
                    x: 0,
                    rotate: 0,
                  }
            }
            transition={
              props.modoSelecao
                ? {
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: Math.random() * 0.5,
                  }
                : {
                    duration: 0.3,
                    ease: "easeOut",
                  }
            }
          >
            <div className="containerPlayer">
              <div className="namePlayer">
                {jogador.playerName}
                <div className="dadosPlayer">{jogador.detailPosition}</div>
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">
                  {jogador.ageRenovacao || jogador.age} anos
                </div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "midfielders")}>
              {" "}
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">
                €{jogador.valueRenovacao || jogador.value}M
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">€{jogador.salary}mil</div>
                <div className="dadosPlayer">
                  {formatContract(jogador.contract)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="cardSquad">
        <div className="positionContainer">
          <div className="positonBarDefense"></div>
          <div className="positionNameDefense">Defensor</div>
        </div>
        {zagaOrdenada.map((jogador, index) => (
          <motion.div
            className="containerGeralPlayer"
            key={index}
            onClick={() => props.abrirModalJogador(jogador)}
            animate={
              props.modoSelecao
                ? {
                    x: [0, -0.8, 0.8, -0.8, 0.8, 0],
                    rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
                  }
                : {
                    x: 0,
                    rotate: 0,
                  }
            }
            transition={
              props.modoSelecao
                ? {
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: Math.random() * 0.5,
                  }
                : {
                    duration: 0.3,
                    ease: "easeOut",
                  }
            }
          >
            <div className="containerPlayer">
              <div className="namePlayer">
                {jogador.playerName}
                <div className="dadosPlayer">{jogador.detailPosition}</div>
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">
                  {jogador.ageRenovacao || jogador.age} anos
                </div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "defenders")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">
                €{jogador.valueRenovacao || jogador.value}M
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">€{jogador.salary}mil</div>
                <div className="dadosPlayer">
                  {formatContract(jogador.contract)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="cardSquad">
        <div className="positionContainer">
          <div className="positonBarGoalkeeper"></div>
          <div className="positionNameGoalkeeper">Goleiros</div>
        </div>
        {goleiros.map((jogador, index) => (
          <motion.div
            className="containerGeralPlayer"
            key={index}
            onClick={() => props.abrirModalJogador(jogador)}
            animate={
              props.modoSelecao
                ? {
                    x: [0, -0.8, 0.8, -0.8, 0.8, 0],
                    rotate: [0, -0.2, 0.2, -0.2, 0.2, 0],
                  }
                : {
                    x: 0,
                    rotate: 0,
                  }
            }
            transition={
              props.modoSelecao
                ? {
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: Math.random() * 0.5,
                  }
                : {
                    duration: 0.3,
                    ease: "easeOut",
                  }
            }
          >
            <div className="containerPlayer">
              <div className="namePlayer">
                {jogador.playerName}
                <div className="dadosPlayer">{jogador.detailPosition}</div>
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">
                  {jogador.ageRenovacao || jogador.age} anos
                </div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "goalkeepers")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">
                €{jogador.valueRenovacao || jogador.value}M
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">€{jogador.salary}mil</div>
                <div className="dadosPlayer">
                  {formatContract(jogador.contract)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

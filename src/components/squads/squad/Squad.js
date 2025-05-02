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

  return (
    <div className="containerSquad">
      <div className="cardSquad">
        <div className="positionContainer">
          <div className="positonBarAttack"></div>
          <div className="positionNameAttack">Atacantes</div>
        </div>
        {(props.squad?.attackers || []).map((jogador, index) => (
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
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">{jogador.age} anos</div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "attackers")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">€{jogador.value}M</div>
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
        {(props.squad?.midfielders || []).map((jogador, index) => (
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
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">{jogador.age} anos</div>
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
              <div className="namePlayer">€{jogador.value}M</div>
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
        {(props.squad?.defenders || []).map((jogador, index) => (
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
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">{jogador.age} anos</div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "defenders")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">€{jogador.value}M</div>
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
        {(props.squad?.goalkeepers || []).map((jogador, index) => (
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
                <div className="dadosPlayer">{jogador.shirtNumber}</div>
              </div>
              <div className="containerDadoPlayer">
                <div className="dadosPlayer">{jogador.age} anos</div>
                <div className="dadosPlayer">
                  {jogador.nation.toUpperCase()}
                </div>
              </div>
            </div>
            <div onClick={() => props.deletarJogador(jogador, "goalkeepers")}>
              <FaTrashCan size={14} />
            </div>
            <div className="containerValue">
              <div className="namePlayer">€{jogador.value}M</div>
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

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonGreen from "../../components/buttons/ButtonGreen.js";
import { GiSoccerField } from "react-icons/gi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbShirtSport } from "react-icons/tb";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaGlobeEurope } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { GiPoliceBadge } from "react-icons/gi";
import { MdAddLocationAlt } from "react-icons/md";
import { TbCalendarDollar } from "react-icons/tb";
import { GrDocumentTime } from "react-icons/gr";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";

export default function Modal(props) {
  const [jogadorData, setJogadorData] = useState({
    position: "",
    playerName: "",
    age: "",
    ageRenovacao: "",
    nation: "",
    shirtNumber: "",
    detailPosition: "",
    value: "",
    valueTransfer: "",
    valueRenovacao: "",
    salary: "",
    contract: "",
    buy: false,
    sell: "",
    dataArrival: "",
    dataExit: "",
    clubArrival: "",
    clubExit: "",
  });

  useEffect(() => {
    if (props.modoSelecao === "renovacao" && props.jogadorSelecionado) {
      const jogador = props.jogadorSelecionado;
      setJogadorData({
        position: jogador.position || "",
        playerName: jogador.playerName || "",
        age: jogador.age?.toString() || "",
        ageRenovacao: jogador.ageRenovacao?.toString() || "",
        nation: jogador.nation || "",
        shirtNumber: jogador.shirtNumber?.toString() || "",
        detailPosition: jogador.detailPosition?.toString() || "",
        value: jogador.value || "",
        valueRenovacao: jogador.valueRenovacao || "",
        valueTransfer: jogador.valueTransfer || "",
        salary: jogador.salary || "",
        contract: jogador.contract || "",
        buy: jogador.buy || false,
        sell: jogador.sell || "",
        dataArrival: jogador.dataArrival || "",
        dataExit: jogador.dataExit || "",
        clubArrival: jogador.clubArrival || "",
        clubExit: jogador.clubExit || "",
      });
    }
    if (props.modoSelecao === "renovacao") {
      setBuy(1);
    }
  }, [props.modoSelecao, props.jogadorSelecionado]);

  const [etapa, setEtapa] = useState(1);

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleValueChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    const formattedValue =
      value.length > 3 ? value.replace(/(\d)(?=(\d{3})+\.)/g, "$1.") : value;
    setJogadorData({ ...jogadorData, value: formattedValue });
  };

  const handleValueTransferChange = (e) => {
    const valueTransfer = e.target.value.replace(/[^\d.]/g, "");
    const formattedValue =
      valueTransfer.length > 3
        ? valueTransfer.replace(/(\d)(?=(\d{3})+\.)/g, "$1.")
        : valueTransfer;
    setJogadorData({ ...jogadorData, valueTransfer: formattedValue });
  };

  const handleSalaryChange = (e) => {
    const salary = e.target.value.replace(/[^\d]/g, "");
    setJogadorData({ ...jogadorData, salary });
  };

  const handleContractChange = (e) => {
    const contract = e.target.value.replace(/[^\d]/g, "");
    setJogadorData({ ...jogadorData, contract: contract.slice(0, 1) });
  };

  const handleNationChange = (e) => {
    const nation = e.target.value.toUpperCase().slice(0, 3);
    setJogadorData({ ...jogadorData, nation });
  };

  const handleShirtNumberChange = (e) => {
    const shirtNumber = e.target.value.replace(/[^\d]/g, "").slice(0, 2);
    setJogadorData({ ...jogadorData, shirtNumber });
  };

  const formatDate = (value) => {
    let data = value.replace(/[^0-9]/g, "");
    if (data.length <= 2) {
      return data;
    } else if (data.length <= 4) {
      return `${data.slice(0, 2)}/${data.slice(2)}`;
    } else if (data.length <= 8) {
      return `${data.slice(0, 2)}/${data.slice(2, 4)}/${data.slice(4, 8)}`;
    }
    return data;
  };

  const handleDataArrivalChange = (e) => {
    setJogadorData({ ...jogadorData, dataArrival: formatDate(e.target.value) });
  };

  const handleDataExitChange = (e) => {
    setJogadorData({ ...jogadorData, dataExit: formatDate(e.target.value) });
  };

  const handleClubArrivalChange = (e) => {
    const clubArrival = e.target.value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setJogadorData({ ...jogadorData, clubArrival });
  };

  const handleDetailPositionChange = (e) => {
    const detailPosition = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    setJogadorData({ ...jogadorData, detailPosition });
  };

  const handleClubExitChange = (e) => {
    const clubExit = e.target.value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setJogadorData({ ...jogadorData, clubExit });
  };

  const salvarJogador = () => {
    props.runWithDelayedLoad(async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;
      const clubeId = props.carrer.id;

      if (!uid || !clubeId) return;

      const docRef = doc(db, `users/${uid}/fifaData/${clubeId}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      const data = docSnap.data();

      const novoJogador = {
        playerName: jogadorData.playerName,
        shirtNumber: Number(jogadorData.shirtNumber),
        detailPosition: jogadorData.detailPosition,
        age: Number(jogadorData.age),
        nation: jogadorData.nation,
        value: jogadorData.value,
        salary: jogadorData.salary,
        contract: jogadorData.contract,
        dataArrival: jogadorData.dataArrival,
        dataExit: jogadorData.dataExit,
        clubArrival: jogadorData.clubArrival,
        clubExit: jogadorData.clubExit,
        buy: buy === 0,
        sell: false,
        position: jogadorData.position,
      };

      const novaSquad = {
        attackers: [],
        midfielders: [],
        defenders: [],
        goalkeepers: [],
        ...(data.squads?.[0] || {}),
      };

      switch (jogadorData.position) {
        case "Atacante":
          novaSquad.attackers.push(novoJogador);
          break;
        case "Meia":
          novaSquad.midfielders.push(novoJogador);
          break;
        case "Defensor":
          novaSquad.defenders.push(novoJogador);
          break;
        case "Goleiro":
          novaSquad.goalkeepers.push(novoJogador);
          break;
        default:
          return;
      }

      await updateDoc(docRef, {
        squads: [novaSquad],
      });

      props.onSave?.();
      props.fechar();
    });
  };

  const moverParaTransferencia = () => {
    props.runWithDelayedLoad(async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;
      const clubeId = props.carrer.id;

      if (!uid || !clubeId) return;

      const docRef = doc(db, `users/${uid}/fifaData/${clubeId}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const jogador = props.jogadorSelecionado;
      if (!jogador || !jogador.position) return;

      const squad = {
        attackers: [],
        midfielders: [],
        defenders: [],
        goalkeepers: [],
        transferList: [],
        ...(data.squads?.[0] || {}),
      };

      const removerJogador = (lista) =>
        lista.filter(
          (j) =>
            !(
              j.playerName === jogador.playerName &&
              j.shirtNumber === jogador.shirtNumber
            )
        );

      switch (jogador.position) {
        case "Atacante":
          squad.attackers = removerJogador(squad.attackers);
          break;
        case "Meia":
          squad.midfielders = removerJogador(squad.midfielders);
          break;
        case "Defensor":
          squad.defenders = removerJogador(squad.defenders);
          break;
        case "Goleiro":
          squad.goalkeepers = removerJogador(squad.goalkeepers);
          break;
        default:
          return;
      }

      const jogadorParaVenda = {
        ...jogador,
        valueTransfer: jogadorData.valueTransfer,
        dataExit: jogadorData.dataExit,
        clubExit: jogadorData.clubExit,
        sell: true,
      };

      squad.transferList.push(jogadorParaVenda);

      await updateDoc(docRef, {
        squads: [squad],
      });

      props.onSave?.();
      props.fechar();
    });
  };

  const editarJogador = () => {
    props.runWithDelayedLoad(async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;
      const clubeId = props.carrer.id;

      if (!uid || !clubeId) return;

      const docRef = doc(db, `users/${uid}/fifaData/${clubeId}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const jogador = props.jogadorSelecionado;
      if (!jogador) return;

      const squad = {
        attackers: [],
        midfielders: [],
        defenders: [],
        goalkeepers: [],
        ...(data.squads?.[0] || {}),
      };

      const atualizarJogador = (lista) =>
        lista.map((j) =>
          j.playerName === jogador.playerName &&
          j.shirtNumber === jogador.shirtNumber
            ? {
                ...j,
                ...jogadorData,
                age: Number(jogadorData.age),
                shirtNumber: Number(jogadorData.shirtNumber),
                detailPosition: jogadorData.detailPosition,
                value: jogadorData.value,
                salary: jogadorData.salary,
                contract: jogadorData.contract,
                dataArrival: jogadorData.dataArrival,
                dataExit: jogadorData.dataExit,
                clubArrival: jogadorData.clubArrival,
                clubExit: jogadorData.clubExit,
                position: jogadorData.position,
              }
            : j
        );

      switch (jogador.position) {
        case "Atacante":
          squad.attackers = atualizarJogador(squad.attackers);
          break;
        case "Meia":
          squad.midfielders = atualizarJogador(squad.midfielders);
          break;
        case "Defensor":
          squad.defenders = atualizarJogador(squad.defenders);
          break;
        case "Goleiro":
          squad.goalkeepers = atualizarJogador(squad.goalkeepers);
          break;
        default:
          return;
      }

      await updateDoc(docRef, {
        squads: [squad],
      });

      props.onSave?.();
      props.fechar();
    });
  };

  const [buy, setBuy] = useState(0);

  const buyOrNot = (purchase) => {
    setBuy(purchase);
    setJogadorData((prevData) => ({
      ...prevData,
      buy: purchase === 0,
    }));
  };

  return (
    <div onClick={props.fechar} className="containerModalCreateCarrer">
      <div
        className={
          props.modoSelecao === "venda"
            ? "cardModalCreateCarrerSell"
            : "cardModalCreateCarrer"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="containerHeader">
          {props.modoSelecao !== "venda" && (
            <>
              {etapa === 1 && (
                <div className="addClub">Informações do Jogador</div>
              )}
              {etapa === 2 && (
                <div className="addClub">Informações do Contrato</div>
              )}
            </>
          )}
          {props.modoSelecao === "venda" && (
            <>
              <div className="allDivCreateCarrer">
                Venda de
                <div className="divCreateCarrer">
                  {props.jogadorSelecionado.playerName}
                </div>
              </div>
            </>
          )}
          <div onClick={props.fechar} className="closeModalCreateCarrer1">
            <IoMdClose size={25} />
          </div>
        </div>

        {props.modoSelecao !== "venda" && props.modoSelecao !== "renovacao" && (
          <div className="containerButtonsModalBuy">
            <div
              onClick={() => buyOrNot(0)}
              className={`buttonsPositionBuy ${
                buy === 0 ? "selectedPosition" : ""
              }`}
            >
              Contratação
            </div>

            <div
              onClick={() => buyOrNot(1)}
              className={`buttonsPositionBuy ${
                buy === 1 ? "selectedPosition" : ""
              }`}
            >
              Elenco
            </div>
          </div>
        )}

        <div className="containerCreateCarrer">
          {etapa === 1 && (
            <>
              {props.modoSelecao !== "venda" && (
                <>
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <GiSoccerField />
                    </div>
                    <select
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        marginRight: "4px",
                      }}
                      className="inputsCreateCarrer"
                      name="nation"
                      value={jogadorData.position}
                      onChange={(e) =>
                        setJogadorData({
                          ...jogadorData,
                          position: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Selecione a posição
                      </option>
                      <option value="Atacante">Atacante</option>
                      <option value="Meia">Meia</option>
                      <option value="Defensor">Defensor</option>
                      <option value="Goleiro">Goleiro</option>
                    </select>
                  </div>
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <MdDriveFileRenameOutline />
                    </div>
                    <input
                      placeholder="Nome"
                      className="inputsCreateCarrer"
                      type="text"
                      name="nome"
                      value={jogadorData.playerName}
                      onChange={(e) =>
                        setJogadorData({
                          ...jogadorData,
                          playerName: formatName(e.target.value),
                        })
                      }
                    />
                  </div>
                  {props.modoSelecao !== "renovacao" && (
                    <div className="allInputsCreateCarrer">
                      <div className="iconForInputsCreateCarrer">
                        <IoCalendarNumberOutline />
                      </div>
                      <input
                        placeholder="Idade"
                        className="inputsCreateCarrer"
                        type="number"
                        name="idade"
                        value={jogadorData.age}
                        onChange={(e) =>
                          setJogadorData({
                            ...jogadorData,
                            age: e.target.value.slice(0, 2),
                          })
                        }
                      />
                    </div>
                  )}
                  {props.modoSelecao === "renovacao" && (
                    <div className="allInputsCreateCarrer">
                      <div className="iconForInputsCreateCarrer">
                        <IoCalendarNumberOutline />
                      </div>
                      <input
                        placeholder="Idade"
                        className="inputsCreateCarrer"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        name="idade"
                        value={jogadorData.ageRenovacao}
                        onChange={(e) => {
                          setJogadorData({
                            ...jogadorData,
                            ageRenovacao: e.target.value,
                          });
                        }}
                      />
                    </div>
                  )}
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <FaGlobeEurope />
                    </div>
                    <input
                      placeholder="Nacionalidade"
                      className="inputsCreateCarrer"
                      type="text"
                      name="nacionalidade"
                      value={jogadorData.nation}
                      onChange={handleNationChange}
                    />
                  </div>
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <TbShirtSport />
                    </div>
                    <input
                      placeholder="Número da Camisa"
                      className="inputsCreateCarrer"
                      type="number"
                      name="numero da camisa"
                      value={jogadorData.shirtNumber}
                      onChange={handleShirtNumberChange}
                    />
                  </div>
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <MdAddLocationAlt />
                    </div>
                    <input
                      placeholder="Posição"
                      className="inputsCreateCarrer"
                      type="text"
                      name="posicao"
                      value={jogadorData.detailPosition}
                      onChange={handleDetailPositionChange}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {etapa === 2 && (
            <>
              {props.modoSelecao !== "venda" && (
                <>
                  {buy === 0 && (
                    <>
                      <div className="allInputsCreateCarrer">
                        <div className="iconForInputsCreateCarrer">
                          <GiMoneyStack />
                        </div>
                        <input
                          placeholder="Valor da Compra"
                          className="inputsCreateCarrer"
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          name="valor da compra"
                          value={jogadorData.value}
                          onChange={handleValueChange}
                        />
                      </div>
                      <div className="allInputsCreateCarrer">
                        <div className="iconForInputsCreateCarrer">
                          <GiPoliceBadge />
                        </div>
                        <input
                          placeholder="Clube"
                          className="inputsCreateCarrer"
                          type="text"
                          name="clube"
                          value={jogadorData.clubArrival}
                          onChange={handleClubArrivalChange}
                        />
                      </div>
                      <div className="allInputsCreateCarrer">
                        <div className="iconForInputsCreateCarrer">
                          <TbCalendarDollar />
                        </div>
                        <input
                          placeholder="Data da Contratação"
                          className="inputsCreateCarrer"
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          name="data da contratacao"
                          value={jogadorData.dataArrival}
                          onChange={handleDataArrivalChange}
                        />
                      </div>
                    </>
                  )}
                  {buy === 1 && (
                    <>
                      {props.modoSelecao !== "renovacao" && (
                        <div className="allInputsCreateCarrer">
                          <div className="iconForInputsCreateCarrer">
                            <GiMoneyStack />
                          </div>
                          <input
                            placeholder="Valor do Jogador"
                            className="inputsCreateCarrer"
                            type="text"
                            inputMode="text"
                            autoComplete="off"
                            name="valor do jogador"
                            value={jogadorData.value}
                            onChange={handleValueChange}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {props.modoSelecao === "renovacao" && (
                    <div className="allInputsCreateCarrer">
                      <div className="iconForInputsCreateCarrer">
                        <GiMoneyStack />
                      </div>
                      <input
                        placeholder="Valor do Jogador"
                        className="inputsCreateCarrer"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        name="valor renovacao"
                        value={jogadorData.valueRenovacao}
                        onChange={(e) => {
                          setJogadorData({
                            ...jogadorData,
                            valueRenovacao: e.target.value,
                          });
                        }}
                      />
                    </div>
                  )}

                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <TbPigMoney />
                    </div>
                    <input
                      placeholder="Salário do Jogador"
                      className="inputsCreateCarrer"
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      name="salario do jogador"
                      value={jogadorData.salary}
                      onChange={handleSalaryChange}
                    />
                  </div>
                  <div className="allInputsCreateCarrer">
                    <div className="iconForInputsCreateCarrer">
                      <GrDocumentTime />
                    </div>
                    <input
                      placeholder="Tempo de Contrato"
                      className="inputsCreateCarrer"
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      name="tempo de contrato"
                      value={jogadorData.contract}
                      onChange={handleContractChange}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {props.modoSelecao === "venda" && (
            <>
              <div className="allInputsCreateCarrer">
                <div className="iconForInputsCreateCarrer">
                  <GiMoneyStack />
                </div>
                <input
                  placeholder="Valor da Venda"
                  className="inputsCreateCarrer"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  name="valor da venda"
                  value={jogadorData.valueTransfer}
                  onChange={handleValueTransferChange}
                />
              </div>
              <div className="allInputsCreateCarrer">
                <div className="iconForInputsCreateCarrer">
                  <TbCalendarDollar />
                </div>
                <input
                  placeholder="Data da Venda"
                  className="inputsCreateCarrer"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  name="data da venda"
                  value={jogadorData.dataExit}
                  onChange={handleDataExitChange}
                />
              </div>
              <div className="allInputsCreateCarrer">
                <div className="iconForInputsCreateCarrer">
                  <GiPoliceBadge />
                </div>
                <input
                  placeholder="Clube"
                  className="inputsCreateCarrer"
                  type="text"
                  name="clube"
                  value={jogadorData.clubExit}
                  onChange={handleClubExitChange}
                />
              </div>
            </>
          )}
        </div>

        {props.modoSelecao !== "venda" && (
          <>
            {etapa === 1 ? (
              <ButtonGreen
                nameButtonSaveCarrer="Próximo"
                onClick={() => setEtapa(2)}
              />
            ) : (
              <div className="containerButtonBackOrSave">
                <ButtonGreen
                  nameButtonSaveCarrerBack="Voltar"
                  onClick={() => setEtapa(1)}
                />
                <ButtonGreen
                  nameButtonSaveCarrer="Salvar"
                  onClick={
                    props.modoSelecao === "renovacao"
                      ? editarJogador
                      : salvarJogador
                  }
                />
              </div>
            )}
          </>
        )}
        {props.modoSelecao === "venda" && (
          <>
            <div className="containerButtonBackOrSave">
              <ButtonGreen
                nameButtonSaveCarrer="Confirmar Venda"
                onClick={moverParaTransferencia}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

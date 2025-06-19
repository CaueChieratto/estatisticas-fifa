import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useParams } from "react-router-dom";
import Load from "../../components/load/load.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./PageForPlayer.css";
import { motion, useAnimation } from "framer-motion";
import Header from "../../components/squads/header/Header.js";
import PlayerData from "../../components/thingsForPageOfPlayers/playerData/playerData.js";
import PlayerSeasons from "../../components/thingsForPageOfPlayers/playerSeasons/playerSeasons.js";
import PlayerTotal from "../../components/thingsForPageOfPlayers/playerTotal/playerTotal.js";

export default function PageForPlayer() {
  const { playerName } = useParams();
  const [clubData, setClubData] = useState(null);
  const [jogador, setJogador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Elenco");
  const controls = useAnimation();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        console.warn("Usuário não autenticado");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [playerName]);

  useEffect(() => {
    if (selectedTab === "Wrapper") {
      controls.start({ x: 0 });
    } else if (selectedTab === "Elenco") {
      controls.start({ x: -window.innerWidth });
    } else if (selectedTab === "Geral") {
      controls.start({ x: -window.innerWidth * 2 });
    }
  }, [selectedTab, controls]);

  useEffect(() => {
    setSelectedTab("Wrapper");
    controls.start({ x: 0 });
  }, []);

  async function fetchData() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;
      if (!uid || !playerName) return;

      const clubsSnapshot = await getDocs(
        collection(db, `users/${uid}/fifaData`)
      );
      for (const clubDoc of clubsSnapshot.docs) {
        const club = clubDoc.data();
        const temporadas = club?.seasons || [];

        for (const temporada of temporadas) {
          const jogadorEncontrado = temporada.players?.find((p) =>
            nomesSaoIguais(p.playerName, decodeURIComponent(playerName))
          );
          if (jogadorEncontrado) {
            setJogador(jogadorEncontrado);
            setClubData(club);
            return;
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function nomesSaoIguais(nome1, nome2) {
    const normalizar = (nome) =>
      nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const n1 = normalizar(nome1).split(" ");
    const n2 = normalizar(nome2).split(" ");

    const primeiro1 = n1[0];
    const sobrenome1 = n1[n1.length - 1];

    const primeiro2 = n2[0];
    const sobrenome2 = n2[n2.length - 1];

    const iniciaisIguais =
      primeiro1[0] === primeiro2[0] || primeiro1 === primeiro2;

    return sobrenome1 === sobrenome2 && iniciaisIguais;
  }

  if (loading) return <Load />;
  if (!jogador || !clubData) return <p>Jogador não encontrado.</p>;

  const temporadasDoJogador = clubData.seasons?.filter((temporada) =>
    temporada.players?.some((p) =>
      nomesSaoIguais(p.playerName, jogador.playerName)
    )
  );

  function encontrarNoSquad(playerName) {
    if (!clubData?.squads) return null;

    for (const squad of clubData.squads) {
      const todasAsPosicoes = [
        ...(squad.goalkeepers || []),
        ...(squad.defenders || []),
        ...(squad.midfielders || []),
        ...(squad.attackers || []),
        ...(squad.transferList || []),
      ];

      const jogadorEncontrado = todasAsPosicoes.find((jogadorSquad) =>
        nomesSaoIguais(jogadorSquad.playerName, playerName)
      );

      if (jogadorEncontrado) {
        return jogadorEncontrado;
      }
    }

    return null;
  }

  const dadosSquad = encontrarNoSquad(jogador.playerName);

  function agruparTitulosPorTemporada(titulos) {
    const titulosPorTemporada = {};

    titulos.forEach((titulo) => {
      titulo.seasons.forEach((temporada) => {
        if (!titulosPorTemporada[temporada]) {
          titulosPorTemporada[temporada] = [];
        }
        titulosPorTemporada[temporada].push({
          league: titulo.league,
          leagueImage: titulo.leagueImage,
        });
      });
    });

    return titulosPorTemporada;
  }

  const titulosPorTemporada = agruparTitulosPorTemporada(
    clubData.trophies || []
  );

  function calcularTotais(temporadas) {
    let total = {
      jogos: 0,
      gols: 0,
      assistencias: 0,
      cleanSheets: 0,
      rating: 0,
      balonDors: 0,
    };

    let somaRating = 0;
    let totalPartidasComNota = 0;

    temporadas.forEach((temporada) => {
      const dadosJogador = temporada.players.find((p) =>
        nomesSaoIguais(p.playerName, jogador.playerName)
      );

      if (dadosJogador) {
        total.balonDors += Number(dadosJogador.balonDors) || 0;

        if (dadosJogador.leagues?.length > 0) {
          dadosJogador.leagues.forEach((liga) => {
            const jogos = Number(liga.games) || 0;
            const nota = Number(liga.rating);

            total.jogos += jogos;
            total.gols += Number(liga.goals) || 0;
            total.assistencias += Number(liga.assists) || 0;
            total.cleanSheets += Number(liga.cleanSheets) || 0;

            if (!isNaN(nota) && jogos > 0) {
              somaRating += nota * jogos;
              totalPartidasComNota += jogos;
            }
          });
        }
      }
    });

    if (totalPartidasComNota > 0) {
      total.rating = (somaRating / totalPartidasComNota).toFixed(2);
    }

    return total;
  }

  const totais = calcularTotais(temporadasDoJogador);

  function contarTitulosJogador(titulos, temporadas, jogador) {
    const contagem = {};

    titulos.forEach((titulo) => {
      titulo.seasons.forEach((seasonStr) => {
        const jogadorParticipou = temporadas.some((temporada) => {
          return (
            mapearTemporadaParaAno(temporada.season) === seasonStr &&
            temporada.players?.some((p) =>
              nomesSaoIguais(p.playerName, jogador.playerName)
            )
          );
        });

        if (jogadorParticipou) {
          if (!contagem[titulo.league]) {
            contagem[titulo.league] = {
              quantidade: 0,
              leagueImage: titulo.leagueImage,
            };
          }
          contagem[titulo.league].quantidade += 1;
        }
      });
    });

    return contagem;
  }

  const contagemTitulos = contarTitulosJogador(
    clubData.trophies || [],
    temporadasDoJogador,
    jogador
  );

  function mapearTemporadaParaAno(temporadaNumero) {
    const anoInicial = 2024;
    const temporadaIndex = Number(temporadaNumero) - 1;
    const ano1 = String((anoInicial + temporadaIndex) % 100).padStart(2, "0");
    const ano2 = String((anoInicial + temporadaIndex + 1) % 100).padStart(
      2,
      "0"
    );
    return `${ano1}/${ano2}`;
  }

  function formatarTemporada(numero) {
    const anoInicial = 2024 + (numero - 1);
    const anoFinal = (anoInicial + 1) % 100;

    return `${anoInicial % 100}/${anoFinal.toString().padStart(2, "0")}`;
  }

  function calcularMaiorOverall(temporadas) {
    let maior = 0;

    temporadas.forEach((temporada) => {
      const dadosJogador = temporada.players.find((p) =>
        nomesSaoIguais(p.playerName, jogador.playerName)
      );

      if (dadosJogador && Number(dadosJogador.overall) > maior) {
        maior = Number(dadosJogador.overall);
      }
    });

    return maior;
  }

  const maiorOverall = calcularMaiorOverall(temporadasDoJogador);

  function calcularTotaisPorLiga(temporadas) {
    const totaisPorLiga = {};

    temporadas.forEach((temporada) => {
      const dadosJogador = temporada.players.find((p) =>
        nomesSaoIguais(p.playerName, jogador.playerName)
      );

      if (dadosJogador?.leagues?.length > 0) {
        dadosJogador.leagues.forEach((liga) => {
          const nomeLiga = liga.league;

          if (!totaisPorLiga[nomeLiga]) {
            totaisPorLiga[nomeLiga] = {
              jogos: 0,
              gols: 0,
              assistencias: 0,
              somatorioNota: 0,
              notasValidas: 0,
              leagueImage: liga.leagueImage,
              balonDors: 0,
              semSoferGols: 0,
            };
          }

          const total = totaisPorLiga[nomeLiga];

          total.jogos += Number(liga.games) || 0;
          total.gols += Number(liga.goals) || 0;
          total.assistencias += Number(liga.assists) || 0;
          total.balonDors += Number(liga.balonDors) || 0;
          total.semSoferGols += Number(liga.cleanSheets) || 0;

          const nota = parseFloat(liga.rating);
          if (!isNaN(nota)) {
            total.somatorioNota += nota;
            total.notasValidas += 1;
          }
        });
      }
    });

    Object.values(totaisPorLiga).forEach((liga) => {
      liga.rating =
        liga.notasValidas > 0
          ? (liga.somatorioNota / liga.notasValidas).toFixed(2)
          : "N/A";
    });

    return totaisPorLiga;
  }

  const totaisPorLiga = calcularTotaisPorLiga(temporadasDoJogador);

  return (
    <div className="bodyPagePlayer">
      <Header
        maiorOverall={maiorOverall}
        Back={() => navigate(-1)}
        jogador={jogador}
        setSelectedTab={(tab) => {
          setSelectedTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });

          if (tab === "Wrapper") controls.start({ x: 0 });
          if (tab === "Elenco") controls.start({ x: -window.innerWidth });
          if (tab === "Geral") controls.start({ x: -window.innerWidth * 2 });
        }}
        selectedTab={selectedTab}
        first="Jogador"
        firstStyle="Wrapper"
        second="Temporadas"
        secondStyle="Elenco"
        third="Total"
        thirdStyle="Geral"
      />

      <div className="carouselSquads">
        <motion.div
          className="carouselTrack"
          drag="x"
          dragConstraints={{ left: -window.innerWidth * 2, right: 0 }}
          onDragEnd={(event, info) => {
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            const scrollToTop = () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            };

            if (offset < -150 || velocity < -1000) {
              if (selectedTab === "Wrapper") {
                setSelectedTab("Elenco");
                controls.start({ x: -window.innerWidth });
                scrollToTop();
              } else if (selectedTab === "Elenco") {
                setSelectedTab("Geral");
                controls.start({ x: -window.innerWidth * 2 });
                scrollToTop();
              }
            } else if (offset > 150 || velocity > 1000) {
              if (selectedTab === "Geral") {
                setSelectedTab("Elenco");
                controls.start({ x: -window.innerWidth });
                scrollToTop();
              } else if (selectedTab === "Elenco") {
                setSelectedTab("Wrapper");
                controls.start({ x: 0 });
                scrollToTop();
              }
            } else {
              if (selectedTab === "Wrapper") {
                controls.start({ x: 0 });
              }
              if (selectedTab === "Elenco") {
                controls.start({ x: -window.innerWidth });
              }
              if (selectedTab === "Geral") {
                controls.start({ x: -window.innerWidth * 2 });
              }
            }
          }}
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          initial={{ x: 0 }}
        >
          <div className="carouselSlide">
            <div className="containerGeralPlayers">
              {dadosSquad && <PlayerData dadosSquad={dadosSquad} />}
            </div>
          </div>

          <div className="carouselSlide">
            <div className="containerGeralPlayers">
              {temporadasDoJogador.map((temporada) => {
                const dadosJogador = temporada.players.find((p) =>
                  nomesSaoIguais(p.playerName, jogador.playerName)
                );
                if (!dadosJogador) return null;

                return (
                  <PlayerSeasons
                    posicao={jogador.position}
                    key={temporada.id}
                    dadosJogador={dadosJogador}
                    temporada={temporada}
                    titulosPorTemporada={titulosPorTemporada}
                    formatarTemporada={formatarTemporada}
                  />
                );
              })}
            </div>
          </div>

          <div className="carouselSlide">
            <div className="containerGeralPlayers">
              <PlayerTotal
                posicao={jogador.position}
                totais={totais}
                totaisPorLiga={totaisPorLiga}
                contagemTitulos={contagemTitulos}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

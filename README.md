# Aplicativo de Gerenciamento de Carreira Esportiva

## Índice

- [Demonstração do Projeto](#demonstração-do-projeto)
- [Descrição Geral](#descrição-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura de Dados](#estrutura-de-dados)
- [Fluxo de Usuário](#fluxo-de-usuário)
- [Principais Componentes](#principais-componentes)
- [Integração com Firebase](#integração-com-firebase)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Autor](#autor)

---

## Demonstração do Projeto

Veja abaixo alguns gifs que mostram a interface e funcionalidades principais do app:

![Image](https://github.com/user-attachments/assets/1885a3d9-c198-47f3-bb2f-d09794f81ed0)
![Image](https://github.com/user-attachments/assets/dddd9af9-5393-4bdc-93e0-c88c0d5569e8)
![Image](https://github.com/user-attachments/assets/18158a13-b9ce-4ee7-a09e-e82301939862)
![Image](https://github.com/user-attachments/assets/3c1f955d-1081-431b-afeb-e56ec5c31e12)
![Image](https://github.com/user-attachments/assets/7eaaba59-c02e-4e6c-81da-7998ad278f78)
![Image](https://github.com/user-attachments/assets/fe4c3f68-263f-42e5-9ff7-5e50457a7ae9)
![Image](https://github.com/user-attachments/assets/6e0ae872-521b-43b0-b6ff-fe1004d41e0e)

---

## Descrição Geral

Aplicativo completo desenvolvido individualmente para criação e gerenciamento de carreiras esportivas personalizadas. Permite organizar clubes, elencos, ligas, troféus e temporadas, além de calcular estatísticas detalhadas ao longo do tempo.

O projeto utiliza Firebase para autenticação e armazenamento em nuvem, garantindo segurança e persistência dos dados. A interface é dinâmica, responsiva e permite manipulação em tempo real das informações.

---

## Funcionalidades Principais

- **Autenticação:** Login seguro com Firebase Authentication.
- **Gestão de Clubes:** Criação, edição e exclusão de clubes personalizados.
- **Elencos (Squads):** Cadastro e organização dos jogadores por posição (ataque, meio, defesa, goleiro).
- **Temporadas:** Registro de temporadas, com histórico de jogadores e estatísticas.
- **Transferências:** Controle de transferências de jogadores entre clubes, incluindo histórico de entrada e saída.
- **Troféus:** Registro de conquistas por clube e temporada.
- **Estatísticas:** Cálculo automático de gols, assistências, jogos, clean sheets, etc., por jogador e por liga.
- **UUIDs:** Geração de identificadores únicos para temporadas, jogadores e clubes.
- **Interface Dinâmica:** Atualização em tempo real dos dados na interface.
- **Filtros e Busca:** Busca por jogadores, clubes e temporadas.
- **Visualização Detalhada:** Páginas específicas para cada jogador, clube e temporada.

---

## Estrutura de Dados

Os dados são armazenados no Firestore, organizados da seguinte forma:

- **Usuário**
  - `users/{uid}/fifaData/{clubId}`
    - `club`: Nome do clube
    - `date`: Data de criação
    - `nation`: Nacionalidade
    - `leagues`: Ligas associadas
    - `seasons`: Array de temporadas
      - `id`: UUID da temporada
      - `season`: Número/ano da temporada
      - `players`: Array de jogadores
        - `playerName`, `shirtNumber`, `position`, `stats`, etc.
    - `squads`: Array de elencos
      - `attackers`, `midfielders`, `defenders`, `goalkeepers`
      - `transferList`: Jogadores em transferência
    - `trophies`: Array de troféus conquistados
    - `uuid`: Identificador único do clube

---

## Fluxo de Usuário

1. **Login:** Usuário faz login via Firebase Authentication.
2. **Dashboard:** Visualiza clubes cadastrados ou cria um novo.
3. **Gestão de Clubes:** Pode editar informações do clube, adicionar/eliminar temporadas, jogadores e troféus.
4. **Elenco:** Adiciona jogadores ao elenco, define posição, número, estatísticas e histórico de transferências.
5. **Temporadas:** Cria temporadas, registra jogadores participantes e suas estatísticas.
6. **Transferências:** Move jogadores entre clubes, registra data, valor e clube de destino/origem.
7. **Visualização:** Acompanha estatísticas agregadas, histórico de conquistas e evolução dos jogadores.

---

## Principais Componentes

- [`src/components/player/Infos.js`](src/components/player/Infos.js): Exibe informações detalhadas de cada jogador.
- [`src/modal/squads/Modal.js`](src/modal/squads/Modal.js): Modal para adicionar/editar jogadores no elenco.
- [`src/pages/PageForPlayer/PageForPlayer.js`](src/pages/PageForPlayer/PageForPlayer.js): Página detalhada de um jogador.
- [`src/pages/pageForTeams/PageForTeams.js`](src/pages/pageForTeams/PageForTeams.js): Página de gerenciamento de clubes e temporadas.
- [`src/components/squads/geral/transfer/modal/modal.js`](src/components/squads/geral/transfer/modal/modal.js): Modal para transferências de jogadores.
- [`src/modal/CreateNewCarrer.js`](src/modal/CreateNewCarrer.js): Modal para criação de novo clube/carreira.

---

## Integração com Firebase

- **Autenticação:** Utiliza Firebase Authentication para login seguro.
- **Firestore:** Armazena todos os dados de clubes, temporadas, jogadores e troféus.
- **Operações CRUD:** Adição, edição e remoção de dados são feitas via métodos do Firestore (`getDoc`, `setDoc`, `updateDoc`, `deleteDoc`).
- **Atualização em Tempo Real:** Mudanças nos dados refletem imediatamente na interface.

---

## Como Executar o Projeto

1. **Pré-requisitos:**

   - Node.js e npm instalados.
   - Conta no Firebase e projeto configurado.

2. **Clonar o repositório:**

   ```sh
   git clone <url-do-repo>
   cd estatisticas-fifa
   ```

3. **Instalar dependências:**

   ```sh
   npm install
   ```

4. **Configurar Firebase:**

   - Adicione suas credenciais do Firebase em `src/firebase/` conforme instruções do Firebase.

5. **Executar o projeto:**

   ```sh
   npm start
   ```

6. **Acessar:**
   - Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Tecnologias Utilizadas

- ReactJS
- JavaScript (ES6+)
- Firebase Authentication
- Firebase Firestore
- UUID

---

## Autor

Desenvolvido por Cauê Chieratto.  
Contato: cauebc.chieratto@gmail.com

---

Obrigado por visitar o projeto!

import React, { useEffect, useState } from "react";
import { leagueLevels } from "../../leaguesAndTrophies/leaguesAndTrophies.js";

export default function LeagueTotal(props) {
  const [leagueStats, setLeagueStats] = useState({});

  useEffect(() => {
    if (props.seasons && Array.isArray(props.seasons) && props.player) {
      calculateLeagueStats();
    }
  }, [props.seasons, props.player]);

  const calculateLeagueStats = () => {
    const stats = {};

    props.seasons.forEach((season) => {
      season.players?.forEach((player) => {
        if (player.playerName === props.player.playerName) {
          player.leagues?.forEach((league) => {
            const {
              league: leagueName,
              leagueImage,
              games,
              goals,
              assists,
              cleanSheets,
              rating,
            } = league;

            const name = leagueName || "Undefined";
            const image = leagueImage || "";

            if (!stats[name]) {
              stats[name] = {
                leagueImage: image,
                games: 0,
                goals: 0,
                assists: 0,
                cleanSheets: 0,
                ratingSum: 0,
                ratingCount: 0,
              };
            }

            stats[name].games += Number(games || 0);
            stats[name].goals += Number(goals || 0);
            stats[name].assists += Number(assists || 0);
            stats[name].cleanSheets += Number(cleanSheets || 0);
            stats[name].ratingSum += Number(rating || 0);
            stats[name].ratingCount += rating ? 1 : 0;
          });
        }
      });
    });

    Object.keys(stats).forEach((name) => {
      stats[name].rating =
        stats[name].ratingCount > 0
          ? (stats[name].ratingSum / stats[name].ratingCount).toFixed(2)
          : 0;

      delete stats[name].ratingSum;
      delete stats[name].ratingCount;
    });

    setLeagueStats(stats);
  };

  const sortedLeagues = Object.entries(leagueStats).sort(([aName], [bName]) => {
    const aLevel = leagueLevels[aName] ?? 50;
    const bLevel = leagueLevels[bName] ?? 50;
    return aLevel - bLevel;
  });

  return (
    <div className="containerStatsLeagues">
      {Object.keys(leagueStats).length === 0 ? (
        <div>Nenhuma estatistica disponivel</div>
      ) : (
        sortedLeagues.map(([leagueName, league], index) => (
          <div className="wrapperStatsLeagues" key={index}>
            <div className="containerIMGleagues">
              <div className="containerNameLeague">
                <img
                  className="leagues"
                  src={league.leagueImage}
                  alt={leagueName}
                />
                {leagueName}
              </div>
            </div>
            <span className="statsNumber statsNumberSmall">{league.games}</span>
            <span className="statsNumber statsNumberSmall">
              {league.goals + league.assists}
            </span>
            {props.playerPosition === 0 && (
              <span className="statsNumber statsNumberSmall">
                {league.goals}
              </span>
            )}
            {props.playerPosition === 1 && (
              <span className="statsNumber statsNumberSmall">
                {league.cleanSheets}
              </span>
            )}
            <span className="statsNumber statsNumberSmall">
              {league.assists}
            </span>
            <span
              className="statsNumber overallSmall"
              style={{
                background:
                  league.rating <= 6
                    ? "#E03131"
                    : league.rating <= 6.5
                    ? "#FD7E14"
                    : league.rating <= 7
                    ? "#FCC419"
                    : league.rating <= 7.5
                    ? "#66A80F"
                    : league.rating <= 8.5
                    ? "#2B8A3E"
                    : league.rating <= 9
                    ? "#1E88E5"
                    : "#00FF00",
              }}
            >
              {league.rating}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

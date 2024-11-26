import React, { useEffect, useState } from "react";

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

  return (
    <div className="containerStatsLeagues">
      {Object.keys(leagueStats).length === 0 ? (
        <div>Nenhuma estatistica disponivel</div>
      ) : (
        Object.entries(leagueStats).map(([leagueName, league], index) => (
          <div className="wrapperStatsLeagues" key={index}>
            <div className="containerIMGleagues">
              <img
                className="leagues"
                src={league.leagueImage}
                alt={leagueName}
              />
              {leagueName}
            </div>
            <span className="statsNumber">{league.games}</span>
            {props.playerPosition === 0 && (
              <span className="statsNumber">{league.goals}</span>
            )}
            {props.playerPosition === 1 && (
              <span className="statsNumber">{league.cleanSheets}</span>
            )}
            <span className="statsNumber">{league.assists}</span>
            <span
              className="statsNumber"
              style={{
                color:
                  league.rating >= 9
                    ? "#1E88E5"
                    : league.rating >= 8
                    ? "#33C771"
                    : league.rating >= 7
                    ? "#F08022"
                    : "#DD3636",
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
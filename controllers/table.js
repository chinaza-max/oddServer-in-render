const competitionRegistration = require("../MongoDB/Model/competitionRegistration");
const Result = require("../MongoDB/Model/result");
const OldTable = require("../MongoDB/Model/storedTable");
const TeamsName = require("../MongoDB/Model/team");


const leagueTable = async (req, res) => {
  try {
    const results = await Result();
    const competitionId = req.params.id;
    const tableRaw = await results.getTable(competitionId);
    const oldTable = await OldTable.findOne({ competitionId: competitionId });
    if (oldTable) {
      if (oldTable.numberOfMatches == tableRaw.length) {
        console.log("old table", oldTable);
        return res.status(200).json(oldTable.table);
      }
    }
    if (!results) {
      let competition = await competitionRegistration.findById(competitionId);
      let table = [];
      let teams = competition.teams;
      const teamName = await TeamsName.find({
        '_id': {
          $in: teams

        }
      });
      for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < teamName.length; j++) {
          if (String(teams[i]) == teamName[j].id) {
            table.push({
              club: teamName[j].teamName,
              id: String(teams[i]),
              matchesPlayed: 0,
              win: 0,
              lose: 0,
              draw: 0,
              goalsScored: 0,
              goalsConceded: 0,
              points: 0,
            })
          }

        }
      }
      await OldTable.create(
        {
          table: table,
          numberOfMatches: 0,
          competitionId: competitionId,
        }
      );

      return res.status(200).json(table);
    }
    let table = [];
    let teams = tableRaw[0].competition.teams;

    const teamName = await TeamsName.find({
      '_id': {
        $in: teams

      }
    });
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teamName.length; j++) {
        if (String(teams[i]) == teamName[j].id) {
          table.push({
            club: teamName[j].teamName,
            id: String(teams[i]),
            matchesPlayed: 0,
            win: 0,
            lose: 0,
            draw: 0,
            goalsScored: 0,
            goalsConceded: 0,
            points: 0,
          })
        }

      }
    }


    for (let team = 0; team < table.length; team++) {
      for (let index = 0; index < tableRaw.length; index++) {
        if (
          String(tableRaw[index].fixture.homeTeamId) === String(table[team].id)
        ) {
          if (
            tableRaw[index].scores.home.goal > tableRaw[index].scores.away.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 1;
            table[team].lose += 0;
            table[team].draw += 0;
            table[team].goalsScored += tableRaw[index].scores.home.goal;
            table[team].goalsConceded += tableRaw[index].scores.away.goal;
            table[team].points += 3;
          } else if (
            tableRaw[index].scores.home.goal < tableRaw[index].scores.away.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 0;
            table[team].lose += 1;
            table[team].draw += 0;
            table[team].goalsScored += tableRaw[index].scores.home.goal;
            table[team].goalsConceded += tableRaw[index].scores.away.goal;
            table[team].points += 0;
          } else if (
            tableRaw[index].scores.home.goal ===
            tableRaw[index].scores.away.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 0;
            table[team].lose += 0;
            table[team].draw += 1;
            table[team].goalsScored += tableRaw[index].scores.home.goal;
            table[team].goalsConceded += tableRaw[index].scores.away.goal;
            table[team].points += 1;
          }
        } else if (
          String(tableRaw[index].fixture.awayTeamId) === String(table[team].id)
        ) {
          if (
            tableRaw[index].scores.away.goal > tableRaw[index].scores.home.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 1;
            table[team].lose += 0;
            table[team].draw += 0;
            table[team].goalsScored += tableRaw[index].scores.away.goal;
            table[team].goalsConceded += tableRaw[index].scores.home.goal;
            table[team].points += 3;
          } else if (
            tableRaw[index].scores.away.goal < tableRaw[index].scores.home.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 0;
            table[team].lose += 1;
            table[team].draw += 0;
            table[team].goalsScored += tableRaw[index].scores.away.goal;
            table[team].goalsConceded += tableRaw[index].scores.home.goal;
            table[team].points += 0;
          } else if (
            tableRaw[index].scores.away.goal ===
            tableRaw[index].scores.home.goal
          ) {
            table[team].matchesPlayed += 1;
            table[team].win += 0;
            table[team].lose += 0;
            table[team].draw += 1;
            table[team].goalsScored += tableRaw[index].scores.away.goal;
            table[team].goalsConceded += tableRaw[index].scores.home.goal;
            table[team].points += 1;
          }
        }
      }
    }
    if (oldTable) {
      await oldTable.update(
        { table: table, numberOfMatches: tableRaw.length }

      );
    } else {
      await OldTable.create(
        {
          table: table,
          numberOfMatches: tableRaw.length,
          competitionId: competitionId,
        },

      );
    }
    return res.status(200).json({ teams, table });
  } catch (err) {

    res.status(500).json(err);
  }
};
module.exports = leagueTable;

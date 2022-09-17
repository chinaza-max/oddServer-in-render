const Competition = require("../MongoDB/Model/competitionRegistration");



module.exports = {
    register: async (req, res, next) => {
        console.log(req.body)
        try {

            const competitionId = req.params.id;
            const teams = req.body
            console.log(req.body)
            const comp = await Competition.findOne({ id: competitionId })
            if (!comp) {
                return res.status(403).json({ express: { payLoad: "Competition not found", status: true } })
            }
            const resgTeams = comp.teams
            if (typeof (teams) === typeof ('string')) {
                const isTeam = resgTeams.find(team => String(team) === String(teams));
                if (isTeam) {
                    comp.team = resgTeams;
                    await comp.save();
                }
                else {
                    resgTeams.push(teams)
                    comp.team = resgTeams;
                    await comp.save();
                }
            }
            else if (typeof (teams) === typeof ([])) {
                const newTeam = [...resgTeams];
                for (let i = 0; i < teams.length; i++) {
                    for (let j = 0; j < resgTeams.length; j++) {
                        if (String(teams[i]) !== String(resgTeams[j])) {
                            newTeam.push(teams[i])
                        }

                    }
                };
                comp.team = newTeam;
                await comp.save();
            }
            // return res.status(200).json({ express: { payLoad: "success", status: true } })
        }
        catch (error) {
            return res.status(500).json({ express: { payLoad: "server error", status: false } })

        }
    },
    delete: async (req, res,nex) => {
        try {

            const competitionId = req.params.id;
            const teams = req.body
            console.log(req.body)
            const comp = await Competition.findOne({ id: competitionId })
            if (!comp) {
                return res.status(403).json({ express: { payLoad: "Competition not found", status: true } })
            }
            const resgTeams = [comp.teams]
            if (typeof (teams) === typeof ('string')) {
                const newTeam = resgTeams.filter(team => String(team) !== String(teams));
                    comp.team = newTeam;
                    await comp.save();
            }
            else if (typeof (teams) === typeof ([])) {
                const newTeam = [...resgTeams];
                for (let i = 0; i < teams.length; i++) {
                    for (let j = 0; j < resgTeams.length; j++) {
                        if (String(teams[i]) === String(resgTeams[j])) {
                            newTeam.splice(i,1)
                        }

                    }
                };
                comp.team = newTeam;
                await comp.save();
            }
            // return res.status(200).json({ express: { payLoad: "success", status: true } })
        }
        catch (error) {
            return res.status(500).json({ express: { payLoad: "server error", status: false } })

        }
    }
}

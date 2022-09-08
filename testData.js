const data = {
    "competitionRegistration":
    [
        {
          _id: new ObjectId("630b7536775debd0e468e95e"),
          teams: [],
          status: 'upcoming',
          competitionType: 'intraSchool',
          competitionName: 'departmental',
          session: '2020/2021',
          startDate: '2020-02-07T00:00:00.000Z',
          hostName: 'department',
          school: 'UNN',
          location: 'Enugu',
          level: 'department',
          levelName: 'physical science',
          country: 'nigeria',
          createdAt: "2022-08-28T14:01:26.146Z",
          updatedAt: "2022-08-28T14:01:26.146Z",
          __v: 0
        },
        {
          _id: new ObjectId("630bd2342a7403c3cb0df5b3"),
          teams: [],
          status: 'upcoming',
          competitionType: 'interSchool',
          competitionName: 'departmental',
          session: '2020/2021',
          startDate: "2020-02-07T00:00:00.000Z",
          hostName: 'department',
          school: 'UNN',
          location: 'Enugu',
          level: 'department',
          levelName: 'physical science',
          country: 'nigeria',
          createdAt: "2022-08-28T20:38:12.636Z",
          updatedAt: "2022-08-28T20:38:12.636Z",
          __v: 0
        }
      ]     
       ,
    "result":
    [
        {
          Cards: { redCard: [Object], yellowCard: [Object] },
          scores: { home: [Object], away: [Object] },
          result: { type: 'win' },
          _id: new ObjectId("630b7ed7c93b01c855ffd7e7"),
          fixtureId: new ObjectId("630b614a12868642664b08d0"),
          createdAt: "2022-08-28T14:42:31.357Z",
          updatedAt: "2022-08-28T14:42:31.357Z",
          __v: 0
        },
        {
          Cards: { redCard: [Object], yellowCard: [Object] },
          scores: { home: [Object], away: [Object] },
          result: { type: 'win' },
          _id: new ObjectId("630b7f30535a4bc89a2dc832"),
          fixtureId: new ObjectId("630b7ee577bfdab0216fbacf"),
          createdAt: "2022-08-28T14:44:00.610Z",
          updatedAt: "2022-08-28T14:44:00.610Z",
          __v: 0
        },
        {
          Cards: { redCard: [Object], yellowCard: [Object] },
          scores: { home: [Object], away: [Object] },
          session: 'full time',
          result: { type: 'win' },
          _id: new ObjectId("630b802546b84e8d160be798"),
          fixtureId: new ObjectId("630b7f65535a4bc89a2dc839"),
          createdAt: "2022-08-28T14:48:05.783Z",
          updatedAt: "2022-08-28T14:48:10.998Z",
          __v: 0
        }
      ]
    ,
    "fixture":
    [
        {
          _id: new ObjectId("630b7ee577bfdab0216fbacf"),
          status: 'open',
          competitionId: new ObjectId("630b7536775debd0e468e95e"),
          homeTeamId: '630165e4f084493e887608e6',
          awayTeamId: '6302a26d1f007f7b03bf5e2f',
          startTime: '9 am',
          startDate: "1990-11-05T00:00:00.000Z",
          venue: 'stadium',
          createdAt: "2022-08-28T14:42:45.380Z",
          updatedAt: "2022-08-28T14:42:45.380Z",
          __v: 0
        },
        {
          _id: new ObjectId("630b7f65535a4bc89a2dc839"),
          status: 'open',
          competitionId: new ObjectId("630b7536775debd0e468e95e"),
          homeTeamId: '630165e4f084493e887608e6',
          awayTeamId: '6302a26d1f007f7b03bf5e2f',
          startTime: '9 am',
          startDate: "1992-11-05T00:00:00.000Z",
          venue: 'stadium2',
          createdAt: "2022-08-28T14:44:53.109Z",
          updatedAt: "2022-08-28T14:44:53.109Z",
          __v: 0
        }
      ]
}
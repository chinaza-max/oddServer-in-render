const ChoosenFixture = require("../MongoDB/Model/choosenFixture");
const FixStaff = require("../MongoDB/Model/fixStaff");
const Fixture = require("../MongoDB/Model/fixture");

module.exports = {
  assignFixtureToStaff: async (req, res) => {
    const id = req.params.id;
    const fixid = req.query.fixid;
    await ChoosenFixture.create({fixtureId:fixid, staffId:id});
    FixStaff.find({staffId:id},async(err,usr)=>{
      if(usr){
        FixStaff.updateOne({'staffId':id},{$set: {
          'fixtureDetialls.fixtureId':fixid
      }})
  
      }
      else if(err){
        throw err
      }
      else{
        await FixStaff.create({'staffId':id,'fixtureDetialls.fixtureId':fixid})
      }
    })
  },
  displayFixture: async (req, res) => {
    const nextweek = new Date(new Date().getTime()+(7*24*60*60*1000));
    const choosenF = await ChoosenFixture.find({});
    const ids = [];
    choosenF.filter(pre=>ids.push(pre.id))
    Fixture.find({
      $and: [{startDate: { $gte: nextweek, $lt:new Data() }}, { id: {$nin:{$in:ids}}}],
    });
  },
  deleteFixture: async (req, res) => {
    const id = req.params.id;
    const fixid = req.query.fixid;
    await ChoosenFixture.findOneAndDelete({fixtureId:fixid});
    await FixStaff.findByIdAndUpdate(id,{$pull:{fixtureDetialls:{fixtureId:fixid}}});
  },
  updateFixture: async (req, res) => {
    const id = req.params.id;
    const fixid = req.query.fixid;
    const body = req.query.status
    await FixStaff.findByIdAndUpdate(id,{$pull:{fixtureDetialls:{fixtureId:fixid}}});
    FixStaff.updateOne({'staffId':id,'fixtureDetialls.fixtureId':fixid},{$set: {
        "fixtureDetialls.$.status": body
    }})
  },
};
// {$gte:ISODate(“2020-03-01”),$lt:ISODate(“2021-03-31”)}
const account = require('./account')
const post = require('./post');
const settings = require('./settings')
const request = require('./request')
const allRoutes = require("express").Router();



module.exports = (app) => {
    allRoutes.use('/account', account);
    allRoutes.use('/settings', settings);
    allRoutes.use('/admin-settings', post);
    allRoutes.use('/user-settings', request);
    app.use("/", allRoutes);
}
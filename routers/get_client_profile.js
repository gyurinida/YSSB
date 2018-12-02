'use strict';
const express = require('express');
const router = express.Router();
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');

router.get('/get_profile/:Id', wrapper.asyncMiddleware(async (req, res, next) => {
    var Id = req.params.Id;
    var user = await db.getQueryResult("SELECT Id, Name, Phone, Score FROM client WHERE Id='"+Id+"'");
    //console.log('-------------------------------');
    //console.log(JSON.stringify(user, null, 2));
        //console.log('-------------------------------');
    res.json(user);
}));

router.get('/get_request_list/:Id', wrapper.asyncMiddleware(async (req, res, next) => {
    var Id = req.params.Id;
    var user = await db.getQueryResult("SELECT Id, Title, State FROM request WHERE Client_id='"+Id+"'");
    //console.log('-------------------------------');
    //console.log(JSON.stringify(user, null, 2));
        //console.log('-------------------------------');
    res.json(user);
}));

router.post('/update', wrapper.asyncMiddleware(async (req, res, next) =>{
    const Id = req.body.id;
    const attr = req.body.attr;
    const value = req.body.value;
    console.log(Id);
    console.log(attr);
    console.log(value);
    var ret = await db.getQueryResult("UPDATE client SET "+attr+"='"+value+"' WHERE Id='"+Id+"'");
    console.log(ret);
    res.json({success: true});
}));

router.post('/delete', wrapper.asyncMiddleware(async (req, res, next) =>{
    const Id = req.body.id;
    console.log(Id);
    var ret = await db.getQueryResult("DELETE FROM CLIENT WHERE Id NOT IN (SELECT DISTINCT Client_id FROM REQUEST WHERE STATE='WORKING') AND Id='"+Id+"'");
    console.log(ret);
    res.json({success: true});
}));

module.exports = router;

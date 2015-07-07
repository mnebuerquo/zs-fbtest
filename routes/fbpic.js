var express = require('express');
var router = express.Router();

var http = require('http');
var https = require("https");
var config = require('../config');

function facebookRequest(reqpath,onComplete,onError)
{
    console.log("sending facebook request: "+reqpath);
    var options = {
        host: 'graph.facebook.com',
        path: reqpath+'&access_token='+config.facebook.app_id+'|'+config.facebook.secret
        };
    callback = function(response) {
            var str = '';

            // data coming in chunks
            response.on('data', function (chunk) {
                str += chunk;
            });
            
            //complete response received, parse and evaluate
            response.on('end', function () {
                //console.log(response.statusCode,str);
                var fbdata = JSON.parse(str);
                if(fbdata.hasOwnProperty('error'))
                {
                    console.log("error from facebook graph call: "+fbdata.error.message);
                    onError(fbdata.error);
                }
                else
                {
                    console.log("request complete");
                    onComplete(fbdata);
                }
            });
        }
    https.request(options, callback).end();
}

function getUserInfo(req,res,user_id)
{
    path = '/'+user_id+"?fields=id,name,picture";
    facebookRequest(path,
        function(data){
                if(data.id==user_id)
                {
                    //this matches our request, so continue
                    console.log("got user info for: ",data.name);
                    finishPage(req, res, data.name, data.picture.data.url);
                }
                else
                {
                    console.log("data structure makes no sense");
                    finishError(req, res);
                }
            },
        function(error){
                finishError(req, res);
            }
        );
}

function startInspection(req, res)
{
    var path = '/debug_token?input_token='+req.params.token;
    facebookRequest(path,
        function(fbdata){
            if(fbdata.data.app_id==config.facebook.app_id)
            {
                //this matches our app, so continue
                console.log("user_id:",fbdata.data.user_id);
                getUserInfo(req,res,fbdata.data.user_id);
            }
            else
            {
                finishError(req, res);
            }
            },
        function(error){
            finishError(req, res);
            }
        );
}

function finishError(req,res)
{
    res.render('fberr', { });
}

function finishPage(req, res, fbname, fburl)
{
    console.log("finish page",fbname,fburl);
    res.render('fbpic', { name:fbname, url:fburl});
}


router.get('/fbpic/:token', function(req, res) {
    console.log("called fbpic token router");
    startInspection(req, res);
});


module.exports = router;

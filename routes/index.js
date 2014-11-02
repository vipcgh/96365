
/*
 * GET home page.
 */
var URL = require('url');


var CorpID='wx196b3b6b2654d2f6';
var Token='9Ub1MFtjiVHK';
var EncodingAESKey='lCEPuLyNudhlB0OpLbq2hmYhJwionfpvHKgRSbBYBqz';

//var API = require('wechat').API;
//var api = new API('1', 'secret');

//var wechat=require('wechat-enterprise');
var WXBizMsgCrypt = require('../lib/msg_crypto.js');

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
    res.sendfile('./public/index.html');
};

exports.wx = function(req, res){
    //res.render('index', { title: 'Express' });
      //res.sendfile('./public/index.html');

    
    console.log('wx:',req);
    var arg = URL.parse(req.url, true).query;
    console.log(arg);
    

    //var WXBizMsgCrypt=wechat.WXBizMsgCrypt(Token,EncodingAESKey,CorpID);
    var wxCrypt=new WXBizMsgCrypt(Token,EncodingAESKey,CorpID);
    console.log(wxCrypt);
    var decMsg=wxCrypt.decrypt(arg.echostr);
    console.log('decMsg:',decMsg);
    console.log('message:',decMsg.message);
    
    res.writeHead(200);
    res.write(decMsg.message);
    res.end();
 
};

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var config={
        token: '9Ub1MFtjiVHK',
        encodingAESKey: 'lCEPuLyNudhlB0OpLbq2hmYhJwionfpvHKgRSbBYBqz', 
        corpId: 'wx196b3b6b2654d2f6'
};
var secret="A9WaD706Y6yHtT9Bt-umLPGYoC4NlabfM9jIL4QZRifbBZxwy7g4eyou1Lmb7_Lt";
var wechat=require('wechat-enterprise');
var API = wechat.API;
var api1 = new API(config.corpId,secret,'1');
var api2 = new API(config.corpId,secret,'2');


//console.log(api);

app.use('/wx',wechat(config,function (req, res, next) {
    console.log('wx enter,req.weixin:',req.weixin);
    api1.send({"touser": req.weixin.FromUserName},
            {
                "msgtype": "text",
                "text": {
                  "content": "app1 ok"
                },
                "safe":"0"
               },
               function(err,result){
                   if(err){
                       console.log('err:',err,',result:',result);
                   }
                   console.log('send message ok1');
               }
               );
    api2.send({"touser": req.weixin.FromUserName},
            {
                "msgtype": "text",
                "text": {
                  "content": "app2 ok"
                },
                "safe":"0"
               },
               function(err,result){
                   if(err){
                       console.log('err:',err,',result:',result);
                   }
                   console.log('send message ok2');
               }
               );
}));

/*app.get('/wx',routes.wx);

app.post('/wx',function(req,res){
    console.log('post wx,req:',req);
});*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

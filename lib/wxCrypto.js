var crypto = require('crypto');

var Token='9Ub1MFtjiVHK';
var EncodingAESKey='lCEPuLyNudhlB0OpLbq2hmYhJwionfpvHKgRSbBYBqz';
var AESKey=Base64_Decode(EncodingAESKey + "=");
var iv=AESKey.substr(0,16);

//解密
function decode(cryptkey, iv, secretdata) {
    var decipher = crypto.createDecipheriv('aes-128-cbc', cryptkey, iv);
    //var decoded  = decipher.update(secretdata, 'base64', 'utf8');
    var decoded  = decipher.update(secretdata, 'binary', 'utf8');
    
    decoded += decipher.final( 'utf8' );
    return decoded;
}
//解密
function encode(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
    var encoded  = encipher.update(cleardata, 'utf8', 'base64');

    encoded += encipher.final( 'base64' );
    return encoded;
}

/*var cryptkey   = crypto.createHash('sha256').update('__tazai_wolf__key').digest(),
iv         = '1234567890000000',
buf        = "Hello World",
enc        = encode( cryptkey, iv, buf );

var dec        = decode(cryptkey, iv, enc);
*/
function Base64_Encode(data) {
    var b   = new Buffer(data, 'binary');
    return b.toString('base64');
}


function Base64_Decode(data){
    var b = new Buffer(data, 'base64');
    return b.toString();
}


exports.wxDecode=function(msg_encrypt){
    console.log('msg_encrypt:',msg_encrypt);
    var aes_msg=Base64_Decode(msg_encrypt);
    console.log('AESKey:',AESKey);
    console.log('iv:',iv);
    console.log('aes_msg:',aes_msg);
    
    var rand_msg=decode(AESKey, iv, aes_msg);
    console.log('rand_msg:',rand_msg);
};

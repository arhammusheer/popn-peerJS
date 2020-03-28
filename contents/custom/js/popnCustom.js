const titlebar = require('custom-electron-titlebar');

new titlebar.Titlebar({
    backgroundColor: titlebar.Color.fromHex('#303030'),
    enableMnemonics	: false,
});

function init(){
    var canvas = document.getElementsById('canvas'),
    context = canvas.getContect('2d'),
    video = document.getElementsById('video'),
    vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia ||
                         navigator.webkitGetUSerMedia ;
    
    navigator.getMedia({
        video:true,
        audio: false,
    },function(stream){
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }, function(error){
       //An error occured 
    })
};

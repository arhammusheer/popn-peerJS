(function (){
    var peer = null;
    var dataConnection = null;
    var mediaConnection = null;
    var peerID = document.getElementById('peerIDinput');
    var myID = null;
    var myStream = null;
    var connectButton = document.getElementById("ConnectButton");
    var sendMessageBox = document.getElementById("chat-message-input");
    var myVideoBox = document.getElementById("myVideoBox");
    var remoteVideoBox = document.getElementById("remoteVideoBox");
    var toggleChat = document.getElementById("toggleChatButton");
    var chatMessageButton = document.getElementById("chat-message-submit");
    function initialize(){
        peer =  new Peer(null,{
            debug:2,
        });

        peer.on('open', function(id){
            if(peer.id === null){
                console.log("Received ID from server");
                myID = peer.id;
            } else {
                myID = peer.id;
            }
            console.log('ID : ' + myID);
            document.getElementById("mypeerID").value = myID;
            document.getElementById("connectionBox").hidden = false;
        });

        peer.on('disconnect', function(id){
            console.log("connection lost.");
        });

        peer.on('close', function(){
            dataConnection = null;
            console.log("Connection Successfully Closed");
        });

        peer.on('error',function(err){
            console.log(err);
            alert('' + err);
        });
    };

    function dataConn() {

        if (dataConnection){
            dataConnection.close();
        }

        dataConnection = peer.connect(peerID.value,{
            metadata: myID,
        });

        dataConnection.on('open', function(){
            console.log("connected to : " + dataConnection.peer);
        });

        dataConnection.on('data',function(data){
            document.getElementById("chat-log").value += "Peer : " + data + '\n';
        });

        dataConnection.on('close', function(){
            console.log("connection closed by peer");
        });
    };

    chatMessageButton.onclick = function(){
        if (dataConnection && dataConnection.open) {
            var msg = sendMessageBox.value;
            sendMessageBox.value = "";
            dataConnection.send(msg);
            document.getElementById("chat-log").value += "You : " + msg + "\n";
            console.log("Sent: " + msg);
        } else {
            console.log('Connection is closed');
        }
    };

    sendMessageBox.onkeypress = function(key){
        var event = key || window.event;
        var char = event.which || event.keyCode;
        if (char == '13')
            chatMessageButton.click();
    }

    connectButton.addEventListener('click',dataConn);

    initialize();
})();
(function (){
    var peer = null;
    var dataConnection = null;
    var mediaConnection = null;
    var peerID = document.getElementById('peerIDinput');
    var myID = null;
    var status = document.getElementById("connectionStatus");
    var myStream = null;
    var disconnectButton = document.getElementById("DisconnectButton");
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
        peer.on('connection', function(dataConnect){
            dataConnection = dataConnect;
            console.log("connected to : " + dataConnection.peer);
            dataConn();
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
            status.innerHTML = "ID received - disconnected";
            status.style.color = "yellow";
        });

        peer.on('disconnect', function(id){
            console.log("connection lost.");
            status.innerHTML = "Connection Lost";
            status.style.color = "red";
        });

        peer.on('close', function(){
            dataConnection = null;
            console.log("Connection Successfully Closed");
            status.innerHTML = "Closed successfully";
            status.style.color = "yellow";

        });

        peer.on('error',function(err){
            console.log(err);
            alert('' + err);
            status.innerHTML = "Error Occured - Retry";
            status.style.color = "red";
        });
    };

    function dataConn() {

        if (dataConnection === null){
            dataConnection = peer.connect(peerID.value,{
                metadata: myID,
            });
            status.innerHTML = "Connected to Peer ID : " + dataConnection.peer;
            status.style.color = "green";
        }

        dataConnection.on('open', function(){
            console.log("connected to : " + dataConnection.peer);
            status.innerHTML = "Connected to Peer ID : " + dataConnection.peer;
            status.style.color = "green";
        });

        dataConnection.on('data',function(data){
            document.getElementById("chat-log").value += "Peer : " + data + '\n';
        });

        dataConnection.on('close', function(){
            console.log("connection closed by peer");
            status.innerHTML = "connection closed";
            status.style.color = "yellow";
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

    connectButton.onclick = function (){
        dataConn();
    }

    disconnectButton.onclick = function (){
        dataConnection.close();
        dataConnection = null;
    }

    initialize();
})();
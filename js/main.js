// var socket = new WebSocket("ws://localhost:8081");



var ws = new WebSocket('ws://localhost:8081');
// ws.onopen = function () {
//     var data = {
//         message: "insert",
//         user: {
//             username: 'test',
//             password: 'testing0123',
//             email: 'a@mail.ru'
//         }
//     };
//     ws.send(JSON.stringify(data));
// };


ws.onmessage = function (event) {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
};

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
    var outgoingMessage = this.message.value;
    ws.send(outgoingMessage);
    return false;
  };

  
  // показать сообщение в div#subscribe
  function showMessage(message) {
    var messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
  }
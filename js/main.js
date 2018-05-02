// var socket = new WebSocket("ws://localhost:8081");
const header = document.getElementById('header');
const messanger = document.getElementById('messanger-section');
const loginSection = document.getElementById('login-section');
const signinSection = document.getElementById('signin-section');

header.addEventListener('click',eventHeader);

function eventHeader(e){
    let event = e.target;
    console.log(event);
    if(event.id === 'log-in'){
        messanger.className =  "messanger none";
        signinSection.className = "sign-in none";
        loginSection.className = "log-in";
    }
    if(event.id === 'sign-in'){
        messanger.className =  "messanger none";
        loginSection.className = "log-in none";
        signinSection.className = "sign-in";
    }
}

var ws = new WebSocket('ws://localhost:8081');
let uid = 0;
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
    var data = JSON.parse(event.data);
    if(data.message === "login"){
        uid = data.value;
        messanger.className =  "messanger";
        loginSection.className = "log-in none";
        signinSection.className = "sign-in none";
    }
    if(data.message === "message"){
        showMessage(data.value);
    }
    console.log(event);
};

document.forms.loginForm.onsubmit = function() {
    let login = this.login.value;
    let password = this.password.value;
    let data = {
        message: "login",
        user: {
            username: login,
            password: password
            }
    };
    ws.send(JSON.stringify(data));
    return false;
};

document.forms.signinForm.onsubmit = function() {
    let login = this.login.value;
    let password = this.password.value;
    let email = this.email.value;
    let data = {
        message: "signin",
        user: {
            username: login,
            email, email,
            password: password
            }
    };
    ws.send(JSON.stringify(data));
    return false;
};


// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
    var outgoingMessage = this.message.value;
    var data = {
    message: "message",
    user: {
        uid: uid,
        value: outgoingMessage
        }
    };
    ws.send(JSON.stringify(data));
    // ws.send(outgoingMessage);
    return false;
  };

  
  // показать сообщение в div#subscribe
  function showMessage(message) {
    var messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
  }
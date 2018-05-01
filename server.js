var WebSocketServer = require('ws').Server, 
    wss = new WebSocketServer({ host: "localhost", port: 8081 });

var clients = {};

wss.on('connection', function (ws) {
    console.log("Client connected");
    // ws.on('message', function (sData) {
    //     console.log(sData);
    //     var data = JSON.parse(sData);
    //     console.log(data.message);
    //     if (data && data.message == "insert" && data.user) { 
    //         var mysql = require('mysql');
    //         var conn = mysql.createConnection({
    //             host     : 'localhost',
    //             user     : 'root',
    //             password : "3752",
    //             database : 'messangerDB'
    //         });
    //         conn.connect();
    //         conn.query('SELECT uid, username FROM users', function (err, result) {
    //             if (err)
    //                 ws.send(JSON.stringify(err));
    //             console.log('her',result);
    //             ws.send("ok");
    //             ws.close();
    //         }); 
    //         conn.end();
    //     } else
    //         console.log(data);
    // });

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      clients[key].send(message);
    }
  });

    // ws.on('message', function(message) {
    //     console.log(message);
    //      ws.send(message);
    //   });

    ws.on('close', function () { 
        console.log("Client disconnected");
    });
});

console.log('Server running at localhost:8081');





// const Hapi = require('hapi');
// const MySQL = require('mysql');
// const Joi = require('joi');
// const Bcrypt = require('bcrypt');
// const server = new Hapi.Server();
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

// const connection = MySQL.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "3752",
//     database: "messangerDB"
// });

// server.connection({
//     host: 'localhost',
//     port: 4200
// });
// connection.connect();


// server.route({
//     method: 'GET',
//     path: '/helloworld',
//     handler: function (request, reply) {
//         return reply('hello world');
//     }
// });

// // Add the route
// server.route({
//     method: 'GET',
//     path: '/users',
//     handler: function (request, reply) {

//         connection.query('SELECT uid, username FROM users', function (error, results, fields) {
//             if (error) throw error;
//             console.log(results);
//             reply(results);
//         });

//     }
// });

// server.route({
//     method: 'GET',
//     path: '/user/{uid}',
//     handler: function (request, reply) {
//         const uid = request.params.uid;

//         connection.query('SELECT uid, username, email FROM users WHERE uid = "' + uid + '"', function (error, results, fields) {
//             if (error) throw error;
//             console.log(results);
//             reply(results);
//         });

//     },
//     config: {
//         validate: {
//             params: {
//                 uid: Joi.number().integer()
//             }
//         }
//     }
// });

// server.route({
//     method: 'POST',
//     path: '/signup',

//     handler: function (request, reply) {

//         const username = request.payload.username;
//         const email = request.payload.email;
//         const password = request.payload.password;

//         var salt = Bcrypt.genSaltSync();
//         var encryptedPassword = Bcrypt.hashSync(password, salt);
     
//         var orgPassword = Bcrypt.compareSync(password, encryptedPassword);

//         connection.query('INSERT INTO users (username,email,password) VALUES ("' + username + '","' + email + '","' + encryptedPassword + '")', function (error, results, fields) {
//             if (error) throw error;
//             console.log(results);
//             reply(results);
//         });

//     },
//     config: {
//         validate: {
//             payload: {
//                 username: Joi.string().alphanum().min(3).max(30).required(),
//                 email: Joi.string().email(),
//                 password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
//             }
//         }

//     }
// });


// server.route({
//     method: 'POST',
//     path: '/sendMessage',
//     handler: function (request, reply) {

//         const uid = request.payload.uid;
//         const message = request.payload.message;
       
//         connection.query('INSERT INTO messages (message,uid_fk) VALUES ("' + message + '","' + uid + '")', function (error, results, fields) {
//             if (error) throw error;
//             console.log(results);
//             reply(results);
//         });

//     },
//     config: {
//         validate: {
//             payload: {
//                 uid: Joi.number().integer(),
//                 message: [Joi.string(), Joi.number()]
//             }
//         }

//     }
// });

// server.route({
//     method: 'POST',
//     path: '/messages',

//     handler: function (request, reply) {

//         const uid = request.payload.uid;
//         console.log(uid);

//         connection.query('SELECT * FROM messages WHERE uid_fk = "' + uid + '"', function (error, results, fields) {
//             if (error) throw error;
//             console.log(results);
//             reply(results);
//         });

//     },
//     config: {
//         validate: {
//             payload: {
//                 uid: Joi.number().integer()
//             }
//         }

//     }
// });

// server.route({
//     method: 'DELETE',
//     path: '/message/{uid}/{mid}',
//     handler: function (request, reply) {
//         const uid = request.params.uid;
//         const mid = request.params.mid;

//         console.log(uid + "---" + mid);

//         connection.query('DELETE FROM messages WHERE uid_fk = "' + uid + '"AND mid = "' + mid + '"', function (error, result, fields) {
//             if (error) throw error;

//             if (result.affectedRows) {
//                 reply(true);
//             } else {
//                 reply(false);
//             }

//         });
//     },
//     config: {
//         validate: {
//             params: {
//                 uid: Joi.number().integer(),
//                 mid: Joi.number().integer()
//             }
//         }

//     }
// });


// // Start the server
// server.start((err) => {

//     if (err) {
//         throw err;
//     }
//     console.log('Server running at:', server.info.uri);
// });
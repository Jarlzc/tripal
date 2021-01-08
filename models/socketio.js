const knexConfig = require("../knexfile").development;
const knex = require('knex')(knexConfig)

// id and username pairs
let login_users = {};
let users_here = [];
let room = '';
let users_in_room = {};
let history_rows = [];

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        console.log('connections:' + socket.id);

        // send id to client when connect 
        io.to(socket.id).emit('onConnect', {
            socket_id: socket.id
        });

        // input id and username pairs and user list
        socket.on('onConnect', function (data) {
            //managing room information
            login_users[data.socket_id] = data.login_name;
            users_here = Object.values(login_users);
            // console.log(login_users);
            // console.log(users_here)
            console.log("room name", data.room_name)
            room = data.room_name
            if (users_in_room[room] === undefined) {
                users_in_room[room] = [data.login_name]
            } else {
                users_in_room[room].push(data.login_name)
            }
            console.log(users_in_room)
            socket.join(room)
        });

        socket.on('history', function (data) {
            //grabing chat history
            let query = knex.select('chat_msg', 'msg_time', 'user_id', 'users.username')
                .where('request_id', room )
                .from('chatroom_content')
                .join('users', 'chatroom_content.user_id', "=", 'users.id')

            query.then((rows) => {
                    console.log('history get', rows)
                    io.to(socket.id).emit('history_say', {
                        rows: rows,
                        
                    })
                })
                .catch((err) => console.log(err))

        })


        // received 'say' emit from client and broadcast a message
        socket.on('say', function (data) {

            let userId;

            let query = knex.select('id')
                .where({
                    username: data.login_name
                })
                .from('users')

            query.then((rows) => {
                userId = rows[0].id;
                console.log(userId);
                console.log('data');

                knex('chatroom_content').insert({
                    chat_msg: data.chat_message,
                    user_id: userId,
                    request_id: room,
                    msg_time: data.chat_time,
                }).then((data) => console.log('data inserted'))
            })


            io.to(room).emit('say', {
                socket_id: socket.id,
                login_name: data.login_name,
                chat_message: data.chat_message,
                chat_time: data.chat_time
            });
        });

        // join msg for other users except sender
        socket.on('join', function (data) {
            let clock = new Date().toLocaleTimeString();
            let date = new Date().toLocaleDateString();
            let time = `${clock} in ${date}`;
            socket.broadcast.to(room).emit('join', {
                socket_id: socket.id,
                login_name: data.login_name,
                chat_time: time
            });

        });

        socket.on('focus', function (data) {
            io.to(socket.id).emit('focus', {
                user_array: users_in_room[room]
            })
        })

        // broadcast is typing 
        socket.on('keydown', function (data) {
            socket.broadcast.to(room).emit('keydown', {
                socket_id: socket.id,
                login_name: data.login_name
            });
            //remind user what is his or her name
            io.to(socket.id).emit('personallog', {
                socket_id: socket.id,
                login_name: data.login_name
            });

        });
        socket.on('keyup', function (data) {
            socket.broadcast.to(room).emit('keyup', {});
        });

        // broadcast user left
        socket.on('disconnect', function () {
            let clock = new Date().toLocaleTimeString();
            let date = new Date().toLocaleDateString();
            let time = `${clock} in ${date}`;
            let key = socket.id;


            io.to(room).emit('logout', {
                socket_id: socket.id,
                login_name: login_users[key],
                chat_time: time
            });

            // delete login user in server 
            console.log(key);
            delete login_users[key];
            console.log(login_users);
            users_in_room[room].splice(users_in_room[room].indexOf(login_users[key]), 1)
        });
    });

}
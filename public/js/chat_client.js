"use strict";

let socket = null;
let my_login_name = "";
let my_socket_id = "";
let my_room = "";

$(function () {
  //login form
  $("#loginForm").show();
  $("#chatForm").hide();

  // login click
  $("#btnLogin").on("click", function (e) {
    my_login_name = $("#login_name").val();
    my_room = $("#rooms").val();

    if ($("#loginForm").valid() === true) {
      // close login and show chat
      $("#loginForm").hide();
      $("#chatForm").show();

      // start connect to server
      initSocket();
    }
    e.preventDefault();
  });

  // when a message is send
  $("#btnChat").on("click", function (e) {
    let clock = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let time = `${clock} in ${date}`;
    var chat_message = $("#chat_message").val();
    console.log(time);
    if (chat_message !== "") {
      socket.emit("say", {
        login_name: my_login_name,
        chat_message: chat_message,
        chat_time: time,
      });
    }
    $("#chat_message").val("");
    e.preventDefault();
  });

  $("#chat_message").on("focus", function (e) {
    socket.emit("focus", {});
  });

  //typing
  $("#chat_message").on("keydown", function (e) {
    socket.emit("keydown", {
      login_name: my_login_name,
    });
  });
  $("#chat_message").on("keyup", function (e) {
    socket.emit("keyup", {});
  });
});

// append chat message
function appendChat(message, position, login_name, time) {
  $("#chatLogs").append(
    '<div class="' +
      position +
      '_balloon">' +
      message +
      '<span class="chatRecord">said' +
      login_name +
      " at " +
      time +
      "</span></div>"
  );
  // autoscroll to the bottom
  $("html,body").animate(
    {
      scrollTop: $("#bottomDiv").offset().top,
    },
    0
  );
}

// append server message
function appendServerChat(message, login_name, chat_time) {
  $("#chatLogs").append('<div class="left_balloon">' + message + " at " + chat_time + "</div>");
  $("html,body").animate(
    {
      scrollTop: $("#bottomDiv").offset().top,
    },
    0
  );
}

//bootup socket
function initSocket() {
  socket = io.connect();

  // when client connect to server
  socket.on("onConnect", function (data) {
    // storing own's id
    my_socket_id = data.socket_id;

    // login information
    socket.emit("onConnect", {
      socket_id: socket.id,
      login_name: my_login_name,
      room_name: my_room,
    });

    //grab chat history
    socket.emit("history", { room_name: my_room });
  });

  socket.on("history_say", function (data) {
    let rows = data.rows;
    let user_id = data.user_id;
    console.log(my_login_name);

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].name === my_login_name) {
        console.log(`right ${rows[i].chat_message}, ${rows[i].chat_time}, ${rows[i].name}`);
        appendChat(rows[i].chat_message, "right", "", rows[i].chat_time);
      } else {
        console.log(`left ${rows[i].chat_message}, ${rows[i].chat_time}, ${rows[i].name}`);
        appendChat(rows[i].chat_message, "left", rows[i].name, rows[i].chat_time);
      }
    }
  });

  // define sender for chatbox style
  socket.on("say", function (data) {
    if (my_socket_id !== data.socket_id) {
      appendChat(data.chat_message, "left", data.login_name, data.chat_time);
    } else {
      appendChat(data.chat_message, "right", "", data.chat_time);
    }
  });

  // posting logon message
  socket.on("join", function (data) {
    appendServerChat(data.login_name + " has joined the chat", "", data.chat_time);
  });

  socket.on("personallog", (data) => {
    changeChatStatus(`You have joined as ${data.login_name}`);
  });

  socket.on("focus", (data) => {
    let msg = data.user_array.join(", ");
    console.log(data.user_array);
    msg = "User in Current Room :" + msg;
    changeChatStatus1(msg);
  });

  // posting typing message
  socket.on("keydown", function (data) {
    changeChatStatus(data.login_name + " is typing...");
  });
  socket.on("keyup", function (data) {
    changeChatStatus("");
  });

  // showing logout message
  socket.on("logout", function (data) {
    appendServerChat(data.login_name + " has left the room", "", data.chat_time);
  });

  // emit join
  socket.emit("join", {
    login_name: my_login_name,
  });
}

// statusbar message
function changeChatStatus(message) {
  $("#chatStatus").html("<div>" + message + "</div>");
}
function changeChatStatus1(message) {
  $("#chatStatus1").html("<div>" + message + "</div>");
}

// Variation
$("#loginForm").validate({
  rules: {
    login_name: {
      required: true,
    },
  },
  messages: {
    login_name: "Please enter your user name.",
  },
});

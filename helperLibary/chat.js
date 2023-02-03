const Helper = require("./helper");
const messageDB = require("../model/message");
const unreadDB = require("../model/unread");
const liveUser = async (socketId, user) => {
  user["socketId"] = socketId;
  Helper.set(socketId, user._id);
  Helper.set(user._id, user);
};

const initialize = async (io, socket) => {
  console.log("current user is ", socket.userData);
  socket["currentUserId"] = socket.userData._id;
  await liveUser(socket.id, socket.userData);
  socket.on("message", (data) => {
    incomingMessage(io, socket, data);
  });
};

const incomingMessage = async (io, socket, data) => {
  console.log("user send message", data);
  let saveData = await new messageDB(data).save();
  let saveMesg = await messageDB
    .findById(saveData._id)
    .populate("from to", "name id");
  console.log(saveMesg);
  let toUser = await Helper.get(saveMesg.to._id);
  console.log("touser", toUser);
  if (toUser) {
    let toSocket = io.of("/chat").to(toUser.socketId);
    if (toSocket) {
      toSocket.emit("message", saveMesg);
    } else {
      next("to socket not found");
    }
  } else {
    await new unreadDB({ from: saveMesg.from._id, to: saveMesg.to._id });
  }
  socket.emit("message", saveMesg);
};

module.exports = {
  initialize,
};

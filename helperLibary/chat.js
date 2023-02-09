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
  socket.on("unreads", (data) => {
    unreadMessage(socket);
  });
  socket.on("loadmore", (data) => loadMore(socket, data));
};

const loadMore = async (socket, data) => {
  let limit = Number(process.env.MESGE_LIMIT);
  let sk = Number(data.page) == 1 ? 0 : Number(data.page) - 1;
  let skipCount = sk * limit;
  let messsages = await messageDB
    .find({
      $or: [{ from: socket.currentUserId }, { to: socket.currentUserId }],
    })
    .sort({ create: -1 })
    .skip(skipCount)
    .limit(limit)
    .populate("from to", "name _id");
  socket.emit("messages", messsages);
};

const unreadMessage = async (socket) => {
  let unreads = await unreadDB.find({ to: socket.currentUserId });
  if (unreads > 0) {
    unreads.forEach(async (unread) => {
      await unreadDB.findByIdAndDelete(unread._id);
    });
  }
  socket.emit("unreads", { message: unreads.length });
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
    await new unreadDB({ from: saveMesg.from._id, to: saveMesg.to._id }).save();
  }
  socket.emit("message", saveMesg);
};

module.exports = {
  initialize,
};

const initializeSocketIO = (io) => {
  
  return io.on("connection", async (socket) => {
    try {
      socket.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
    } catch (error) {
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};

const emitSocketEvent = (req, roomId, event, payload) => {
  req.app.get("io").in(roomId).emit(event, payload);
};

module.exports = { initializeSocketIO, emitSocketEvent };

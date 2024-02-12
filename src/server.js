const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const color = require("colors");

const ticketRoutes = require("./routes/ticket.route.js");
const errorHandler = require("./middlewares/error.middleware.js");

const app = express();
const { createServer } = require("http");
const { initializeSocketIO } = require("./socket/index.js");
const bodyParser = require("body-parser");
const httpServer = createServer(app);

app.use(cors());
app.use(express.json()); // Uncomment if you're expecting JSON data
app.use(express.urlencoded({ extended: true }));

// app.use(cors({ origin: true }));

// app.use(
//   bodyParser.urlencoded({
//     limit: "100mb",
//     extended: true,
//   })
// );
// app.use(
//   bodyParser.json({
//     limit: "100mb",
//     extended: true,
//   })
// );

// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
//   // );
//   next();
// });

// app.use(function(req, res, next) {
//   res.setHeader("Content-Type", "application/x-www-form-urlencoded");
//   next();
// });

// app.use("/api/v1", userRoutes);
app.use("/api/v1", ticketRoutes);

// sequelize.sync().then(() => {
//   console.log("Database synced");
// });

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Socket.IO server is listening");
});

 

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:8080", "http://localhost:6060"],
    // credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io", socket.id);

  socket.emit("value", 40);

  socket.on("new ticket", (data) => {
    console.log("checking socket data users", data);
    socket.broadcast.emit("created ticket", data);
  });

  socket.on("sent conversation", (data) => {
    console.log(color.red("sent conversation", data));

    socket.broadcast.emit("get conversation", data);
  });
});

module.exports = { io };

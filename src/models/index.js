const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("chat-application", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  operatorsAliases: false,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ticket = require("./tickets.model.js")(sequelize, DataTypes);
db.ticket_conversation = require("./ticket_conversation.model.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation

db.ticket.hasMany(db.ticket_conversation, {
  foreignKey: "ticket_id",
  as: "ticket_conversation",
});

db.ticket_conversation.belongsTo(db.ticket, {
  foreignKey: "ticket_id",
  as: "ticket",
});

module.exports = db;

const Sequelize = require("sequelize");
// Assuming `index.js` exports the Sequelize instance

module.exports = (sequelize, DataTypes) => {
  const TicketConversation = sequelize.define(
    "ticket_conversation",
    {
      ticket_conversation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ticket",
          key: "ticket_id",
        },
      },
      user_id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      image_attachment: DataTypes.TEXT,
      video_attachment: DataTypes.TEXT,
      user_type: DataTypes.TINYINT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },

    {
      timestamps: false, // Set to true if you want Sequelize to create `createdAt` and `updatedAt` fields
      tableName: "ticket_conversation", // Set the table name if it's different from the model name
    }
  );
  return TicketConversation;
};

// If you want timestamps, you can remove the timestamps option and define them explicitly

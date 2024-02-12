import Message from "./messages.model.js";
import Conversation from "./conversation.model.js";
import User from "./user.models.js";

// Define associations
User.hasMany(Message, { foreignKey: "sender_id" });
Message.belongsTo(User, { foreignKey: "sender_id" });

User.belongsToMany(Conversation, {
  through: ConversationParticipant,
  foreignKey: "user_id",
});
Conversation.belongsToMany(User, {
  through: ConversationParticipant,
  foreignKey: "conversation_id",
});

Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

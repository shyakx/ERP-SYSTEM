const { Conversation, Message, ConversationMember, MessageReaction, TypingIndicator, AuditLog, Employee } = require('./index');
const User = require('./User');
const Department = require('./Department');

const defineAssociations = () => {
  // User associations
  User.hasMany(Conversation, { foreignKey: 'created_by', as: 'createdConversations' });
  User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
  User.hasMany(ConversationMember, { foreignKey: 'user_id', as: 'conversationMemberships' });
  User.hasMany(MessageReaction, { foreignKey: 'user_id', as: 'messageReactions' });
  User.hasMany(TypingIndicator, { foreignKey: 'user_id', as: 'typingIndicators' });
  User.hasOne(Employee, { foreignKey: 'user_id', as: 'employee' });

  // Conversation associations
  Conversation.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
  Conversation.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
  Conversation.hasMany(Message, { foreignKey: 'conversation_id', as: 'messages' });
  Conversation.hasMany(ConversationMember, { foreignKey: 'conversation_id', as: 'members' });
  Conversation.hasMany(TypingIndicator, { foreignKey: 'conversation_id', as: 'typingIndicators' });

  // Message associations
  Message.belongsTo(Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
  Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
  Message.belongsTo(Message, { foreignKey: 'reply_to_message_id', as: 'replyTo' });
  Message.hasMany(Message, { foreignKey: 'reply_to_message_id', as: 'replies' });
  Message.hasMany(MessageReaction, { foreignKey: 'message_id', as: 'reactions' });

  // ConversationMember associations
  ConversationMember.belongsTo(Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
  ConversationMember.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // MessageReaction associations
  MessageReaction.belongsTo(Message, { foreignKey: 'message_id', as: 'message' });
  MessageReaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // TypingIndicator associations
  TypingIndicator.belongsTo(Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
  TypingIndicator.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Department associations
  Department.hasMany(Conversation, { foreignKey: 'department_id', as: 'conversations' });
  Department.hasMany(Employee, { foreignKey: 'department_id', as: 'employees' });

  // Employee associations
  Employee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Employee.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

  // AuditLog associations
  AuditLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  User.hasMany(AuditLog, { foreignKey: 'user_id', as: 'auditLogs' });
};

module.exports = { defineAssociations };
import { User } from './User.js';
import { Document } from './Document.js';
import { ChatMessage } from './ChatMessage.js';

// User associations
User.hasMany(Document, {
  foreignKey: 'userId',
  as: 'documents',
  onDelete: 'CASCADE'
});

User.hasMany(ChatMessage, {
  foreignKey: 'userId',
  as: 'chatMessages',
  onDelete: 'CASCADE'
});

// Document associations
Document.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// ChatMessage associations
ChatMessage.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export { User, Document, ChatMessage };
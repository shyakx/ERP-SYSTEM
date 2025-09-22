const { Conversation, Message, ConversationMember, User, Department } = require('../models');

const seedChatData = async () => {
  try {
    console.log('🌱 Seeding chat data...');

    // Get some users and departments for seeding
    const users = await User.findAll({ limit: 10 });
    const departments = await Department.findAll({ limit: 3 });

    if (users.length < 2) {
      console.log('⚠️ Not enough users found. Please seed users first.');
      return;
    }

    // Create some conversations
    const conversations = [];

    // Direct conversation between first two users
    const directConversation = await Conversation.create({
      name: null,
      type: 'direct',
      description: null,
      is_private: true,
      created_by: users[0].id,
      department_id: null
    });
    conversations.push(directConversation);

    // Group conversation for HR department
    if (departments.length > 0) {
      const hrConversation = await Conversation.create({
        name: 'HR Team Chat',
        type: 'group',
        description: 'General HR team discussions',
        is_private: false,
        created_by: users[0].id,
        department_id: departments[0].id
      });
      conversations.push(hrConversation);
    }

    // General company chat
    const generalConversation = await Conversation.create({
      name: 'General Discussion',
      type: 'channel',
      description: 'Company-wide announcements and discussions',
      is_private: false,
      created_by: users[0].id,
      department_id: null
    });
    conversations.push(generalConversation);

    // Add members to conversations
    for (const conversation of conversations) {
      if (conversation.type === 'direct') {
        // Add both users to direct conversation
        await ConversationMember.create({
          conversation_id: conversation.id,
          user_id: users[0].id,
          role: 'admin'
        });
        await ConversationMember.create({
          conversation_id: conversation.id,
          user_id: users[1].id,
          role: 'member'
        });
      } else {
        // Add multiple users to group/channel conversations
        const membersToAdd = users.slice(0, Math.min(5, users.length));
        for (let i = 0; i < membersToAdd.length; i++) {
          await ConversationMember.create({
            conversation_id: conversation.id,
            user_id: membersToAdd[i].id,
            role: i === 0 ? 'admin' : 'member'
          });
        }
      }
    }

    // Create some sample messages
    const sampleMessages = [
      {
        content: "Hello! How is everyone doing today?",
        conversation_id: conversations[0].id,
        sender_id: users[0].id,
        message_type: 'text'
      },
      {
        content: "Hi! I'm doing great, thanks for asking. How about you?",
        conversation_id: conversations[0].id,
        sender_id: users[1].id,
        message_type: 'text'
      },
      {
        content: "Welcome to the HR team chat! Please feel free to share any updates or questions.",
        conversation_id: conversations[1].id,
        sender_id: users[0].id,
        message_type: 'text'
      },
      {
        content: "Thanks for the welcome! Looking forward to working with everyone.",
        conversation_id: conversations[1].id,
        sender_id: users[1].id,
        message_type: 'text'
      },
      {
        content: "This is a company-wide announcement. Please review the new policies in the employee handbook.",
        conversation_id: conversations[2].id,
        sender_id: users[0].id,
        message_type: 'text'
      }
    ];

    for (const messageData of sampleMessages) {
      await Message.create({
        ...messageData,
        created_at: new Date(Date.now() - Math.random() * 86400000) // Random time within last 24 hours
      });
    }

    // Update conversation last_message_at
    for (const conversation of conversations) {
      const lastMessage = await Message.findOne({
        where: { conversation_id: conversation.id },
        order: [['created_at', 'DESC']]
      });
      
      if (lastMessage) {
        await conversation.update({ last_message_at: lastMessage.created_at });
      }
    }

    console.log('✅ Chat data seeded successfully!');
    console.log(`   - Created ${conversations.length} conversations`);
    console.log(`   - Created ${sampleMessages.length} messages`);
    console.log(`   - Added conversation members`);

  } catch (error) {
    console.error('❌ Error seeding chat data:', error);
  }
};

module.exports = { seedChatData };

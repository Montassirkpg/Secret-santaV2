const mongoose = require('mongoose');

const SecretSantaAssignmentSchema = new mongoose.Schema({
  giverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
});

module.exports = mongoose.model('SecretSantaAssignment', SecretSantaAssignmentSchema);

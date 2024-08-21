const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Membership', MembershipSchema);

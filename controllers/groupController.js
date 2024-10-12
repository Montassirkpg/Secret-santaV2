const Group = require('../models/Group');
const Membership = require('../models/Membership');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create a new group
exports.createGroup = async (req, res) => {
    const { groupName } = req.body;
    try {
        const group = new Group({ name: groupName, owner: req.user });
        await group.save();
        res.status(201).json({ message: 'Group created', group });
    } catch (error) {
        res.status(500).json({ message: 'Error creating group', error });
    }
};

// Invite members via email
exports.inviteMember = async (req, res) => {
    const { email, groupId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Send email invite
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const inviteToken = jwt.sign({ groupId, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Secret Santa Group Invitation',
            text: `You have been invited to join a Secret Santa group. Accept here: https://yourapp.com/accept/${inviteToken}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Invitation sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending invitation', error });
    }
};

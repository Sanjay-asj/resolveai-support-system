const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Ticket = require('../../models/Ticket');
const User = require('../../models/User');

// Create a new ticket
router.post('/', auth, async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newTicket = new Ticket({
      title,
      description,
      category,
      submitter: req.user.id,
      comments: [{ text: description, user: req.user.id, name: user.email }]
    });
    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all tickets (with filtering and search for agents)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent') {
      return res.status(403).json({ msg: 'Access denied: Agents only' });
    }

    const { status, category, assignedTo, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (assignedTo) query.assignedTo = assignedTo === 'unassigned' ? null : assignedTo;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(query)
      .populate('assignedTo', ['email'])
      .sort({ date: -1 });
      
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get tickets for the logged-in user
router.get('/mytickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ submitter: req.user.id }).sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get ticket statistics for the analytics dashboard
router.get('/stats', auth, async (req, res) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: 'Open' });
    const resolvedTickets = await Ticket.countDocuments({ status: 'Resolved' });

    const ticketsByCategory = await Ticket.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const ticketsByStatus = await Ticket.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalTickets,
      openTickets,
      resolvedTickets,
      ticketsByCategory,
      ticketsByStatus
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single ticket by its ID
router.get('/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }
        if (ticket.submitter.toString() !== req.user.id && req.user.role !== 'agent') {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a comment to a ticket
router.post('/:id/comments', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');

        if (ticket.submitter.toString() !== req.user.id && req.user.role !== 'agent') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const newComment = {
            text: req.body.text,
            user: req.user.id,
            name: user.email
        };

        ticket.comments.unshift(newComment);
        await ticket.save();
        res.json(ticket.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update ticket status or category
router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'agent') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }
        ticket.status = req.body.status || ticket.status;
        ticket.category = req.body.category || ticket.category;
        await ticket.save();
        res.json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Assign a ticket to an agent
router.put('/:id/assign', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    ticket.assignedTo = req.body.agentId;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a ticket
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'agent') {
            return res.status(403).json({ msg: 'Access denied: Agents only' });
        }
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }
        await ticket.deleteOne();
        res.json({ msg: 'Ticket removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
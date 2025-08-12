const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  submitter: { type: Schema.Types.ObjectId, ref: 'user' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  // --- NEW FIELD ---
  category: {
    type: String,
    enum: ['Billing', 'Technical', 'General Inquiry'],
    default: 'General Inquiry'
  },
  comments: [{
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      text: { type: String, required: true },
      name: { type: String },
      date: { type: Date, default: Date.now },
  }],
  summary: { type: String },
  priority: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ticket', TicketSchema);
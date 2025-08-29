import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', category: '', assignedTo: '' });

  const fetchTickets = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await api.get(`/tickets?${params}`);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await api.get('/users/agents');
      setAgents(res.data);
    } catch (err) {
        console.error("Could not fetch agents");
    }
  };

  useEffect(() => {
    fetchTickets();
    if (agents.length === 0) fetchAgents();
  }, [filters]);

  const handleDelete = async (ticketId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/tickets/${ticketId}`);
        fetchTickets();
      } catch (err) {
        alert('Failed to delete ticket.');
      }
    }
  };
  
  const handleAssign = async (ticketId, agentId) => {
    try {
        await api.put(`/tickets/${ticketId}/assign`, { agentId });
        fetchTickets();
    } catch (err) {
        alert('Failed to assign ticket.');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Agent Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text" name="search" placeholder="Search..." value={filters.search} onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <select name="category" value={filters.category} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Categories</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
        </select>
        <select name="assignedTo" value={filters.assignedTo} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Agents</option>
          <option value="unassigned">Unassigned</option>
          {agents.map(agent => (
            <option key={agent._id} value={agent._id}>{agent.email}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Assigned To</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link to={`/tickets/${ticket._id}`} className="text-blue-500 hover:underline font-semibold">{ticket.title}</Link>
                </td>
                <td className="py-3 px-4">{ticket.category}</td>
                <td className="py-3 px-4">{ticket.status}</td>
                <td className="py-3 px-4">{ticket.assignedTo ? ticket.assignedTo.email : 'Unassigned'}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

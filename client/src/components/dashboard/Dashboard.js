import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    assignedTo: ''
  });

  // Fetches tickets based on the current filter state
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams(filters).toString();
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get(`http://localhost:5000/api/tickets?${params}`, config);
      setTickets(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  // Fetches the list of all agents for the dropdown
  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/users/agents', config);
      setAgents(res.data);
    } catch (err) {
        console.error("Could not fetch agents");
    }
  };

  // This useEffect hook runs when the component loads and whenever the filters change
  useEffect(() => {
    fetchTickets();
    if (agents.length === 0) {
      fetchAgents();
    }
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, config);
        fetchTickets(); // Refresh tickets after delete
      } catch (err) {
        alert('Failed to delete ticket.');
      }
    }
  };
  
  const handleAssign = async (ticketId, agentId) => {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        await axios.put(`http://localhost:5000/api/tickets/${ticketId}/assign`, { agentId }, config);
        fetchTickets(); // Refresh tickets after assignment
    } catch (err) {
        alert('Failed to assign ticket.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Agent Dashboard</h2>

      {/* Filter and Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search by keyword..."
          value={filters.search}
          onChange={handleFilterChange}
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
                  <Link to={`/tickets/${ticket._id}`} className="text-blue-500 hover:underline font-semibold">
                    {ticket.title}
                  </Link>
                </td>
                <td className="py-3 px-4">{ticket.category}</td>
                <td className="py-3 px-4">{ticket.status}</td>
                <td className="py-3 px-4">{ticket.assignedTo ? ticket.assignedTo.email : 'Unassigned'}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleDelete(ticket._id)}
                    className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded"
                  >
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
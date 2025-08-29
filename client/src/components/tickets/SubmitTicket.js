import React, { useState } from 'react';
import api from '../../utils/api';

const SubmitTicket = () => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'General Inquiry' });
  const { title, description, category } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/tickets', { title, description, category });
      alert('Ticket submitted successfully!');
      setFormData({ title: '', description: '', category: 'General Inquiry' });
    } catch (err) {
      alert('Failed to submit ticket.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a New Ticket</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
          <select
            id="category" name="category" value={category} onChange={onChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="A brief summary" name="title" value={title} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea id="description" placeholder="Describe your issue" name="description" value={description} onChange={onChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32"></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitTicket;

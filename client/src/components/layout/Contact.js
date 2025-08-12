import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // This creates a special URL that opens the Gmail compose window
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=sanjaydoss737@gmail.com&su=${encodeURIComponent(`Contact Form: ${name}`)}&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;

    // This command opens that URL in a new browser tab
    window.open(gmailLink, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have a question? We'd love to hear from you.</p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600">Our team is here to help.</p>
            <a href="mailto:sanjaydoss737@gmail.com" className="text-blue-500 hover:underline">sanjaydoss737@gmail.com</a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+919363121772" className="text-blue-500 hover:underline">+91 93631 21772</a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
            <p className="text-gray-600">Pondicherry, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" value={message} onChange={onChange} rows="4" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
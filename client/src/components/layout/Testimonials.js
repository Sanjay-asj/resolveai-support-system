import React from 'react';

const TestimonialCard = ({ quote, name, role, avatar }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-gray-600 italic">"{quote}"</p>
    <div className="flex items-center mt-4">
      <img className="w-12 h-12 rounded-full mr-4" src={avatar} alt={name} />
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const reviews = [
    {
      quote: "ResolveAI's automated analysis is a game-changer. It cuts down our ticket sorting time by more than half. I can focus on solving problems, not organizing them.",
      name: 'Priya Sharma',
      role: 'Support Agent',
      avatar: 'https://i.pravatar.cc/150?img=1' // Placeholder image
    },
    {
      quote: "Submitting a ticket was incredibly simple and I got a response much faster than I expected. It's great to know my issue is being looked at right away.",
      name: 'Arjun Kumar',
      role: 'Customer',
      avatar: 'https://i.pravatar.cc/150?img=3' // Placeholder image
    },
    {
      quote: "The dashboard gives me a clear overview of everything. I love that I can see the priority of tickets at a glance. It has made our team so much more efficient.",
      name: 'Rohan Gupta',
      role: 'Lead Support Agent',
      avatar: 'https://i.pravatar.cc/150?img=5' // Placeholder image
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Think
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
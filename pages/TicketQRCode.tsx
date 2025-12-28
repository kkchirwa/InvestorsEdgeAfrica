import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

const TicketQRCode: React.FC = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Your Ticket</h2>
        <p className="mb-4">{ticket.fullName} - {ticket.ticketType}</p>
        <QRCode value={id} size={200} />
        <p className="mt-4 text-sm text-gray-500">Show this QR code at the event entrance</p>
      </div>
    </div>
  );
};

export default TicketQRCode;

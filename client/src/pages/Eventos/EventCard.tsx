import React from 'react';

type EventCardProps = {
  image: string;
  title: string;
  time: string;
  location: string;
  date: string;
  price: string;
  category: string;
  organizer: string;
};

const EventCard: React.FC<EventCardProps> = ({ image, title, time, location, date, price, category, organizer }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} />
      <div className="event-details">
        <h3>{title}</h3>
        <p>Horário: {time}</p>
        <p>Local: {location}</p>
        <p>Categoria: {category}</p>
        <p>Data: {new Date(date).toLocaleDateString()}</p>
        <p>Preço: {price}</p>
        <p>Organizador: {organizer}</p>
      </div>
    </div>
  );
};

export default EventCard;

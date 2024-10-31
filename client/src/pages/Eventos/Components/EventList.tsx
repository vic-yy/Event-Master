import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: number;
  name: string;
  image: string;
  title: string;
  time: string;
  location: string;
  date: string;
  price: string;
  category: string;
  organizer: string;
  description: string;
}

interface EventListProps {
  events: Event[];
  handleOpenModal: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, handleOpenModal }) => {
  console.log("Eventos recebidos:", events); // Log para verificar os eventos

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          image={event.image}
          title={event.title}
          time={event.time}
          location={event.location}
          date={event.date}
          price={event.price}
          category={event.category}
          organizer={event.organizer}
          description={event.description}
          onOpenModal={() => handleOpenModal(event)}
        />
      ))}
    </div>
  );
};

export default EventList;

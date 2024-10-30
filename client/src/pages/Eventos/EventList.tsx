import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: number;
  image: string;
  title: string;
  time: string;
  location: string;
  date: string;
  price: string;
  category: string;
  organizer: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))
      ) : (
        <p className="no-events-message">Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default EventList;

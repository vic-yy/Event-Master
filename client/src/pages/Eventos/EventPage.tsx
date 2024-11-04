import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filter';
import EventList from './Components/EventList';
import { Event } from './types/Event';
import EventDetailsModal from './Components/EventDetailsModal'; 
import './style.css';
import { getMyself } from '../../services/user/me';
import { Box, Typography } from '@mui/material';

const EventPage = () => {
  const [eventType, setEventType] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventData, setEventData] = useState<Event[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  const [logged, setLogged] = useState(false);   

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const me = await getMyself();
        
        if(me) setLogged(true);
        else return;
        
        localStorage.setItem('userId', me.data.userId);      
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3030/api/event/getAll');
        setEventData(response.data);
      } catch (error) {
        setError('Erro ao buscar eventos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = eventData.filter((event) => {
    const matchesType = eventType ? event.category.toLowerCase() === eventType.toLowerCase() : true;
    const eventStartHour = parseInt(event.time.split(':')[0], 10);
    const matchesTime = eventTime === 'morning'
      ? eventStartHour >= 8 && eventStartHour < 12
      : eventTime === 'afternoon'
      ? eventStartHour >= 12 && eventStartHour < 18
      : eventTime === 'evening'
      ? eventStartHour >= 18 && eventStartHour < 23
      : true;

    const eventDate = new Date(event.date);
    const matchesStartDate = startDate ? eventDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? eventDate <= new Date(endDate) : true;
    const matchesCategory = activeCategory === 'All' || activeCategory === '' || event.organizer === activeCategory;

    return matchesType && matchesTime && matchesStartDate && matchesEndDate && matchesCategory;
  });

  return (
    <div className="event-page">
      {!logged? 
      (<Box className="forb">
        <Typography variant="h5" color="error">
          Forbidden
        </Typography>
      </Box>) : 
      ( <div>
        <SearchBar
        eventType={eventType}
        setEventType={setEventType}
        eventTime={eventTime}
        setEventTime={setEventTime}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Filters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {loading ? (
        <p>Carregando eventos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EventList events={filteredEvents} handleOpenModal={handleOpenModal} />
      )}

      <EventDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
      </div>
      )
    }
    </div>
  );
};

export default EventPage;

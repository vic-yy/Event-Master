import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Filters from './Filter';
import EventList from './EventList';
import './style.css';


const eventData = [
    {
      id: 1,
      name: 'Inteligência artificial: até quando teremos emprego?',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy85CghxDgvHub6aPkBf-dwZwK8JKl_2XUjw&s',
      title: 'Inteligência artificial: até quando teremos emprego?',
      time: '19:00 - 20:00',
      location: 'ICEX - 2024',
      date: '2024-09-20',
      price: 'Gratuito por pessoa',
      category: 'Palestra',
      organizer: 'DCC',
    },
    {
      id: 2,
      name: 'Programação competitiva de HTML',
      image: 'html-competition.jpg',
      title: 'Programação competitiva de HTML',
      time: '13:00 - 14:00',
      location: 'ICEX - 1990',
      date: '2024-09-20',
      price: 'Gratuito por pessoa',
      category: 'Competição',
      organizer: 'ICEX',
    },
    {
      id: 3,
      name: 'Calourada Computação 2024',
      image: 'calourada.jpg',
      title: 'Calourada Computação 2024',
      time: '19:00 - 23:00',
      location: 'CAD 3 - 302',
      date: '2024-09-20',
      price: 'R$ 5,00 por pessoa',
      category: 'Festa',
      organizer: 'CC',
    },
    {
      id: 4,
      name: 'Os projetos mais avançados de robótica em Minas Gerais',
      image: 'robotics-event.jpg',
      title: 'Os projetos mais avançados de robótica em Minas Gerais',
      time: '18:00 - 20:00',
      location: 'CAD 3 - 301',
      date: '2024-09-20',
      price: 'Gratuito por pessoa',
      category: 'Evento de Empresa',
      organizer: 'Eng Sistemas',
    },
    {
      id: 5,
      name: 'Workshop de Python: automação para iniciantes',
      image: 'python-workshop.jpg',
      title: 'Workshop de Python: automação para iniciantes',
      time: '09:00 - 12:00',
      location: 'ICEX - 105',
      date: '2024-10-02',
      price: 'R$ 30,00 por pessoa',
      category: 'Workshop',
      organizer: 'DCC',
    },
    {
      id: 6,
      name: 'Palestra: Introdução à Segurança Cibernética',
      image: 'cybersecurity.jpg',
      title: 'Palestra: Introdução à Segurança Cibernética',
      time: '15:00 - 17:00',
      location: 'CAD 1 - 101',
      date: '2024-10-05',
      price: 'Gratuito por pessoa',
      category: 'Palestra',
      organizer: 'SI',
    },
    {
      id: 7,
      name: 'Hackathon: 24 horas de inovação',
      image: 'hackathon.jpg',
      title: 'Hackathon: 24 horas de inovação',
      time: '10:00 - 10:00',
      location: 'CAD 1 - 201',
      date: '2024-10-10',
      price: 'Gratuito por pessoa',
      category: 'Competição',
      organizer: 'Eng Elétrica',
    },
    {
      id: 8,
      name: 'Encontro de Networking: Tecnologias do Futuro',
      image: 'networking-event.jpg',
      title: 'Encontro de Networking: Tecnologias do Futuro',
      time: '18:00 - 21:00',
      location: 'ICEX - 202',
      date: '2024-10-15',
      price: 'Gratuito por pessoa',
      category: 'Evento de Empresa',
      organizer: 'Eng Sistemas',
    },
    {
      id: 9,
      name: 'Seminário MatComp: O Futuro dos Algoritmos',
      image: 'matcomp-seminar.jpg',
      title: 'Seminário MatComp: O Futuro dos Algoritmos',
      time: '14:00 - 16:00',
      location: 'ICEX - 203',
      date: '2024-10-18',
      price: 'R$ 20,00 por pessoa',
      category: 'Seminário',
      organizer: 'MatComp',
    },
    {
      id: 10,
      name: 'Workshop: Testes de Software para Aplicações Críticas',
      image: 'software-testing.jpg',
      title: 'Workshop: Testes de Software para Aplicações Críticas',
      time: '10:00 - 12:00',
      location: 'ICEX - 305',
      date: '2024-11-01',
      price: 'R$ 50,00 por pessoa',
      category: 'Workshop',
      organizer: 'CC',
    }
  ];


  const EventPage = () => {
    // Estados dos filtros
    const [eventType, setEventType] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');    
  

    const filteredEvents = eventData.filter((event) => {
        const matchesType = eventType ? event.category.toLowerCase() === eventType : true;
        const matchesTime = eventTime ? checkTimeRange(event.time, eventTime) : true;
        const eventDate = new Date(event.date);
        const matchesStartDate = startDate ? eventDate >= new Date(startDate) : true;
        const matchesEndDate = endDate ? eventDate <= new Date(endDate) : true;
        const matchesCategory = activeCategory === "All" || activeCategory === "" || event.organizer === activeCategory;
      
        return matchesType && matchesTime && matchesStartDate && matchesEndDate && matchesCategory;
      });
      

const checkTimeRange = (eventTimeStr: string, selectedTimeRange: string) => {
    if (!eventTimeStr) {
      return true;
    }

  
    const [eventStartTimeStr, eventEndTimeStr] = eventTimeStr.split(/\s*[-–—]\s*/);
    const eventStartHour = parseInt(eventStartTimeStr.split(':')[0], 10);
    const eventEndHour = eventEndTimeStr ? parseInt(eventEndTimeStr.split(':')[0], 10) : eventStartHour;
  
    if (isNaN(eventStartHour)) {
      return true;
    }

    if (selectedTimeRange === 'morning') {
      return eventStartHour >= 8 && eventStartHour < 12;
    } else if (selectedTimeRange === 'afternoon') {
      return eventStartHour >= 12 && eventStartHour < 18;
    } else if (selectedTimeRange === 'evening') {
      return eventStartHour >= 18 && eventStartHour < 23;
    }
    
    return true;
  };
  
  
  
  
  return (
    <div className="event-page">
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
      <EventList events={filteredEvents} />
    </div>
  );
};

export default EventPage;
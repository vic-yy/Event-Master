import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Filters from './Filter';
import EventList from './EventList';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import './style.css';

const EventPage = () => {
  const [eventType, setEventType] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');    
  const [openModal, setOpenModal] = useState(false);

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
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const eventData: Event[] = [
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
      description: 'Uma palestra sobre o impacto da inteligência artificial no mercado de trabalho futuro.'
    },
    {
        id: 2,
        name: 'Programação competitiva de HTML',
        image: 'https://i.ytimg.com/vi/qMjYT2xdZ2w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDofinZ7nId1RIeWoAhLvV3R07MWw',
        title: 'Programação competitiva de HTML',
        time: '13:00 - 14:00',
        location: 'ICEX - 1990',
        date: '2024-09-20',
        price: 'Gratuito por pessoa',
        category: 'Competição',
        organizer: 'ICEX',
        description: 'Uma competição de programação focada em HTML.'
      },
      {
        id: 3,
        name: 'Calourada Computação 2024',
        image: 'https://img.freepik.com/free-psd/3d-view-character-dj_23-2150857251.jpg',
        title: 'Calourada Computação 2024',
        time: '19:00 - 23:00',
        location: 'CAD 3 - 302',
        date: '2024-09-20',
        price: 'R$ 5,00 por pessoa',
        category: 'Festa',
        organizer: 'CC',
        description: 'Uma festa de boas-vindas para os calouros de Computação.'
      },
      {
        id: 4,
        name: 'Os projetos mais avançados de robótica em Minas Gerais',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQagjKLz1gFFe6g8qatU8NjViRQYl81kDLEfg&s',
        title: 'Os projetos mais avançados de robótica em Minas Gerais',
        time: '18:00 - 20:00',
        location: 'CAD 3 - 301',
        date: '2024-09-20',
        price: 'Gratuito por pessoa',
        category: 'Evento de Empresa',
        organizer: 'Eng Sistemas',
        description: 'Uma apresentação dos projetos de robótica mais avançados em Minas Gerais.'
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
        description: 'Um workshop introdutório sobre automação com Python.'
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
        description: 'Uma palestra introdutória sobre segurança cibernética.'
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
        description: 'Um hackathon de 24 horas focado em inovação tecnológica.'
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
        description: 'Um encontro de networking para discutir tecnologias do futuro.'
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
        description: 'Um seminário sobre o futuro dos algoritmos.'
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
        description: 'Um workshop sobre testes de software para aplicações críticas.'
      }
  ];

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
      <EventList events={filteredEvents} handleOpenModal={handleOpenModal} />

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>

          <CardMedia
            component="img"
            height="200"
            image={selectedEvent?.image}
            alt={selectedEvent?.title}
            style={{ borderRadius: '8px', marginBottom: '16px' }}
          />

          <Typography variant="body1" gutterBottom>
            <strong>Horário:</strong> {selectedEvent?.time}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Local:</strong> {selectedEvent?.location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Data:</strong> {selectedEvent?.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Preço:</strong> {selectedEvent?.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Categoria:</strong> {selectedEvent?.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Organizador:</strong> {selectedEvent?.organizer}
          </Typography>

          <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px', marginBottom: '16px' }}>
            {selectedEvent?.description}
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={() => console.log(`Inscrito no evento: ${selectedEvent?.title}`)}
            sx={{ marginTop: '16px' }}
          >
            Inscrever-se
          </Button>
        </DialogContent>
        <Button onClick={handleCloseModal} color="primary" sx={{ margin: '16px' }}>
          Fechar
        </Button>
      </Dialog>
    </div>
  );
};

export default EventPage;

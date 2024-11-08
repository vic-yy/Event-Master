import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filter';
import EventList from './Components/EventList';
import { Event } from './types/Event';
import EventDetailsModal from './Components/EventDetailsModal';
import './style.css';
import { getMyself } from '../../services/user/me';

import { List, ListItem, ListItemText, Box, Typography, TextField, InputAdornment, IconButton, Divider, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import FloatingButton from '../Eventos/Components/FloatingButton';
import { logout } from '../../services/user/logout';
import { useNavigate } from 'react-router-dom';
import { getAll } from '../../services/event/get';
import { updateMainData } from '../../services/user/update';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
  const navigate = useNavigate();

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
        const me = await getMyself();
        const response2 = await axios.get(`http://localhost:3030/api/participant/getByUserId/${me.data.userId}`);
        const eventIds = response2.data.map(item => item.eventId);
        const eventPromises = eventIds.map(id => axios.get(`http://localhost:3030/api/event/getById/${id}`));
        const events = await Promise.all(eventPromises);
        setEventData(events.map(event => event.data));
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

    event.image = '../' + event.image;

    return matchesType && matchesTime && matchesStartDate && matchesEndDate && matchesCategory;
  });


  const [openDialog, setOpenDialog] = useState(false);

  interface UserMySelfProps {
    userId: number; 
    name: string;
    email: string; 
    role: string;
  };

  const [user, setUser] = useState<UserMySelfProps | null>(null);

  const handleOpenDialog = async () => {

    try {
      const userContent = await getMyself();
      setUser(userContent.data);
      setOpenDialog(true);
    } catch (error) {
      alert("Erro ao buscar dados do usuário");
      console.error("Error fetching user data:", error);
    }

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const [mainEvents, setMainEvents] = useState<Event[]>([]);

  useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedQuery(searchQuery);
      }, 20);
      return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
      const fetchEvents = async () => {
          if (debouncedQuery.trim()) {
              try {
                  
                  const results = mainEvents.filter((event: Event) => {
                    return (debouncedQuery) && event.title.toLowerCase().includes(debouncedQuery.toLowerCase());
                  });
                  setEvents(results);
              } catch (error) {
                  console.error("Error fetching events:", error);
              }
          } else {
              setEvents([]);
          }
      };
      fetchEvents();
  }, [debouncedQuery]);
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
      setSearchQuery("");
      setEvents([]); 
  };

  const handleLogout = () => {
    try{
      logout();
      localStorage.removeItem('userId');
      setLogged(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateAccount = async () => {
    try {

      const body = {
        name: user?.name,
        email: user?.email
      }

      if(user?.userId) await updateMainData(user?.userId, body);
      else throw new Error("UserID not found"); 
      
      alert("Dados do usuário atualizados com sucesso!");
      handleCloseDialog();
    } catch (error) {
      alert("Erro ao atualizar dados do usuário");
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Box>
      {!logged? 
      (<Box className="forb">
        <Typography variant="h5" color="error">
          Forbidden
        </Typography>
      </Box>) : 
      (
      <Box>
        <Box
          display="flex"
          alignItems="center"
          padding={1.4}
        >
          <Box
            component="img"
            src="../../src/assets/logo.jpeg"
            alt="Logo"
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%'
            }}
          />

          <Typography variant="h6" sx={{ color: "black" }}>
            Event Master
          </Typography>
          
          <Box sx={{ margin: '0 auto', flexGrow: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          
              <Box> 
              <TextField
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Procurando por algum evento?"
                      variant="outlined"
                      size="small"
                      sx={{
                          backgroundColor: '#ffffff',
                          width: 500,
                          '& .MuiOutlinedInput-root': {
                              borderRadius: 5,
                              '& fieldset': {
                                  borderColor: '#000000',
                              },
                              '&:hover fieldset': {
                                  borderColor: '#000000',
                              },
                              '&.Mui-focused fieldset': {
                                  borderColor: '#000000',
                              },
                          },
                      }}
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <SearchIcon sx={{ fontSize: 24, color: '#000' }} />
                              </InputAdornment>
                          ),
                          endAdornment: searchQuery && (
                              <InputAdornment position="end">
                                  <IconButton onClick={clearSearch} sx={{ padding: 0 }}>
                                      <ClearIcon sx={{ fontSize: 24, color: '#000' }} />
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }}
                  />
              </Box>
            
              {searchQuery && (
                <Box
                  sx={{
                      position: 'absolute',      
                      top: '70px',                
                      left: '51.3%',              
                      transform: 'translateX(-50%)', 
                      borderRadius: 2,
                      border: "1px solid #ddd",
                      backgroundColor: "#fff",
                      maxHeight: 300,
                      width: 500,
                      overflowY: "auto",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      zIndex: 1,
                  }}
              >
                <List>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <ListItem
                        key={event.id}
                        divider
                        sx={{
                          '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          },
                        }}
                        onClick={() => {
                          setSearchQuery(event.title);
                        
                          handleOpenModal(event)
                        }}
                      >
                      <ListItemText primary={event.title}  sx={{ '& .MuiTypography-root': { fontSize: '16px' } }}/> 
                      </ListItem>
                    ))
                  ) : (
                    debouncedQuery && (
                      <ListItem 
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          },
                        }}>
                        <ListItemText primary={"Nenhum evento encontrado!"}  sx={{ '& .MuiTypography-root': { fontSize: '16px' } }}/>
                        </ListItem>
                    )
                  )}
                </List>
              </Box>
              )}
              
          </Box> 
              
          <Box display="flex" alignItems="center" sx={{ gap: 1.5, marginRight: 3 }} >

            <Typography
              component="span"
              onClick={handleOpenDialog}
              sx={{
                marginRight: 2,
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Meu perfil
            </Typography>

            <Dialog
              maxWidth="sm"
              PaperProps={{
                sx: {
                  borderRadius: '16px',
                  width: '450px ',
                },
              }}
              open={openDialog} 
              onClose={handleCloseDialog}>

              <DialogTitle variant="h5" style={{ textAlign: 'center', padding: '0px', marginTop: '20px' }}>
                
                <Typography variant="h4" sx={{ marginBottom: '30px', color: 'black'}}>
                  Meu perfil
                </Typography>

                <Typography variant="body1" color="textSecondary" sx={{ marginTop: '0px', marginBottom: '20px', color: 'black' }}>
                  Edite suas informações pessoais abaixo:
                </Typography>

                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                  >
                  <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
              </DialogTitle>

              <DialogContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  padding: '0px 20px 40px 20px',
                }}
              >
                <IconButton
                    onClick={handleCloseDialog}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                    }}
                  >
                    <CloseIcon sx={{ color: 'black' }}/>
                  </IconButton>
                <Box
                  component="img"
                  src="./src/assets/default_profile_picture.png"
                  sx={{
                    width: 160,
                    height: 160,
                    marginBottom: 2,
                    alignSelf: "center"
                  }}
                />

                <TextField
                  label="Nome"
                  value={user?.name}
                  onChange={(e) => setUser(
                    { 
                      email: user?.email || "",
                      name: e.target.value,
                      role: user?.role || "",
                      userId: user?.userId || 0
                    })}
                  fullWidth
                />

                <TextField
                  label="Email"
                  onChange={(e) => setUser(
                    { 
                      email: e.target.value,
                      name: user?.name || "",
                      role: user?.role || "",
                      userId: user?.userId || 0
                    })}
                  value={user?.email}
                  fullWidth
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdateAccount}
                  sx={{
                    marginTop: '12px',
                    borderRadius: '5px',
                    padding: '5px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    backgroundColor: '#228B22',
                    '&:hover': {
                        backgroundColor: '#006400',
                    }
                    }}
                >
                  Salvar alterações
                </Button>

              </DialogContent>

            </Dialog>

            <Typography
              component="a"
              onClick={handleLogout}
              sx={{
                cursor: 'pointer',
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sair
            </Typography>
          </Box>

        </Box>

        <Divider 
          sx={{ 
            borderColor: '#888',
            borderWidth: 1,
            opacity: 0.75,
            mb: 2
          }}>
        </Divider>

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
        
      </Box>
      )}

      <FloatingButton />
    
    </Box>

  );
};

export default EventPage;




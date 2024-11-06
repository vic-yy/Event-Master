import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Event } from '../types/Event'; 
import { useNavigate } from 'react-router-dom';
import { getParticipantById } from '../../../services/participant/get';
import { createParticipant } from "../../../services/participant/create";

interface EventDetailsModalProps {
    open: boolean;
    onClose: () => void;
    event: Event | null;
  }

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event }) => {
  if (!event) return null;

  const navigate = useNavigate();
  const [participant, setParticipant] = React.useState<{ role: string } | null>(null);
  const [ok, setOk] = React.useState(false);

  useEffect(() => {
    const curUserId = localStorage.getItem('userId');

    const fetchEvent = async () => {
      const fetchedParticipant = await getParticipantById(Number(curUserId), Number(event.eventId));
      console.log(fetchedParticipant);
      setParticipant(fetchedParticipant);


      if (fetchedParticipant && fetchedParticipant.role == "owner") {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    
    fetchEvent();
  }, [event]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = event.eventId;
    const userId = localStorage.getItem("userId");

    if (userId && eventId) {
      // Cria um participante para o evento
      const participantBody = {
        userId: Number(userId),
        eventId: Number(eventId),
        role: "admin" // Define o papel do usuário no evento, por exemplo "owner"
      };
      
      await createParticipant(participantBody);
    }
    console.log(`Inscrito no evento: ${event.title}`);
  };

  const handleEdit = () => {
    navigate(`/eventos/editar/${event.eventId}`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="200"
          image={event.image}
          alt={event.title}
          style={{ borderRadius: '8px', marginBottom: '16px' }}
        />
        <Typography variant="body1" gutterBottom>
          <strong>Horário:</strong> {event.time}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Local:</strong> {event.location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Data:</strong> {event.date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Preço:</strong> {event.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Categoria:</strong> {event.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Organizador:</strong> {event.organizer}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px', marginBottom: '16px' }}>
          {event.description}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleSubscribe}
          sx={{ marginTop: '16px' }}
        >
          Inscrever-se
        </Button>
        {ok &&
        <Button 
          onClick={handleEdit} 
          color="primary" 
          variant='contained'
          fullWidth
          sx={{ marginTop: '16px' }}
        >
          
          Editar
        </Button>}
      </DialogContent>
      <Button onClick={onClose} color="primary" sx={{ margin: '16px' }}>
        Fechar
      </Button>
    </Dialog>
  );
};

export default EventDetailsModal;

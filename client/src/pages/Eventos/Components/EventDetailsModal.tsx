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
import { IconButton, Alert, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EventDetailsModalProps {
    open: boolean;
    onClose: () => void;
    event: Event | null;
  }

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event }) => {
  if (!event) return null;

  const navigate = useNavigate();
  const [participant, setParticipant] = React.useState<{ role: string } | null>(null);
  const [pok, setPok] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  useEffect(() => {
    const curUserId = localStorage.getItem('userId');

    const fetchEvent = async () => {
      const fetchedParticipant = await getParticipantById(Number(curUserId), Number(event.eventId));
      console.log(fetchedParticipant);
      setParticipant(fetchedParticipant);


      if (fetchedParticipant) {
        setPok(true);
        if (fetchedParticipant.role == "owner"){
          setOk(true);
        } else {
          setOk(false);
        }
      } else {
        setPok(false);
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
    window.location.reload();
    console.log(`Inscrito no evento: ${event.title}`);
  };

  const handleEdit = () => {
    navigate(`/eventos/editar/${event.eventId}`);
  };

  const parsedDate = new Date(event.date);
  const day = parsedDate.getUTCDate();
  const month = parsedDate.getUTCMonth() + 1;
  const year = parsedDate.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  
  const timeString = event.time;
  const [hours, minutes] = timeString.split(':');
  const formattedTime = `${hours}h${minutes}min`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <DialogTitle variant="h5" style={{ textAlign: 'center', padding: '0px', marginTop: '20px' }}>
                
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 1 }}>
            {event.title}
          </Typography>
        
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          >
          <CloseIcon sx={{ color: 'black' }} />
        </IconButton>

      </DialogTitle>

      <DialogContent>
        <CardMedia
          component="img"
          image={event.image}
          alt={event.title}
          style={{
            borderRadius: '8px',
            marginBottom: '16px',
            objectFit: 'cover'
          }}
        />
        <Typography variant="body1" gutterBottom>
          <strong>Horário:</strong> {formattedTime}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Local:</strong> {event.location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Data:</strong> {formattedDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Preço:</strong> R$ {event.price}
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
                  
        {!pok &&
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleSubscribe}
          sx={{
            marginTop:'5px',
            backgroundColor: "#FFD700",
            "&:hover": {
              backgroundColor: "#FFBF00",
            },
            padding: '5px',         
            borderRadius: '5px' 
          }}
        >
          Inscrever-se
        </Button>}
    
        {pok && (
          <Box 
            sx={{ 
              backgroundColor: '#f0f4f8', 
              padding: '12px', 
              borderRadius: '8px', 
              marginTop: '16px', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center' 
            }}
          >
            <Typography variant="body1" color="textPrimary">
              🎉 Você já está inscrito neste evento!
            </Typography>
          </Box>
        )}

        {ok &&
        <Button 
          onClick={handleEdit} 
          color="primary" 
          variant='contained'
          fullWidth
          sx={{
            marginTop:'16px',
            backgroundColor: "#333333",
            "&:hover": {
              backgroundColor: "#000",
            },
            padding: '5px',         
            borderRadius: '5px' 
          }}
        >
          Editar
        </Button>}

      </DialogContent>

    </Dialog>
  );
};

export default EventDetailsModal;

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Event } from '../types/Event'; 

interface EventDetailsModalProps {
    open: boolean;
    onClose: () => void;
    event: Event | null;
  }

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ open, onClose, event }) => {
  if (!event) return null; // Retornar null se o evento for null

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
          onClick={() => console.log(`Inscrito no evento: ${event.title}`)}
          sx={{ marginTop: '16px' }}
        >
          Inscrever-se
        </Button>
      </DialogContent>
      <Button onClick={onClose} color="primary" sx={{ margin: '16px' }}>
        Fechar
      </Button>
    </Dialog>
  );
};

export default EventDetailsModal;

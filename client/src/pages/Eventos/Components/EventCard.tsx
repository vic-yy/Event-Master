import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';

type EventCardProps = {
  image: string;
  title: string;
  time: string;
  location: string;
  date: string;
  price: string;
  category: string;
  organizer: string;
  description: string;
  onOpenModal: () => void; 
};

const EventCard: React.FC<EventCardProps> = ({ image, title, time, location, date, price, category, organizer, onOpenModal }) => {

  return (
    <Card
      sx={{
        maxWidth: 250,
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }} onClick={onOpenModal}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover', display: 'block' }}
        />
        <CardContent sx={{ padding: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333', marginBottom: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            📍 {location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            🕒 {time}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            📂 {category}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#999', fontSize: 13 }}>
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#3e9f7b' }}>
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#999', fontSize: 13 }}>
            Organizador: {organizer}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent sx={{ padding: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={onOpenModal}
          sx={{ backgroundColor: '#1976d2' }}
        >
          Mais Detalhes
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;

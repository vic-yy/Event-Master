import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParticipantById } from "../../services/participant/get";
import { getEventById } from "../../services/event/get";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { updateEvent } from "../../services/event/update";

interface EventEdit {
  id: number;
  description: string;
  title: string;
  image: string;
  time: string;
  location: string;
  date: string;
  price: number;
  category: string;
  organizer: string;
}

const EventEditPage = () => {
  const [ok, setOk] = useState(false);
  const { id } = useParams();
  const [event, setEvent] = useState<EventEdit | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const curUserId = localStorage.getItem("userId");

    const fetchEvent = async () => {
      try {
        let response = await getEventById(Number(id));

        response.date = response.date.split("T")[0];
        setEvent(response);

        const participant = await getParticipantById(Number(id), Number(curUserId));
        console.log(participant)  

        if (participant && participant.role == "owner") {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => {
      if (prevEvent) {
        return {
          ...prevEvent,
          [name]: value,
        };
      }
      return prevEvent;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event) return;

    const body = {
      title: event?.title,
      description: event?.description,
      image: event?.image,
      time: event?.time,
      location: event?.location,
      date: new Date(event?.date + 'T' + event?.time + 'Z').toISOString(),
      price: String(event?.price),
      category: event?.category,
    };

    console.log(body);

    try {
      const res = await updateEvent(Number(id), body);
      console.log("Evento atualizado com sucesso!");
      console.log(res);
      alert("Evento atualizado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      {ok ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            maxWidth: '600px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginBottom: '10px',
                backgroundColor: '#9c9b9b',  
              }}
            >

            </Box>
            <Typography variant="h4" gutterBottom>
              Edit Event
            </Typography>
          </Box>
          {event && (
            <>
              <TextField
                label="Título"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Descrição"
                name="description"
                value={event.description}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="URL Público da Imagem"
                name="image"
                value={event.image}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Horário"
                type="time"
                name="time"
                value={event.time}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Local"
                name="location"
                value={event.location}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Data"
                type="date"
                name="date"
                value={event.date}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                required
                fullWidth
              />
              <TextField
                label="Preço"
                type="number"
                name="price"
                value={event.price}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Categoria"
                name="category"
                value={event.category}
                onChange={handleChange}
                required
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Salvar Mudanças
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/eventos")}
              >
                Cancelar
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Typography variant="h5" color="error">
          Forbidden
        </Typography>
      )}
    </Container>
  );
};

export default EventEditPage;

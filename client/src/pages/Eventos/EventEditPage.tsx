import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParticipantById } from "../../services/participant/get";
import { getEventById } from "../../services/event/get";
import { createGroup } from "../../services/group/create";
import { deleteEvent } from "../../services/event/delete";
import { deleteEventGroup } from "../../services/eventGroup/delete";
import { deleteParticipant } from "../../services/participant/delete";
import { getEventGroupByEventId } from "../../services/eventGroup/get";
import { getParticipantByEventId } from "../../services/participant/gett";
import { createEventGroup } from "../../services/eventGroup/create";
import { createUserGroup } from "../../services/userGroup/create";
import { getGroupByTitle } from "../../services/group/get";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { updateEvent } from "../../services/event/update";

import ImageSelectorModal from "./Components/ImageSelectorModal";

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
  const [openImageSelector, setOpenImageSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const curUserId = localStorage.getItem("userId");

    const fetchEvent = async () => {
      try {
        let response = await getEventById(Number(id));

        response.date = response.date.split("T")[0];
        setEvent(response);

        const participant = await getParticipantById(Number(curUserId), Number(id));
        console.log(participant) 
        
        if (participant && participant.role == "owner") {
          setOk(true);
        } else {
          setOk(false);
        }

        setSelectedImage(event == null ? "" : event.image);

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

  const handleDeletion = async (e: React.FormEvent) => {
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
      const eventId = Number(id);
      const res = await deleteEvent(eventId);
      try {
        const X = await getEventGroupByEventId(eventId);
        const Y = await getParticipantByEventId(eventId);
        for(let item of X){
          const del = item.data.event_groupId;
          await deleteEventGroup(del);
        }
        for(let item of Y){
          const del = item.data.participantId;
          await deleteParticipant(del);
        }
      } catch (error){
        console.error(error);
      }
      console.log("Evento deletado com sucesso!");
      console.log(res);
      alert("Evento deletado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      console.error(error);
    }
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
      const X = await getGroupByTitle(body.category);
      const eventId = Number(id);
      const userId = localStorage.getItem("userId");
      const res = await updateEvent(eventId, body);
      if(X.data.title != body.category){
              const str = "..."
              const res2 = await createGroup({title: body.category, description: str});
              const groupId = res2.data.groupId
              console.log("Categoria criada com sucesso!");
              console.log(res2);
              if (userId && groupId && eventId) {
                // Cria um objeto Categoria-Usuário
                const relationBody = {
                  userId: Number(userId),
                  groupId: Number(groupId),
                  role: "owner"};
                const relation2Body = {
                  eventId: Number(eventId),
                  groupId: Number(groupId)};
                await createUserGroup(relationBody);
                await createEventGroup(relation2Body);
              }
      }
      console.log("Evento atualizado com sucesso!");
      console.log(res);
      alert("Evento atualizado com sucesso!");
      navigate("/eventos");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModalSelectImage = () => {
    setOpenImageSelector(true);
  };

  const handleCloseModalSelectImage = () => {
    setOpenImageSelector(false);
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setEvent((prevEvent) => {
      if (prevEvent) {
        return {
          ...prevEvent,
          image,
        };
      }
      return prevEvent;
    });
    setOpenImageSelector(false);
  }

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
                multiline
              />
              <TextField
                label="Imagem"
                name="image"
                value={event.image}
                // onChange={handleChange}
                // required
                disabled
                // fullWidth
              />
              <Button 
                variant="contained"
                color="primary"
                onClick={handleOpenModalSelectImage}
              >
                Escolher Imagem
              </Button>

              <ImageSelectorModal
                open={openImageSelector}
                onClose={handleCloseModalSelectImage}
                onSelect={handleImageSelect}

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
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={handleDeletion}
              >
                Deletar Evento
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

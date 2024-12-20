import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createParticipant } from "../../services/participant/create";
import { createGroup } from "../../services/group/create";
import { createEventGroup } from "../../services/eventGroup/create";
import { createUserGroup } from "../../services/userGroup/create";
import { getGroupByTitle } from "../../services/group/get";
import { createEvent } from "../../services/event/create";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import ImageSelectorModal from "./Components/ImageSelectorModal";

interface EventCreation {
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

const EventCreationPage = () => {
  const [event, setEvent] = useState<EventCreation>({
    id: 0,
    description: "",
    title: "",
    image: "",
    time: "",
    location: "",
    date: "",
    price: 0,
    category: "",
    organizer: "",
  });

  const [openImageSelector, setOpenImageSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();
  // Atualiza os dados sempre que o usuário altera o formulário.
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

  // Envia os dados no formulário para atualizar o evento.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    const body = {
      title: event?.title,
      description: event?.description,
      image: event?.image,
      time: event?.time,
      location: event?.location,
      date: new Date(event?.date + "T" + event?.time + "Z").toISOString(),
      price: String(event?.price),
      category: event?.category,
      organizer: event?.organizer,
    };

    console.log(body);

    try {
      const X = await getGroupByTitle(body.category);
      // Cria o evento e obtém o eventId do resultado
      const res = await createEvent(body);
      const eventId = res.data.eventId;  // Assume que res contém o eventId retornado pelo servidor
      console.log("Evento criado com sucesso!");
      console.log(res);

      // Obtém o userId do localStorage
      const userId = localStorage.getItem("userId");

      if (userId && eventId) {
        // Cria um participante para o evento
        const participantBody = {
          userId: Number(userId),
          eventId: Number(eventId),
          role: "owner" // Define o papel do usuário no evento, por exemplo "owner"
        };

        await createParticipant(participantBody);
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
      }
      alert("Evento e participante criados com sucesso!");
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
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Box 
            className="login-logo"
            component="img" 
            src="/src/assets/logo.jpeg"
            sx={{
                width: '100px', 
                height: '100px' 
            }}
          />

          <Typography variant="h4" gutterBottom>
            Criando evento...
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
                sx={{ 
                  padding: '5px',         
                  borderRadius: '5px',
                  backgroundColor: "#333333",
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
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
              label="Organizador"
              name="organizer"
              value={event.organizer}
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
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{
                backgroundColor: '#228B22',
                '&:hover': {
                    backgroundColor: '#006400',
                }
              }}
            >
              Salvar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/eventos")}
              sx={{
                backgroundColor: '#6C757D',
                '&:hover': {
                    backgroundColor: '#343A40',
                }
              }}
            >
              Cancelar
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default EventCreationPage;

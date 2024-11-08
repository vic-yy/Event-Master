import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const FloatingButtonWithText = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(`/eventos/criar`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreate}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        padding: '10px',         
        borderRadius: '35px',         
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor: "#333333",
        "&:hover": {
          backgroundColor: "#000",
        },
      }}
    >
      Criar um evento
    </Button>
  );
};

export default FloatingButtonWithText;
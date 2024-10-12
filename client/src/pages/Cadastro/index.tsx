import { 
  Box, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  TextField, 
  Typography 
} from '@mui/material';
import { Link } from 'react-router-dom';

import Login from '../Login';
import { useState } from 'react';
import './style.css'; 

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className="container">
        <Box className="form-container">
          <Box className="form">
              <Box className="circle"></Box>
              <Typography variant="h4" className="form-header">
                  Cadastro
              </Typography>

              <Box className="form-fields">
                  <Box>
                    <Typography variant="inherit" className="subheader">Nome: </Typography>
                    <Box className="cluster">
                      <TextField label="Primeiro nome" variant="outlined" fullWidth />
                      <TextField label="Último nome" variant="outlined" fullWidth />
                    </Box>
                  </Box>
                  <TextField label="Email" variant="outlined" type="email" fullWidth />
                  
                  <Box>
                    <Typography variant="inherit" className="subheader">Senha: </Typography>
                    <Box className="cluster">
                      <TextField 
                          label="Senha" 
                          variant="outlined" 
                          type={showPassword ? 'text' : 'password'} 
                          fullWidth 
                      /> 
                      <TextField 
                          label="Confirme sua senha" 
                          variant="outlined" 
                          type={showPassword ? 'text' : 'password'} 
                          fullWidth 
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" className="password-hint">
                      Use 8 ou mais caracteres incluindo letras e números
                  </Typography>

                  <FormControlLabel id='show-password'
                      control={
                          <Checkbox 
                              checked={showPassword} 
                              onChange={() => setShowPassword(!showPassword)} 
                              className="checkbox"
                              sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} 
                          />
                      } 
                      label="Mostrar senha" 
                  />
              </Box>
              <Box className="submit-final">
                <Button 
                    variant="contained" 
                    className="submit-btn"
                    sx={
                      {
                        borderRadius: '50px',
                        padding: '20px 50px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        backgroundColor: '#C4C4C4',
                        '&:hover': {
                          backgroundColor: '#515151',
                        }
                      }
                    }
                  >
                    Criar Conta
                </Button>

                <Typography variant="caption" className="login-link" >
                  <Link className='login-link' to="/login" style={
                    { 
                      textDecoration:'none', color: '#000'
                    }
                    }>
                    Já possui uma conta? Entre
                  </Link>
                </Typography>
              </Box>
        </Box>
        <Box className="image-container">
            <img className="logo" src='./src/assets/logo.jpeg'/>
        </Box>
      </Box>
    </Box>
  );
}

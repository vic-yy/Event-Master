import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import "./style.css";
import { createUser } from "../../services/user/create";

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      if (
        String(data.get("password")) !== String(data.get("passwordConfirm"))
      ) {
        throw new Error("Senhas não coincidem");
      }
      const password = String(data.get("password"));

      if (password.length < 6) throw new Error("Senha muito curta");

      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);

      if (!hasLowercase || !hasUppercase || !hasNumber)
        throw new Error(
          "Senha deve conter letras maiúsculas, minúsculas e números"
        );

      const body = {
        email: String(data.get("email")),
        password: String(data.get("password")),
        name: data.get("firstName") + " " + data.get("lastName"),
      };

      await createUser(body);
      alert("Usuário criado com sucesso");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  }
  return (
    <Box component="form" className="container" onSubmit={handleSubmit}>
      <Box className="form-container">
        <Box className="form">
          <Box className="circle"></Box>
          <Typography variant="h4" className="form-header">
            Cadastro
          </Typography>

          <Box className="form-fields">
            <Box>
              <Box className="cluster">
                <TextField
                  label="Primeiro nome"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                />
                <TextField
                  label="Último nome"
                  variant="outlined"
                  name="lastName"
                  fullWidth
                />
              </Box>
            </Box>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              fullWidth
            />

            <Box>
              <Box className="cluster">
                <TextField
                  label="Senha"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  name="password"
                />
                <TextField
                  label="Confirme sua senha"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  name="passwordConfirm"
                />
              </Box>
            </Box>
            <Typography variant="body2" className="password-hint">
              Use 8 ou mais caracteres incluindo letras e números
            </Typography>

            <FormControlLabel
              id="show-password"
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="checkbox"
                  sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                />
              }
              label="Mostrar senha"
            />
          </Box>
          <Box className="submit-final">
            <Button
              variant="contained"
              className="submit-btn"
              type="submit"
              sx={{
                borderRadius: "50px",
                padding: "20px 50px",
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: "#C4C4C4",
                "&:hover": {
                  backgroundColor: "#515151",
                },
              }}
            >
              Criar Conta
            </Button>

            <Typography variant="caption" className="login-link">
              <Link
                className="login-link"
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                Já possui uma conta? Entre
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box className="image-container">
          <img className="logo" src="./src/assets/logo.jpeg" />
        </Box>
      </Box>
    </Box>
  );
}

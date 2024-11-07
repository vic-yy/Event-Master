import { 
    Box, 
    Button, 
    Checkbox, 
    FormControlLabel, 
    TextField, 
    Typography,
    Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/user/login';
import { ErrorMessages } from '../../../../api/errors/ErrorMessages';
    
  export default function Login() {
    const navigate = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try{

            const bodyRequest = {
                email: String(data.get('email')),
                password: String(data.get('password'))
            };

            await login(bodyRequest);
            alert("Login efetuado com sucesso!");
            navigate('/eventos');
        }catch(err : any){
            const response = err.response;
            console.log(response)

            if (response?.data === ErrorMessages.LoginError.alreadyLoggedIn) {
                navigate('/eventos');
            } else {
            alert(response.data)
            }
        }
    }



    const [showPassword, setShowPassword] = useState(false);

    return (
        <Grid className="main-grid"
            container
            sx={{ 
                minHeight: '100vh',
                position: 'relative'
            }}  
            alignItems="center"       
            justifyContent="center"         
            >

            <Grid className='left-grid'
                item 
                xs={12} 
                md={6} 
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    backgroundImage: 'url("/src/assets/peopletalking.png")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
                >

                <Box className="main-title-box">

                    <Typography className="main-title"
                        variant="h3" 
                        sx={{ 
                            marginTop: '70px',
                            marginLeft: '70px',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                        >
                        Event Master
                    </Typography>
                            
                    <Typography className='main-title-subheader' 
                        variant="h6" 
                        sx={{ 
                            marginLeft: '70px',
                            color: 'white'                        
                        }}
                        >
                        Um aplicativo para gerenciar todos os seus eventos e lembretes!
                    </Typography>

                </Box>

            </Grid>
            
            <Grid className='right-grid'
                item
                xs={12}
                md={6}
                sx={{ 
                    flexDirection: 'row'    
                }} 
                >
                
                <Box className="form-box"
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        marginLeft: '80px',
                        marginRight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    >
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    >
                    <Box className="login-logo"
                        component="img" 
                        src="/src/assets/logo.jpeg"
                        sx={{
                            width: '100px', 
                            height: '100px' 
                        }}
                        />
                    
                    <Typography className="login-header"
                        variant="h4"
                        sx={{
                            color: '#515151',
                            marginBottom: '30px'
                        }}
                        >
                        Login
                    </Typography>
                    </Box>

                    <Box className="user-data"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '25px',
                            paddingBottom: '30px'
                        }}>
                            
                        <TextField className="email-box" 
                            name='email'
                            label="Email" 
                            variant="outlined" 
                            fullWidth />

                        <TextField className="password-box"
                            name='password'
                            label="Senha" 
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'} 
                            fullWidth
                            />

                        <FormControlLabel className="show-password-button"
                            sx={{
                                color: '#666666',
                                justifyContent: 'flex-start'
                            }}
                            control={
                                <Checkbox className="toggle-password-visibilty"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    sx={{ 
                                        color: 'black', 
                                        '&.Mui-checked': { color: 'black' } 
                                    }}
                                    />
                            } 
                            label="Mostrar senha" 
                            />

                    </Box>

                    <Box className="submit-final"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '15px'
                        }}
                        >
                    
                        <Button className="sign-up-button"
                            variant="contained"
                            type='submit'
                            sx={{
                                borderRadius: '50px',
                                padding: '20px 50px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                backgroundColor: '#C4C4C4',
                                '&:hover': {
                                    backgroundColor: '#515151',
                                }
                            }}
                            >
                            Entrar
                        </Button>

                        <Typography className="sign-up-button-caption" variant="caption">
                            <Link className="link-to-sign-up-page"
                                to="/cadastro"
                                style={{ 
                                    textDecoration:'none', color: '#000'
                                }}
                                >
                            Ainda não possui uma conta? Cadastre-se agora
                            </Link>
                        </Typography>
                    
                    </Box>

                </Box>                
            
            </Grid>
            
        </Grid>
    );
  }

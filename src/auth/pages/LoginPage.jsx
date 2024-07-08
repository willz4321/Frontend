import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useForm } from '../../hooks';
import { EyeFilledIcon, EyeSlashFilledIcon, MailIcon } from '../../assets';
import { Link as RouterLink } from 'react-router-dom';
import { AppContext } from '../../context/AppProvider';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

export const LoginPage = () => {
  const { startLogin, errorMenssage, status } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ correo: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMenssage !== undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la autenticación',
        text: errorMenssage
      });
    }
  }, [errorMenssage]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <form onSubmit={onLoginSubmit}>
          <CardHeader title="Iniciar sesión" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                type="email"
                label="Correo electrónico"
                variant="outlined"
                placeholder="Ingrese su correo electrónico"
                name="loginEmail"
                required
                value={loginEmail}
                onChange={onLoginInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                placeholder="Ingrese su contraseña"
                required
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
                type={isVisible ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleVisibility}>
                        {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" width="100%">
              <Button
                color="success"
                variant="outlined"
                disabled={isAuthenticating}
                type="submit"
              >
                Iniciar sesión
              </Button>
              <Grid container direction="row" justifyContent="start">
                <Link component={RouterLink} color="inherit" to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
              <Button color="warning" variant="outlined">
                Restablecer contraseña
              </Button>
            </Box>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

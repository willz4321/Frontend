import{ useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Alert, AlertTitle } from '@mui/material'
import { jwtDecode } from "jwt-decode";

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState('');

  const location = useLocation();
  const navigate = useNavigate();


const handleResetPassword = async(event) => {
  event.preventDefault();
  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden");
  } else {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log(token)
    try {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.correo;
      console.log(email)
      const usuario = {
        correo: email,
        password: newPassword
      }
      await starCreatNewPassword(usuario);

        setShowAlert('exito');
        
      setTimeout(() => {
        navigate('/auth/**');
      }, 4000);

     
    } catch (error) {
      setShowAlert('error')
    }
  }
};

  return (
    <Grid style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid item component={Paper} elevation={6} square lg={6}>
        <Typography component="h1" variant="h5">
          Restablecer contraseña
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar nueva contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#201F1F'}}
          >
            Restablecer contraseña
          </Button>
        </form>
        {showAlert=='error' ? (
              <Alert severity="error">
                <AlertTitle>Error!</AlertTitle>
                Datos incorrectos o fallo del sistema
              </Alert>
          ) : showAlert == 'exito' ? (
            <Alert severity="success">
            <AlertTitle>Perfecto!</AlertTitle>
               redirigiendo a la pagina de inicio
             </Alert>
          ) : null
            }
      </Grid>
    </Grid>
  )
  
};

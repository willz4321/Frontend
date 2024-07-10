import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../assets';


const formData = {
  Correo: "",
  Password: "",
  Nombre: "",
  Edad: null,
}

const formValidations = {
  Correo: [(value) => value.includes("@"), 'El correo debe tener una @'],
  Password: [(value) => value.length >= 6, 'El Password debe tener mas de 6 letras.'],
  Nombre: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
  Edad: [(value) => value >= 1, 'La edad es obligatoria']
}

export const RegisterPage = () => {
  const { startRegister, user } = useContext(AppContext);
  const [formSubmitted, setformSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { Nombre, Correo, Password, Edad, onInputChange,
           NombreValid, CorreoValid, PasswordValid, EdadValid,
        } = useForm(formData,formValidations);

  const onRegisterSubmit = async(ev) => {
    ev.preventDefault();
    try {
      await startRegister({ Nombre, Correo, Password, Edad });
      setformSubmitted(true);
    } catch (error) {
      console.error('Error en el registro:', error);
      Swal.fire('Error', 'Hubo un error al registrar el usuario', 'error');
    }
    setformSubmitted(true)
  }


  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <form onSubmit={onRegisterSubmit}>
        <CardHeader title="Registro de usuario" />
        <CardContent>
        <Grid container>        
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Nombre completo" 
                        type="text" 
                        placeholder='Nombre completo' 
                        fullWidth
                        name='Nombre'
                        required
                        value={Nombre}
                        onChange={onInputChange}
                        error={!!NombreValid && formSubmitted}
                        helperText={NombreValid}
                    />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Edad" 
                        type="number" 
                        placeholder='Ingresa tu edad' 
                        fullWidth
                        required
                        name='Edad'
                        value={Edad}
                        onChange={onInputChange}
                        error={!!EdadValid && formSubmitted}
                        helperText={EdadValid}
                    />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Correo" 
                        type="email" 
                        placeholder='correo@google.com' 
                        fullWidth
                        required
                        name='Correo'
                        value={Correo}
                        onChange={onInputChange}
                        error={!!CorreoValid && formSubmitted}
                        helperText={CorreoValid}
                    />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                    <TextField 
                        label="Contraseña" 
                        type={isVisible ? 'text' : 'password'}
                        placeholder='Contraseña' 
                        fullWidth
                        name='Password'
                        required
                        value={Password}
                        onChange={onInputChange}
                        error={!!PasswordValid && formSubmitted}
                        helperText={PasswordValid}
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
                    </Grid>
                    

                </Grid>
         </CardContent>
          <CardActions>
                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={ 12 }>
                        <Button type='submit' variant='contained' fullWidth>
                        Crear cuenta
                        </Button>
                    </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                    <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                    <Link component={ RouterLink } color='inherit' to="/auth/login">
                        ingresar
                    </Link>
                </Grid>
          </CardActions>
             
            </form>
        </Card>
    </Box>
  )
}
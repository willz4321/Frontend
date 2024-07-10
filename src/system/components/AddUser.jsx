import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider';
import { Password } from '@mui/icons-material';
import { Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../assets';

export const AddUser = ({userEdit}) => {
    const {startCreateUser, startEditUser} = useContext(AppContext)

    const [isVisible, setIsVisible] = useState(false);
    const [usuario, setUsuario] = useState(userEdit || {
        nombre: '',
        correo: '',
        password: '',
        rol: '',
        edad: null,

     })

   const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario((prevProducto) => ({
            ...prevProducto,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (userEdit == null) {
          await startCreateUser(usuario)
        }else {
           await startEditUser(usuario) 
        }
    }

  return (
    <Card>
          <CardContent xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de Usuario"
                    name="nombre"
                    type='text'
                    value={usuario.nombre}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correo Electrónico"
                    type='email'
                    name="correo"
                    value={usuario.correo}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type={isVisible ? 'text' : 'password'}
                    value={usuario.password}
                    onChange={handleChange}
                    required
                    fullWidth
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
                <Grid item xs={12} display="flex" flexDirection="row" gap={2}>
                 <Grid item xs={6}>

                    <TextField
                        label="Edad"
                        name="edad"
                        value={usuario.edad}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                 </Grid>
                 <Grid item xs={6}>
                 <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={usuario.rol}
                    label="Rol"
                    name='rol'
                    onChange={handleChange}
                    >
                      <MenuItem value={0}>ADMIN</MenuItem>
                      <MenuItem value={1}>REGULAR</MenuItem>
                    </Select>
                 </FormControl>
                 </Grid>
                </Grid>
              </Grid>
              <br />
              <Grid item xs={12} container justify="center">
                <Button type="submit" variant="outlined" color="primary">
                { userEdit ? 'Modificar Usuario' : 'Crear Usuario'}
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
  )
}

import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider';
import { Password } from '@mui/icons-material';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export const AddUser = ({userEdit}) => {
    const {starAddCategory, starEditeCategory} = useContext(AppContext)

    const [usuario, setUsuario] = useState(userEdit || {
        nombre: '',
        correo: '',
        Password: '',
        passwordValid: '',
        rol: '',
        edad: null,

     })

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
          await starAddCategory(usuario)
        }else {
           await starEditeCategory(usuario) 
        }
    }

  return (
    <Card>
          <CardContent xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de la Categoría"
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
                    label="Correo Electrionico"
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
                    name="Password"
                    type='password'
                    value={usuario.Password}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirma la Contraseña"
                    name="passwordValid"
                    type='password'
                    value={usuario.passwordValid}
                    onChange={handleChange}
                    required
                    fullWidth
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
                    onChange={handleChange}
                    >
                      <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                      <MenuItem value={'REGUNLAR'}>REGUNLAR</MenuItem>
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

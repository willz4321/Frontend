import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from "react";

export const User = () => {
  const [edit, setEdit] = useState(false)

  const updatePerfile = (e) => {
    e.preventDefault()
    setEdit(false)
    console.log()
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
      <Card sx={{ maxWidth: '50%', p: 2 }}>
        <CardHeader title="Mi Perfil" />
        <Divider />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <form onSubmit={updatePerfile}>
              <Grid container spacing={3}>
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 120, height: 120 }}
                    />
                  </Stack>
                  <Tooltip title={<span style={{ fontSize: '1.5em' }}>Editar Foto</span>} placement="right">
                    <IconButton disabled={!edit}>
                        <AddAPhotoIcon />
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Divider/>
                <Grid item container xs={12} >
                <Grid item xs={6}>
                     <TextField id="standard-basic" label="Nombre de Usuario" variant="standard" disabled={!edit} sx={{width:'90%'}}/>
                </Grid>
                <Grid item xs={6}>
                     <TextField id="standard-basic" label="Correo electrónico" variant="standard" type="email" disabled={!edit} sx={{width:'90%'}}/>
                </Grid>
                </Grid>
                <Grid item container xs={12} display="flex" justifyContent="star" alignItems="center">
                <Grid item xs={4}>
                     <TextField id="standard-basic" label="Fecha de nacimiento" type="date" variant="standard" disabled={!edit} sx={{width:'90%'}}/>
                </Grid>
                <Grid item xs={3}>
                     <TextField id="standard-basic" label="Rol" variant="standard" disabled defaultValue="Admin" sx={{width:'90%'}} isReadyOnly/>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        color="success"
                        variant="outlined"
                        type='submit'
                        >
                        Guardar 
                    </Button>
                </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
        <CardActions>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" width="100%">
                <article >
                    <Button
                    color="primary"
                    variant="outlined"
                    disabled={edit}
                    onClick={() => setEdit(true)}
                    type='submit'
                    >
                    Editar 
                    </Button>
                </article>
                <Button 
                    color="warning" 
                    variant="outlined"
                
                >
                    Restablecer contraseña
                </Button>
            </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

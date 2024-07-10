import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";

export const User = () => {
  const {startCreateUser, startEditUser, startEditMyUser, user} = useContext(AppContext)
  const [edit, setEdit] = useState(false)
 const [usuario, setusuario] = useState(user)

 const handleClickCameraIcon = () => {
  document.getElementById('fileInput').click();
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        const aspectRatio = image.width / image.height;
        let newWidth, newHeight;
  
        if (aspectRatio > 1) {
          newWidth = 150;
          newHeight = 150 / aspectRatio;
        } else {
          newWidth = 150 * aspectRatio;
          newHeight = 150;
        }
  
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        context.drawImage(image, 0, 0, newWidth, newHeight);
  
        const compressedImageData = canvas.toDataURL('image/jpeg', 0.7); 
        const base64Image = compressedImageData.replace('data:image/jpeg;base64,', '');

        setusuario((prevProducto) => ({
          ...prevProducto,
          avatar: base64Image
      }));
      };
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setusuario((prevProducto) => ({
        ...prevProducto,
        [name]: value
    }));
  };

  const updatePerfile = async(e) => {
    e.preventDefault()
    await startEditMyUser(usuario)
    setEdit(false)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
      <Card sx={{ maxWidth: 'auto', p: 2 }}>
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
                      src={`data:image/jpeg;base64,${usuario.avatar}`}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Stack>
                  <Tooltip title={<span style={{ fontSize: '1.5em' }}>Editar Foto</span>} placement="right">
                    <IconButton disabled={!edit} onClick={handleClickCameraIcon}>
                        <AddAPhotoIcon />
                    </IconButton>
                    </Tooltip>
                    <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImagenChange} />
                </Grid>
                <Divider/>
                <Grid item container xs={12} >
                <Grid item xs={6}>
                     <TextField id="standard-basic" label="Nombre de Usuario" variant="standard" name="nombre" value={usuario.nombre} disabled={!edit} sx={{width:'90%'}} onChange={handleChange}/>
                </Grid>
                <Grid item xs={6}>
                     <TextField id="standard-basic" label="Correo electrónico" variant="standard" type="email" name="correo" value={usuario.correo} disabled={!edit} sx={{width:'90%'}} onChange={handleChange}/>
                </Grid>
                </Grid>
                <Grid item container xs={12} display="flex" justifyContent="star" alignItems="center">
                <Grid item xs={4}>
                     <TextField id="standard-basic" label="Edad" type="number" variant="standard" value={usuario.edad} name="edad" disabled={!edit} sx={{width:'90%'}} onChange={handleChange}/>
                </Grid>
                <Grid item xs={3}>
                     <TextField id="standard-basic" label="Rol" variant="standard" disabled defaultValue={usuario.rol == 0 ? 'ADMIN': 'REGULAR'} sx={{width:'90%'}} isReadyOnly/>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        color="success"
                        variant="outlined"
                        type='submit'
                        disabled={!edit}
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

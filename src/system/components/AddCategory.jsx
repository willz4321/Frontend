import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'

export const AddCategory = ({categoryEdit}) => {
    const {starAddCategory, starEditeCategory} = useContext(AppContext)

    const [categoria, setCategoria] = useState(categoryEdit || {
        nombre: '',

     })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoria((prevProducto) => ({
            ...prevProducto,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (categoryEdit == null) {
          await starAddCategory(categoria)
        }else {
           await starEditeCategory(categoria) 
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
                    value={categoria.nombre}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

              </Grid>
              <br />
              <Grid item xs={12} container justify="center">
                <Button type="submit" variant="outlined" color="primary">
                { categoryEdit ? 'Modificar Categoría' : 'Crear Categoría'}
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
  )
}

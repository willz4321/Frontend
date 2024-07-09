import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'

export const AddProduct = ({ productoEdit}) => {
    const {starAddProduct, starEditeProduct, categories} = useContext(AppContext)
    const [producto, setProducto] = useState(productoEdit || {
        nombre: '',
        descripcion: '',
        precio: null,
        categoria: {}
     })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProducto((prevProducto) => ({
            ...prevProducto,
            [name]: value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (productoEdit == null) {
          await starAddProduct(producto)
        }else{
           await starEditeProduct(producto) 
        }
    }
    return (
        <Card>
          <CardContent xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre del Producto"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descripción"
                    name="descripcion"
                    type="text"
                    value={producto.descripcion}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Precio"
                    name="precio"
                    type="number"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={producto.Categoria?.nombre}
                    label="Categoría"
                    onChange={handleChange}
                    >
                   {categories.map((cat) => (
                     <MenuItem
                        key={cat.id}
                        value={cat.nombre}
                        >
                        {cat.Nombre}
                      </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Grid>
              </Grid>
              <br />
              <Grid item xs={12} container justify="center">
                <Button type="submit" variant="outlined" color="primary">
                 { productoEdit ? 'Modificar Producto' : 'Crear Producto'}
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      );
}

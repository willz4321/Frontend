import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
import React from 'react'
import {List} from '../components/'

const columnas = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'PRODUCTO',
  },
  {
    id: 'precio',
    numeric: true,
    disablePadding: false,
    label: 'PRECIO',
  },
  {
    id: 'descripcion',
    numeric: true,
    disablePadding: false,
    label: 'DESCRIPCIÓN',
  },
  {
    id: 'categoria',
    numeric: true,
    disablePadding: false,
    label: 'CATEGORÍA',
  },
]
export const Productos = ({Productos}) => {
  return (
    <Box  display="flex"  justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
    <Card sx={{ width: '100%', maxWidth: '70%', p: 2 }}>
           <CardHeader title="Lista de Productos" />
             <Divider/>
           <CardContent>
           <Box display="flex" flexDirection="column" gap={2}>
              <List rows={Productos} headCells={columnas} tipo={'productos'} />
            </Box>
           </CardContent>
    </Card>
  </Box>
  )
}

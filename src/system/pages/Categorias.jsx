import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
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
    disablePadding: false,
    label: 'CATEGORÍA',
  },
]

export const Categorias = ({Categorias}) => {
  return (
    <Box  display="flex"  justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
    <Card sx={{ width: '100%', maxWidth: '70%', p: 2 }}>
           <CardHeader title="Lista de Categorías" />
             <Divider/>
           <CardContent>
           <Box display="flex" flexDirection="column" gap={2}>
             <List rows={Categorias} headCells={columnas} tipo={'categorias'} />
           </Box>
           </CardContent>
    </Card>
  </Box>
  )
}

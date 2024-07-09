import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material"
import { List } from "../components"

const columnas = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'avatar',
    numeric: false,
    disablePadding: false,
    label: 'AVATAR',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'nombre',
  },
  {
    id: 'correo',
    numeric: false,
    disablePadding: false,
    label: 'CORREO',
  },
  {
    id: 'edad',
    numeric: false,
    disablePadding: false,
    label: 'EDAD',
  },
]

export const Usuarios = ({usuarios}) => {
  return (
    <Box  display="flex"  justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
    <Card sx={{ width: '100%', maxWidth: '70%', p: 2 }}>
           <CardHeader title="Lista de Usuarios" />
             <Divider/>
           <CardContent>
           <Box display="flex" flexDirection="column" gap={2}>
              <List rows={usuarios} headCells={columnas} tipo={'usuarios'}/>
            </Box>
           </CardContent>
    </Card>
  </Box>
  )
}

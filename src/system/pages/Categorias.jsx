import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
import {List} from '../components/'

export const Categorias = () => {
  return (
    <Box  display="flex"  justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
    <Card sx={{ width: '100%', maxWidth: '70%', p: 2 }}>
           <CardHeader title="Lista de Categorías" />
             <Divider/>
           <CardContent>
           <Box display="flex" flexDirection="column" gap={2}>
              <List />
            </Box>
           </CardContent>
    </Card>
  </Box>
  )
}

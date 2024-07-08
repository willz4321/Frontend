import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

export const SystemPage = () => {
  return (
    <Box  display="flex"  justifyContent="center" alignItems="center" minHeight="80%" bgcolor="background.default">
      <Card sx={{ width: '100%', maxWidth: 400, p: 2 }}>
             <CardHeader title="Prueba técnica - Zoco" />
             <CardContent>
             <Box display="flex" flexDirection="column" gap={2}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex', justifyContent: 'center' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Bienvenido
              </Typography>
              </Box>
             </CardContent>
      </Card>
    </Box>
  )
}

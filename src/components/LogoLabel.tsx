import { Box, Typography } from '@mui/material'
import React from 'react'
const LogoLabel = ({ label }: any) => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        pt: 2,
        pb: 2,
      }}
    >
      <img src={'logo.png'} alt="" width="50px" />
      <Typography variant="h5" gutterBottom>
        {label}
      </Typography>
    </Box>
  )
}

export default LogoLabel

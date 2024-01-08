import React from 'react'
import { PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material'
import { Box, Fab } from '@mui/material'

const Switch = ({ running, onClick }: any) => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'end',
      }}
      onClick={onClick}
    >
      <Fab variant="extended" size="small">
        <PowerSettingsNewIcon sx={{ mr: 1, color: running ? 'red' : 'green' }} />
        {running ? 'Stop' : 'Start'}
      </Fab>
    </Box>
  )
}
export default Switch

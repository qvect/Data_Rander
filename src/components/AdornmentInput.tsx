import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

interface AdornmentInputInterface {
  label: string
  value: string | number
  setValue: any
  type?: string
  variant?: "filled" | "standard" | "outlined" | undefined
}

function AdornmentInput({ type = 'text', variant = "filled", label, value, setValue }: AdornmentInputInterface) {
  return (
    <TextField
      id="input-with-icon-textfield"
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        width: '100%',
        '& .MuiFilledInput-input': {
          paddingTop: 0,
          padddingBottom: 0,
          paddingRight: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          paddingLeft: '10px',
          fontSize: '0.8rem',
          padding: '10px',
        },
        '& .MuiFilledInput-root': {
          borderBottom: 'none',
          backgroundColor: '##c9c9c9',
        },
        '& .MuiFilledInput-root:after': {
          borderBottom: 'none',
        },
      }}
      InputProps={{
        startAdornment: (
          <Box
            sx={{
              width: '50px',
              paddingRight: '10px',
            }}
          >
            <Typography sx={{ fontSize: '0.8rem' }}>{label}</Typography>
          </Box>
        ),
      }}
      variant={variant}
    />
  )
}

export default AdornmentInput

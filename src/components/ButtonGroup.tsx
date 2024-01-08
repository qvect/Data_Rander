import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import React from 'react'

const BtnGroup = ({ options, value, setValue, label }: any) => {
  return (
    <Box sx={{ pb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
        {label}
      </Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{
          '& .MuiButtonGroup-grouped': {
            borderColor: 'none',
          },
        }}
      >
        {options.map((el: any, key: any) => {
          return (
            <Button
              key={key}
              onClick={() => setValue(el.value)}
              sx={{
                fontSize: '0.7rem',
                color: value == el.value ? 'white' : 'black',
                backgroundColor: value == el.value ? '#1565c0' : 'white',
                borderRight: 'none',
                borderColor: 'none',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              {el.label}
            </Button>
          )
        })}
      </ButtonGroup>
    </Box>
  )
}

export default BtnGroup

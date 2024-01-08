import React from 'react'

import { DotWave } from '@uiball/loaders'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'

const Loader = () => {
    return (
        <Box sx={{ backgroundColor: '#e07a5f', width: 300, height: 300, borderRadius: 5, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', gridGap: 40 }}>
            <DotWave size={100} color="white" />
            <Typography sx={{ color: "white" }}>  Collecting Date!  </Typography>
        </Box>
    )
}

export default Loader
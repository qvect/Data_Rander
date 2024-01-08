import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { GptIcon } from './Icons'

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

function ResponseContainer({ loading, expanded, setExpanded, children }: any) {
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 100,
        p: 1,
        m: 1,
      }}
    >
      <Card sx={{ maxWidth: 600, minWidth: 250 }}>
        <CardActions>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                width: '100%',
              }}
            >
              <GptIcon />

              {loading ? (
                <Typography variant="body2" gutterBottom>
                  Getting Response...
                </Typography>
              ) : (
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              )}
            </Box>
            <Box>
              {loading && (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress color="success" />
                </Box>
              )}
            </Box>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{children}</CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default ResponseContainer

import { Box, Button, Radio, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SubscriptionCard = () => {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [trialOver, setTrialOver] = useState(false)

  const plans = [
    {
      planName: 'Trial',
      price: 0,
      tagline: 'Upto 10 emails only',
      disable: trialOver,
    },
    {
      planName: 'Premium',
      price: 10,
      tagline: 'Unlimited emails',
      disable: false,
    },
  ]

  const onProceedHandle = () => {
    if (trialOver) toast.error('Downloading file!', { autoClose: 2000 })
    else {
      // handle subscription here
    }
  }

  useEffect(() => {
    // add logic to setTrialOver using sync data
    setTrialOver(false)
  }, [])

  return (
    <Box>
      <Box sx={{ padding: '20px 0px' }}>
      <Typography sx={{ fontColor: 'white', fontWeight: 'bold', fontSize: 20 }}>
          Subscribe
        </Typography>
        <Typography sx={{ fontColor: 'white', fontWeight: 'bold', fontSize: 20 }}>
          Choose a plan
        </Typography>
        <Typography sx={{ fontColor: 'white', opacity: 0.7 }}>
          Select a plan that best fit your needs
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gridGap: 20,
        }}
      >
        {plans.map((plan: CardItemInterface, key: number) => {
          return (
            <CardItem
              {...plan}
              key={key}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )
        })}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', margin: '40px 0px' }}
        disabled={selectedPlan == ''}
        onClick={onProceedHandle}
      >
        Proceed
      </Button>
    </Box>
  )
}

interface CardItemInterface {
  planName: string
  price?: number
  tagline: string
}
interface CardItemExtendeInterface extends CardItemInterface {
  selectedPlan: string
  setSelectedPlan: any
}
const CardItem = ({
  planName,
  price,
  tagline,
  selectedPlan,
  setSelectedPlan,
}: CardItemExtendeInterface) => {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#e07a5f',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '10px',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      ]}
      onClick={() => setSelectedPlan(planName)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Radio checked={selectedPlan === planName} />
        </Box>
        <Box>
          <Typography fontWeight={'bold'}>{planName}</Typography>
          <Typography sx={{ fontColor: 'white', opacity: 0.8 }}>{tagline}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontColor: 'white', fontSize: 12, opacity: 0.8 }}>$</Typography>
        <Typography fontWeight={'bold'} sx={{ fontSize: 25 }}>
          {price}
        </Typography>
        <Typography
          sx={{
            fontColor: 'white',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'end',
          }}
        >
          /month
        </Typography>
      </Box>
    </Box>
  )
}
export default SubscriptionCard

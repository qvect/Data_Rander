import React from 'react'
import { Input, Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { getUserData } from '../../firebase/api'
import { toast } from 'react-toastify';
import { verifyPaypalSubscription } from '../../firebase/api';
import { updateLocalData } from '../../common/services';
import { createATab } from '../../common/browserMethods';


const Subscription = ({ setUser }: any) => {
    const [token, setToken] = useState('')

    const verifyHandle = async () => {
        const resp = await getUserData('token', token)
        const tokenDetails = resp?.[0]

        if (!tokenDetails) {
            toast.error('Invalid! Use a valid token')
        } else if (tokenDetails.package == 'trial') {
            if (tokenDetails.quota < 1) {
                toast.error('Trial quota ended, please subscribe')
            }
            else {
                toast.success('Token verified on trial basis')
                await updateLocalData({ user: tokenDetails })
                setUser(tokenDetails)
            }
        }
        else if (tokenDetails.package == 'premium') {
            const subscriptionId = tokenDetails.subscriptionId
            const resp = await verifyPaypalSubscription(subscriptionId)
            if (resp.data.status == "ACTIVE" || resp.data.status == "APPROVED") {
                toast.success('Premium token verified')
                await updateLocalData({ user: tokenDetails })
                setUser(tokenDetails)
            } else {
                toast.error('Subscription not activated')
            }
        }
    }

    return (
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                gridGap: "15px"
            }}>
                <Typography>
                    Access Token
                </Typography>
                <Box>
                    <Input value={token} onChange={(e: any) => setToken(e.target.value)} placeholder='543buc14-6e3b-4efc-bfa42' />
                </Box>
                <Button variant='contained' size='small' onClick={verifyHandle}>Verify</Button>

                <Typography>
                    OR
                </Typography>

                <Button variant='contained' size='small' color='error' onClick={() => createATab('https://www.google.com')}>Subscribe</Button>
            </Box>
        </Box >
    )
}

export default Subscription
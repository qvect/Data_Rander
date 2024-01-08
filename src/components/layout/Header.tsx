import React, { useState } from 'react'
import Logo from '../../assets/logo.png'
import { Box } from '@mui/material'
import { Menu as MenuIcon, Widgets } from '@mui/icons-material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react'
import { ScreenContext } from '../../context'
import { toast } from 'react-toastify'
import { signOutUser } from '../../firebase/authentication';
import { auth } from '../../firebase';

const Header = () => {
    const { setCurrentScreen } = useContext(ScreenContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const onClickHandle = (event: any) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = (route: string) => {
        setAnchorEl(null);
        route !== 'stay' ? setCurrentScreen(route) : null
    };
    const signOutHandle = async () => {
        await signOutUser()
        toast.success("Signed out!")
        setCurrentScreen("signIn")
    }

    return (
        <Box sx={{
            height: 30,
            backgroundColor: "rgb(239 239 239)",
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: "center",
            padding: '5px 10px'
        }}>
            <img src={'logo.png'} alt="" height={'100%'} />
            {/* <Box onClick={onClickHandle} sx={[
                {
                    '&:hover': {
                        cursor: "pointer"
                    },
                },
            ]} aria-controls={open ? 'basic-menu' : undefined} id='basic-button' aria-haspopup="true">

                {
                    open ? <Widgets /> : <MenuIcon />
                }
            </Box> */}
            {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose('stay')}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose('progress')}>Progress</MenuItem>
                <MenuItem onClick={() => handleClose('scrapper')}>Scrapper</MenuItem>
                <MenuItem onClick={() => handleClose('exportPage')}>Export</MenuItem>
                <MenuItem onClick={() => handleClose('signIn')}>Sign In</MenuItem>
                <MenuItem onClick={() => handleClose('signUp')}>Sign Up</MenuItem>
                <MenuItem onClick={() => signOutUser()}>Sign Out</MenuItem>

            </Menu> */}
        </Box>
    )
}

export default Header
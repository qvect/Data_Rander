


import React, { useState } from 'react'

import Popup from './Popup'
import Layout from '../components/layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';

const App = () => {

  return (
    <Box>
      <ToastContainer position="bottom-right" />
      <Layout>
        <Popup />
      </Layout>
    </Box>

  )
}

export default App
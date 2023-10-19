/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Avatar, Typography, Stack } from '@mui/material'
import stringAvatar from 'web/src/functions/avatarColor'

const Features = () => {
  const theme = useTheme()
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
        >
          Team Mercury
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          Meet Team Mercury!
        </Box>
        <Typography color={'textSecondary'} align={'center'} gutterBottom>
          SrA Mercedes Porter
          <br></br>
          SrA Robert Davenport
          <br></br>
          SrA Justin Hammer
          <br></br>
          SSgt Tyler Eggert
          <br></br>
          MSgt Scott McClure
          <br></br>
          Mr. Devon Knudsen
        </Typography>
      </Box>
    </Box>
  )
}

export default Features

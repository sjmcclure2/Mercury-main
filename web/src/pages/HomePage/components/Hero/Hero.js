/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery, Box, Button, Typography, Grid } from '@mui/material'
import BomberIllustration from '../../svg/illustrations/Bombers'
import { routes, Link } from '@redwoodjs/router'

const Hero = () => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })

  return (
    <Grid container spacing={4}>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              color="textPrimary"
              sx={{
                fontWeight: 700,
              }}
            >
              One system to track <br />
              <Typography
                color={'green'}
                component={'span'}
                variant={'inherit'}
              >
                sortie generation
              </Typography>
              <br />
              from cradle to grave.
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              variant="h7"
              component="p"
              color="textSecondary"
              sx={{ fontWeight: 400 }}
            >
              Currently, maintenance Airmen execute their tasks to prep aircraft
              via excel spreadsheets, paper, and word of mouth which can lead to
              clerical errors and input time. Mercury’s purpose is to improve
              this by introducing a system that will handle the status changes
              of aircraft and their maintenance tasks in real-time and give
              tools for its users to update content using modern technology.
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            <Link to={routes.login()} style={{ textDecoration: 'none' }}>
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMd ? false : true}
                href={routes.login()}
                sx={{ marginRight: '8px' }}
              >
                Try Now
              </Button>
            </Link>
            <Button
              component={'a'}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
              href={'https://forms.gle/5r1RLveiZhYZ1jXE6'}
              target={'_blank'}
            >
              Give Feedback
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          height={'100%'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            height={'auto'}
            width={'auto'}
            maxHeight={600}
            sx={{ display: 'flex' }}
          >
            <BomberIllustration width={400} height={400} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Hero

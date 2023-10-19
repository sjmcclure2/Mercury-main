/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'
import {
  Box,
  Grid,
  FormControlLabel,
  Radio,
  Card,
  RadioGroup,
  AccordionDetails,
  Typography,
  Alert,
  IconButton,
} from '@mui/material'
import FilteredMxListInfoCell from '../FilteredMxListInfoCell/FilteredMxListInfoCell'
import { OpenJobPanelContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'
import formatTailNumber from 'src/functions/formatTailNumber'
import LaunchIcon from '@mui/icons-material/Launch';

export const QUERY = gql`
  query FindJobListQuery {
    jobList: aircrafts {
      name
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ jobList }) => {
  const { currentUser } = useAuth()

  const [currAircraft, setCurrAircraft] = useState(null)

  const handleAircraftChange = (e) => {
    setCurrAircraft(e.target.value)
  }

  const [jobExpanded, setJobExpanded] = useState(false)

  const handlePanelChange = (panel) => (event, newExpanded) => {
    setJobExpanded(newExpanded ? panel : false)
  }

  return (
    <Grid container spacing={1} sx={{border:'1px solid', borderColor:'divider', borderRadius:'15px', marginTop:'auto'}}>
    <Grid item md={2} lg={2} xl={2} textAlign='center' sx={{borderRight:'1px solid', borderColor:'divider'}}>
      <Typography variant='h4' fontWeight='bold'>Aircraft</Typography>
    </Grid>
    <Grid item md={10} lg={10} xl={10} textAlign='center'>
      <Typography variant='h4' fontWeight='bold'>Jobs for {currentUser.shop.id}</Typography>
    </Grid>
      <Grid item md={2} lg={2} xl={2} sx={{overflowY: 'scroll', height: '75vh', borderTop:'1px solid', borderColor:'divider'}}>
        <RadioGroup onChange={handleAircraftChange}>
          {jobList.map((aircraft) => (
            <Box
              key={aircraft.id}
              component={Card}
              padding={3}
              borderRadius={2}
              fullWidth
              margin={1}
              height={'10px'}
              data-aos={'fade-up'}
              display="flex"
              justifyItems="center"
              justifyContent='space-between'
              alignItems='center'
            >
              <FormControlLabel
                control={<Radio />}
                value={aircraft.id}
                label={formatTailNumber(aircraft.id)}
              />
              <IconButton href={routes.aircraftDetails({id: aircraft.id})}>
                <LaunchIcon />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>
      </Grid>
      <Grid item md={10} lg={10} xl={10} sx={{overflowY: 'scroll', height: '75vh', borderTop:'1px solid', borderColor:'divider'}}>
        <AccordionDetails>
          <OpenJobPanelContext.Provider
            value={{ jobExpanded, handlePanelChange }}
          >
            {currAircraft ? (
              <FilteredMxListInfoCell
                key="mxList"
                id={parseInt(currAircraft)}
                shop_id={currentUser.shop.id}
              />
            ) :
            <Alert variant="outlined" severity="info">
              Please select an aircraft!
            </Alert>
              }
          </OpenJobPanelContext.Provider>
        </AccordionDetails>
      </Grid>
    </Grid>
  )
}

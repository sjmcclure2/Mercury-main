import React from 'react'
import { useState } from 'react'

import PropTypes from 'prop-types'
import { Box, Card, Grid, Tab, Tabs, Typography } from '@mui/material'

import DragLightCell from '../DragLightCell'
import LineActionCell from '../LineActionCell'
import ScheduleTodayAircraftInfoCell from '../ScheduleTodayAircraftInfoCell'
import ScheduleTodaySortieInfoCell from '../ScheduleTodaySortieInfoCell'
import StatusChip from '../StatusChip'
import formatTailNumber from 'src/functions/formatTailNumber'

export const ActionsContext = React.createContext(null)
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

// comment
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ScheduleTodayCard({ sortie }) {
  const [value, setValue] = React.useState(0)

  const [crewReady, setCrewReady] = useState(null)
  const [crewShow, setCrewShow] = useState(null)
  const [engineStart, setEngineStart] = useState(null)
  const [taxi, setTaxi] = useState(null)
  const [takeOff, setTakeOff] = useState(null)
  const [actualLand, setActualLand] = useState(null)
  const [engineShutdown, setEngineShutdown] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card
      elevation={7}
      sx={{
        display: 'flex',
        width: 470,
        height: 440,
      }}
    >
      <Box sx={{ width: '420' }}>
        <Box sx={{ margin: '15px' }}>
          <Grid container sx={{ margin: '3%', textAlign: 'center' }}>
            <Grid item xs={3}>
              <Typography sx={{ color: 'gray' }}>Line</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ color: 'gray' }}>Tail Number</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ color: 'gray' }}>Status</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">
                <b>{sortie.id}</b>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">
                <b>{formatTailNumber(sortie.aircraft_id)}</b>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <StatusChip status={sortie.aircraft?.status_id} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Sortie Info" {...a11yProps(0)} />
            <Tab label="Aircraft Info" {...a11yProps(1)} />
            <Tab label="Line Actions" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ScheduleTodaySortieInfoCell id={sortie.id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ScheduleTodayAircraftInfoCell id={sortie.aircraft_id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ActionsContext.Provider
              value={{
                crewReady: crewReady,
                setCrewReady: setCrewReady,
                crewShow: crewShow,
                setCrewShow: setCrewShow,
                engineStart: engineStart,
                setEngineStart: setEngineStart,
                taxi: taxi,
                setTaxi: setTaxi,
                takeOff: takeOff,
                setTakeOff: setTakeOff,
                actualLand: actualLand,
                setActualLand: setActualLand,
                engineShutdown: engineShutdown,
                setEngineShutdown: setEngineShutdown,
              }}
            >
              <LineActionCell id={sortie.id} />
            </ActionsContext.Provider>
          </TabPanel>
        </Box>
      </Box>
      <Box>
        <ActionsContext.Provider
          value={{
            crewReady: crewReady,
            crewShow: crewShow,
            engineStart: engineStart,
            taxi: taxi,
            takeOff: takeOff,
            actualLand: actualLand,
            engineShutdown: engineShutdown,
          }}
        >
          <DragLightCell id={sortie.id} />
        </ActionsContext.Provider>
      </Box>
    </Card>
  )
}

/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react'

import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormControlLabel,
  TextField,
  FormGroup,
  Checkbox,
  Grid,
  Button,
  MenuItem,
  Select,
} from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import formatTailNumber from 'src/functions/formatTailNumber'
import { AddJcnModalContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'
import { OpenJobPanelContext } from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'
import { closeHandler } from 'src/pages/SortieDirectoryPage/SortieDirectoryPage'

import AddJcnCell from '../AddJcnCell'
import MxListInfoCell from '../MxListInfoCell'
export const beforeQuery = ({ input, id, sid, sinput, edit }) => {
  return {
    variables: { input, id, sid, sinput, edit },
    fetchPolicy: 'network-only',
  }
}

const CREATE_DEBRIEF = gql`
  mutation createDebriefForm(
    $input: CreateDebriefFormInput!
    $sid: Int!
    $sinput: UpdateSortieInput!
  ) {
    createDebriefForm(input: $input) {
      id
    }
    updateSortie(id: $sid, input: $sinput) {
      id
    }
  }
`
const UPDATE_DEBRIEF = gql`
  mutation updateDebriefForm(
    $id: Int!
    $input: UpdateDebriefFormInput!
    $sid: Int!
    $sinput: UpdateSortieInput!
  ) {
    updateDebriefForm(id: $id, input: $input) {
      id
    }
    updateSortie(id: $sid, input: $sinput) {
      id
    }
  }
`

export const QUERY = gql`
  query FindDebriefFormQuery($id: Int!) {
    debriefForm: sortie(id: $id) {
      actual_land
      actual_launch
      aircraft_id
      call_sign
      config
      crew_ready
      crew_show
      engine_shutdown
      engine_start
      id
      land_status
      projected_land
      projected_launch
      required_fuel
      taxi
      unit_id
      aircraft {
        config
        cur_oxygen
        driver_jcn_id
        driver_jcn_unit
        flight_hours
        fuel_quant
        id
        name
        parking_location
        status_id
        unit_id
      }
      debrief_forms {
        id
        air_refuel_amount
        air_refuel_callsign
        bird_strike
        bomb_door_actuation
        drag_chute
        hung_store
        in_flight_emergency
        landing_fuel
      }
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ debriefForm, variables }) => {
  const [jobExpanded, setJobExpanded] = useState(false)

  const { currentUser, hasRole } = useAuth()
  const editable = variables.edit
  const [userRole] = useState(currentUser.roles === 'debrief' ? false : true)
  const [sortie] = useState(debriefForm)
  const [openAddJcn, setOpenAddJcn] = useState(false)
  const [aR, setAR] = useState(() => {
    if (sortie.debrief_forms[0]) {
      if (sortie.debrief_forms[0].air_refuel_amount != 0) {
        return true
      }
    } else {
      return false
    }
  })
  const [status, setStatus] = useState(
    sortie.land_status ? sortie.land_status : 1
  )
  const [aCDebrief, setACDebrief] = useState(() => {
    let result = sortie.debrief_forms[0]
      ? {
          landing_fuel: sortie.debrief_forms[0].landing_fuel,
          bird_strike: sortie.debrief_forms[0].bird_strike,
          air_refuel_callsign: sortie.debrief_forms[0].air_refuel_callsign,
          air_refuel_amount: sortie.debrief_forms[0].air_refuel_amount,
          drag_chute: sortie.debrief_forms[0].drag_chute,
          hung_store: sortie.debrief_forms[0].hung_store,
          in_flight_emergency: sortie.debrief_forms[0].in_flight_emergency,
          bomb_door_actuation: sortie.debrief_forms[0].bomb_door_actuation,
        }
      : {
          id: sortie.id,
          landing_fuel: sortie.aircraft.fuel_quant,
          bird_strike: false,
          air_refuel_callsign: null,
          air_refuel_amount: 0,
          drag_chute: false,
          hung_store: false,
          in_flight_emergency: false,
          bomb_door_actuation: false,
        }
    return result
  })
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setJobExpanded(newExpanded ? panel : false)
  }

  const { handleClose } = useContext(closeHandler)
  const [saveDebreif, { loading, error }] = useMutation(CREATE_DEBRIEF, {
    fetchPolicy: 'network-only',
  })
  const [updateDebreif, { data }] = useMutation(UPDATE_DEBRIEF)
  if (data) return 'success'
  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`
  // Handles opening of the Aerial Refuel additional questions
  const toggleChange = (event) => {
    setAR(event.target.checked)
  }
  const handleAddJcn = () => {
    setOpenAddJcn(true)
  }
  const handleAddJcnClose = () => {
    setOpenAddJcn(false)
  }
  // Handles the Changes made to Toggle Switches
  const handleChange = (event) => {
    setACDebrief({
      ...aCDebrief,
      [event.target.name]: event.target.checked,
    })
  }
  const handleInput = (event) => {
    if (event.target.value == 'air_refuel_callsign') {
      setACDebrief({
        ...aCDebrief,
        [event.target.name]: event.target.value,
      })
    }
    setACDebrief({
      ...aCDebrief,
      [event.target.name]: parseFloat(event.target.value),
    })
  }
  const handleSubmit = () => {
    if (editable) {
      updateDebreif({
        variables: {
          sid: sortie.id,
          sinput: {
            land_status: status,
          },
          id: sortie.debrief_forms[0].id,
          input: {
            ...aCDebrief,
            sortie_id: sortie.id,
            user_id: 2,
          },
        },
      })

      handleClose()
    } else {
      saveDebreif({
        variables: {
          sid: sortie.id,
          sinput: {
            land_status: status,
          },
          input: {
            ...aCDebrief,
            sortie_id: sortie.id,
            user_id: 2,
          },
        },
      })
      handleClose()
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '75vh',
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'divider',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '20px',
  }

  const aircraft = sortie.aircraft
  return (
    <Box sx={style}>
      <Box>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            marginBottom: '20px',
          }}
        >
          <Stack direction="column">
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Aircraft: {formatTailNumber(sortie.aircraft_id)}
              </Typography>
              <Typography variant="h4">{`Sortie: ${sortie.id}`}</Typography>
            </Grid>
          </Stack>
          <Grid item sx={{ textAlign: 'right' }}>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={handleClose} fullWidth>
                Cancel
              </Button>
              {hasRole('debrief') &&
                (editable ? (
                  <Button
                    variant="outlined"
                    type="submit"
                    form="debrief"
                    fullWidth
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    type="submit"
                    form="debrief"
                    fullWidth
                  >
                    Save
                  </Button>
                ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item md={3} lg={3}>
            <Typography variant="h5" sx={{ marginBottom: '18px' }} fullWidth>
              Debrief Form
            </Typography>
          </Grid>
          <Grid
            item
            md={9}
            lg={9}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h5" fullWidth>
              {!openAddJcn ? 'Open Discrepencies' : 'Create Job'}
            </Typography>
            {!openAddJcn ? (
              <Button
                variant="contained"
                sx={{ height: '35px' }}
                onClick={handleAddJcn}
              >
                Add JCN
              </Button>
            ) : null}
          </Grid>
        </Grid>

        <FormGroup>
          <Form
            id="debrief"
            onSubmit={() => {
              handleSubmit()
            }}
            disabled={true}
          >
            <Grid
              container
              label={'Simple Input'}
              spacing={1}
              sx={{ paddingBottom: '20px' }}
            >
              <Grid item xs={3} sx={{ height: '39vh', overflowY: 'scroll' }}>
                <Select
                  labelId="landingStatusLabel"
                  id="landingStatusId"
                  value={status}
                  label="Landing Status"
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={userRole}
                  fullWidth
                >
                  <MenuItem value={1}>Code 1</MenuItem>
                  <MenuItem value={2}>Code 2</MenuItem>
                  <MenuItem value={3}>Code 3</MenuItem>
                </Select>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aCDebrief.bird_strike}
                      name="bird_strike"
                      onChange={handleChange}
                    />
                  }
                  label="Bird Strike"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aCDebrief.drag_chute}
                      name="drag_chute"
                      onChange={handleChange}
                    />
                  }
                  label="Drag Chute"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aCDebrief.hung_store}
                      name="hung_store"
                      onChange={handleChange}
                    />
                  }
                  label="Hung Store"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aCDebrief.in_flight_emergency}
                      name="in_flight_emergency"
                      onChange={handleChange}
                    />
                  }
                  label="IFE"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aCDebrief.bomb_door_actuation}
                      name="bomb_door_actuation"
                      onChange={handleChange}
                    />
                  }
                  label="Bomb Door Actuation"
                />
                <FormControl fullWidth>
                  <TextField
                    name="landing_fuel"
                    type="number"
                    id="landing_fuel"
                    label="Landing Fuel"
                    defaultValue={
                      sortie.debrief_forms[0]
                        ? sortie.debrief_forms[0].landing_fuel
                        : 0
                    }
                    onChange={handleInput}
                    sx={{ padding: '10px 0px' }}
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox onChange={toggleChange} checked={aR} name="AR" />
                  }
                  label="Aerial Refuel"
                />
                {aR ? (
                  <FormControl fullWidth>
                    <TextField
                      name="air_refuel_callsign"
                      onChange={(e) => {
                        setACDebrief({
                          ...aCDebrief,
                          air_refuel_callsign: e.target.value,
                        })
                      }}
                      value={
                        aCDebrief.air_refuel_callsign
                          ? aCDebrief.air_refuel_callsign
                          : ''
                      }
                      id="air_refuel_callsign"
                      label="AR Call Sign"
                      sx={{ padding: '10px 0px' }}
                    />
                    <TextField
                      type="number"
                      name="air_refuel_amount"
                      value={
                        aCDebrief.air_refuel_amount
                          ? aCDebrief.air_refuel_amount
                          : 0
                      }
                      onChange={handleInput}
                      id="air_refuel_amount"
                      label="Amount Refueled"
                      sx={{ paddingTop: '10px 0px' }}
                    />
                  </FormControl>
                ) : null}
              </Grid>
              <Grid
                item
                xs={9}
                sm={9}
                md={9}
                lg={9}
                sx={{
                  overflowY: 'scroll',
                  height: '55vh',
                }}
              >
                {openAddJcn ? (
                  <AddJcnModalContext.Provider
                    value={{
                      open: openAddJcn,
                      handleClose: handleAddJcnClose,
                      aircraft: aircraft,
                    }}
                  >
                    <AddJcnCell unit_id={debriefForm.unit_id} />
                  </AddJcnModalContext.Provider>
                ) : (
                  <OpenJobPanelContext.Provider
                    value={{ jobExpanded, handlePanelChange }}
                  >
                    <MxListInfoCell id={Number.parseInt(aircraft.id)} />
                  </OpenJobPanelContext.Provider>
                )}
              </Grid>
            </Grid>
          </Form>
        </FormGroup>
      </Box>
    </Box>
  )
}

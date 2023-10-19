import { useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Button,
  Box,
  CircularProgress,
  Grid,
  InputBase,
  Paper,
  Stack,
  Tab,
} from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

import AddAircraftNoteModalCell from 'src/components/AddAircraftNoteModalCell/AddAircraftNoteModalCell'
import AddJcnModalCell from 'src/components/AddJcnModalCell/AddJcnModalCell'
import AircraftInfoCell from 'src/components/AircraftInfoCell/AircraftInfoCell'
import AircraftNotesCell from 'src/components/AircraftNotesCell/AircraftNotesCell'
import EditAircraftDetailCell from 'src/components/EditAircraftDetailCell/EditAircraftDetailCell'
import FilteredMxListInfoCell from 'src/components/FilteredMxListInfoCell/FilteredMxListInfoCell'
import MxListInfoCell from 'src/components/MxListInfoCell/MxListInfoCell'
import {
  AircraftEditModalContext,
  AddJcnModalContext,
  AddNoteModalContext,
  OpenJobPanelContext,
} from 'src/pages/AircraftDetailsPage/AircraftDetailsPage'

export const QUERY = gql`
  query FindAircraftDetailQuery($id: Int!) {
    aircraft(id: $id) {
      id
      status_id
      unit_id
      driver_jcn {
        discrepancy
      }
    }
    shops {
      id
      description
    }
  }
`

export const Loading = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ aircraft: acft, shops }) => {
  const { hasRole, currentUser } = useAuth()
  const [value, setValue] = useState('1')
  const [value2, setValue2] = useState(hasRole('boot') ? '2' : '1')
  const [openAddJcn, setOpenAddJcn] = useState(false)
  const [openEditAircraft, setOpenEditAircraft] = useState(false)
  const [editAcft, setEditAcft] = useState(null)

  const [openAddNote, setOpenAddNote] = useState(false)
  const [searchString, setSearchString] = useState('')
  const [jobExpanded, setJobExpanded] = useState(false)

  const { refetch } = useQuery(QUERY, {
    variables: { id: acft.id },
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }

  const handleAddJcnOpen = () => {
    setOpenAddJcn(true)
  }
  const handleAddJcnClose = () => {
    setOpenAddJcn(false)
  }

  const handleEditAircraftOpen = (acft) => {
    setOpenEditAircraft(true)
    setEditAcft(acft)
  }
  const handleEditAircraftClose = () => {
    setOpenEditAircraft(false)
    setEditAcft(null)
    refetch({ id: acft.id })
  }

  const handlePanelChange = (panel) => (event, newExpanded) => {
    setJobExpanded(newExpanded ? panel : false)
  }

  const handleAddNoteOpen = () => {
    setOpenAddNote(true)
  }

  const handleAddNoteClose = () => {
    setOpenAddNote(false)
  }

  function handleSearchChange(event) {
    setSearchString(event.target.value)
  }

  return (
    <>
      <AircraftEditModalContext.Provider
        value={{
          open: openEditAircraft,
          handleClose: handleEditAircraftClose,
          id: editAcft,
        }}
      >
        <EditAircraftDetailCell id={acft.id} />
      </AircraftEditModalContext.Provider>

      <AddJcnModalContext.Provider
        value={{
          open: openAddJcn,
          handleClose: handleAddJcnClose,
          aircraft: acft,
        }}
      >
        <AddJcnModalCell unit_id={acft.unit_id} />
      </AddJcnModalContext.Provider>

      <AddNoteModalContext.Provider
        value={{
          open: openAddNote,
          handleClose: handleAddNoteClose,
          aircraft: acft,
        }}
      >
        <AddAircraftNoteModalCell
          aircraft_id={acft.id}
          unit_id={currentUser?.shop.unit_id}
        />
      </AddNoteModalContext.Provider>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '40VW', typography: 'body1' }}>
          <TabContext value={value}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Aircraft Info" value="1" />
                {hasRole(['lead pro super', 'pro super', 'expeditor']) && (
                  <Tab label="Notes" value="2" />
                )}
              </TabList>
            </Stack>
            <TabPanel value="1">
              {hasRole(['lead pro super', 'pro super', 'moc', 'expeditor']) && (
                <Button
                  variant="outlined"
                  onClick={() => handleEditAircraftOpen(acft.id)}
                  sx={{
                    height: '35px',
                    marginTop: '0.7%',
                  }}
                >
                  Edit Details
                </Button>
              )}
              <Box sx={{ overflow: 'auto', height: '64vh' }}>
                <AircraftInfoCell id={acft.id} />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <OpenJobPanelContext.Provider
                value={{
                  setJobExpanded: setJobExpanded,
                }}
              >
                <Grid
                  container
                  direction="row"
                  sx={{ justifyContent: 'space-between' }}
                >
                  <Grid item sx={{ marginBottom: '3%' }}>
                    <Button
                      variant="contained"
                      sx={{ height: '35px' }}
                      onClick={handleAddNoteOpen}
                    >
                      Add Note
                    </Button>
                  </Grid>
                  <Grid item sx={{ marginBottom: '3%' }}>
                    <Paper
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                      />
                      <SearchIcon />
                    </Paper>
                  </Grid>
                </Grid>
                <Box sx={{ overflow: 'auto', height: '64vh' }}>
                  <AircraftNotesCell
                    aircraft_id={acft.id}
                    searchString={searchString}
                  />
                </Box>
              </OpenJobPanelContext.Provider>
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ width: '60VW' }}>
          <TabContext value={value2}>
            <Box
              sx={{
                borderLeft: 1,
                borderBottom: 1,
                borderColor: 'divider',
                paddingRight: '24px',
                paddingLeft: '24px',
              }}
            >
              {hasRole([
                'lead pro super',
                'pro super',
                'expeditor',
                'debrief',
              ]) ? (
                <Box>
                  <TabList
                    onChange={handleChange2}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="All" value="1" />
                    {shops.map((shop) => {
                      return (
                        <Tab
                          key={shop.id}
                          label={shop.description}
                          value={shops.indexOf(shop) + 2}
                        />
                      )
                    })}
                  </TabList>
                </Box>
              ) : (
                <Box>
                  <TabList onChange={handleChange2} aria-label="boots tabs">
                    <Tab label={currentUser.shop.description} value="2" />
                    <Tab label="All" value="1" />
                  </TabList>
                </Box>
              )}
            </Box>
            <Box textAlign="right" paddingRight="24px" paddingTop="24px">
              <Button
                variant="contained"
                sx={{ height: '35px', marginTop: '0.7%' }}
                onClick={handleAddJcnOpen}
              >
                Add JCN
              </Button>
            </Box>
            <OpenJobPanelContext.Provider
              value={{ jobExpanded, handlePanelChange }}
            >
              {hasRole([
                'lead pro super',
                'pro super',
                'expeditor',
                'debrief',
              ]) && (
                <>
                  <TabPanel value="1">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <MxListInfoCell id={acft.id} />
                    </Box>
                  </TabPanel>
                  {shops.map((shop) => {
                    return (
                      <TabPanel key={shop.id} value={shops.indexOf(shop) + 2}>
                        <Box sx={{ overflow: 'auto', height: '64vh' }}>
                          <FilteredMxListInfoCell
                            id={acft.id}
                            shop_id={shop.id}
                          />
                        </Box>
                      </TabPanel>
                    )
                  })}
                </>
              )}
              {hasRole(['boot']) && (
                <>
                  <TabPanel value="1">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <MxListInfoCell id={acft.id} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box sx={{ overflow: 'auto', height: '64vh' }}>
                      <FilteredMxListInfoCell
                        id={acft.id}
                        shop_id={currentUser.shop.id}
                      />
                    </Box>
                  </TabPanel>
                </>
              )}
            </OpenJobPanelContext.Provider>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

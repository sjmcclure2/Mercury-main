import { DataGrid } from '@mui/x-data-grid'
import {
  nextMonday,
  lastDayOfWeek,
  addDays,
  format,
  eachDayOfInterval,
} from 'date-fns'
import { Box, Typography } from '@mui/material'
import { Link, routes } from '@redwoodjs/router'
import RenderSortie from '../RenderSortie/RenderSortie'
import EmptyCell from '../EmptyCell/EmptyCell'
import RenderInsp from '../RenderInsp/RenderInsp'
import RenderSpare from '../RenderSpare/RenderSpare'
import { useEffect, useState } from 'react'

const start = nextMonday(new Date())
const end = lastDayOfWeek(new Date(start), { weekStartsOn: 1 })

export const beforeQuery = ({ unit_id }) => {
  return {
    variables: { start, end, unit_id },
    fetchPolicy: 'network-only',
  }
}

export const QUERY = gql`
  query FindScheduleBuilderQuery(
    $start: DateTime!
    $end: DateTime!
    $unit_id: Int!
  ) {
    aircraftsQuery: aircrafts {
      id
      unit_id
      status_id
      flight_hours
      sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
        id
        required_fuel
        projected_launch
        projected_land
        config
        call_sign
        is_published
      }
      calendar_inspections {
        id
        frequency
        last_completed
        inspection_details
      }
      hourly_inspection {
        last_completed
        name
      }
      spareFlyers: spareFlyersInDateRange(start: $start, end: $end) {
        id
        date
      }
    }
    sorties: sortiesInDateRange(start: $start, end: $end, unit_id: $unit_id) {
      id
      aircraft_id
      required_fuel
      projected_launch
      projected_land
      config
      call_sign
      is_published
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const julian = (date) => format(date, 'yyDDD')
const longFormat = (date) => format(date, 'MMMM dd, yyyy')
const formatTime = (date) => format(date, 'HHmm')

////////////////////////////////////////////////////////////////////////////////////

export const Success = ({ aircraftsQuery, sorties }) => {
  const datesArray = eachDayOfInterval({ start, end })
  const [aircrafts, setAircrafts] = useState(aircraftsQuery)

  useEffect(() => {}, [aircrafts])

  function addAcftToSortie(acftId, sortieId) {
    const aircraftsCopy = [...aircrafts]
    const aircraftDetails = aircraftsCopy.find((acft) => acft.id === acftId)
    const acftIndex = aircraftsCopy.indexOf(aircraftDetails)
    const sortieToPush = sorties.find((sortie) => sortie.id === sortieId.id)
    var sortieToPop

    aircraftsCopy.map((aircraft, index) => {
      sortieToPop = aircraft.sorties.find((sortie) => sortie.id === sortieId.id)
      if (sortieToPop) {
        let sortieIndex = aircraft.sorties.indexOf(sortieToPop)
        aircraftsCopy[index].sorties.splice(sortieIndex, 1)
      }
    })
    aircraftsCopy[acftIndex].sorties.push(sortieToPush)
    setAircrafts(aircraftsCopy)
  }

  function deleteSortie(acftId, sortieId) {
    let aircraftsCopy = [...aircrafts]
    let sortieToPop
    aircraftsCopy.map((aircraft, index) => {
      sortieToPop = aircraft.sorties.find((sortie) => sortie.id === sortieId.id)
      let sortieIndex = aircraft.sorties.indexOf(sortieToPop)
      if (sortieToPop) {
        aircraftsCopy[index].sorties.splice(sortieIndex, 1)
      }
    })
    setAircrafts(aircraftsCopy)
  }

  function addAcftToSpare(acftId, date) {
    let aircraftsCopy = [...aircrafts]
    const aircraftDetails = aircrafts.find((acft) => acft.id === acftId)
    const acftIndex = aircraftsCopy.indexOf(aircraftDetails)
    aircraftsCopy[acftIndex].spareFlyers.push({
      date: date.toISOString(),
    })
    setAircrafts(aircraftsCopy)
  }

  function deleteSpareFlyer(acftId, spareId) {
    let aircraftsCopy = [...aircrafts]
    const aircraftDetails = aircrafts.find((acft) => acft.id === acftId)
    const acftIndex = aircraftsCopy.indexOf(aircraftDetails)
    const spareToDelete = aircraftDetails.spareFlyers.find(
      (spare) => spare.id === spareId
    )
    const spareIndex = aircraftDetails.spareFlyers.indexOf(spareToDelete)
    if (spareToDelete) {
      aircraftsCopy[acftIndex].spareFlyers.splice(spareIndex, 1)
    }
    setAircrafts(aircraftsCopy)
  }

  const [columns] = React.useState([
    {
      field: 'id',
      headerName: 'Aircraft',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      align: 'center',
      renderCell: (params) => {
        const tn = params.value.toString().padStart(6, '0')
        return (
          <Link to={routes.aircraftDetails({ id: params.value })}>
            {tn.slice(0, 2) + '-' + tn.slice(2)}
          </Link>
        )
      },
      cellClassName: 'tailNumber',
    },
    {
      field: 'phase',
      headerName: 'Phase',
      flex: 1,
      minWidth: 50,
      maxWidth: 150,
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography
            variant="div"
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : null,
            }}
          >
            {params.value}
          </Typography>
        )
      },
      cellClassName: 'phase',
    },
    {
      field: 'hpo',
      headerName: 'HPO',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography
            variant="div"
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : null,
            }}
          >
            {params.value}
          </Typography>
        )
      },
      cellClassName: 'hpo',
    },
  ])

  datesArray.forEach((date) => {
    columns.push({
      field: julian(date),
      headerName: format(date, 'EEEE'),
      description: longFormat(date),
      flex: 2,
      minWidth: 160,
      maxwidth: 360,
      renderCell: (params) => {
        if (params.value === undefined) {
          return (
            <EmptyCell
              params={params}
              date={date}
              addAcftToSortie={addAcftToSortie}
              addAcftToSpare={addAcftToSpare}
            />
          )
        } else {
          if (Array.isArray(params.value)) {
            return (
              <>
                {params.value.find((target) => target.type === 'insp') ? (
                  <RenderInsp
                    params={params}
                    date={date}
                    addAcftToSortie={addAcftToSortie}
                    addAcftToSpare={addAcftToSpare}
                  />
                ) : null}
                {params.value.map((sortie) => {
                  if (sortie.type === 'sortie') {
                    return (
                      <Box key={sortie.id}>
                        <RenderSortie
                          sortieInfo={sortie}
                          params={params}
                          date={date}
                          length={params.value.length}
                          addAcftToSortie={addAcftToSortie}
                          deleteSortie={deleteSortie}
                        />
                      </Box>
                    )
                  } else if (sortie.type === 'spare')
                    return (
                      <RenderSpare
                        key={params.id}
                        params={params}
                        date={date}
                        deleteSpareFlyer={deleteSpareFlyer}
                      />
                    )
                })}
              </>
            )
          }
          if (params.value.type === 'insp')
            return (
              <RenderInsp
                params={params}
                date={date}
                addAcftToSortie={addAcftToSortie}
                addAcftToSpare={addAcftToSpare}
              />
            )
        }
      },
    })
  })

  const rows = aircrafts.map((aircraft) => {
    // Determine hours until next phase
    var phaseInsp = aircraft.hourly_inspection.find(
      (insp) => insp.name === 'Phase'
    )
    // Determine hours until next HPO
    var hpoInsp = aircraft.hourly_inspection.find((insp) => insp.name === 'HSC')
    // Define the data that rows will contain
    var row = {
      id: aircraft.id,
      phase: aircraft.flight_hours - phaseInsp.last_completed,
      hpo: aircraft.flight_hours - hpoInsp.last_completed,
    }
    // Set the calendar insp on the correct day
    aircraft.calendar_inspections.forEach((inspection) => {
      var dueDate = addDays(
        new Date(inspection.last_completed),
        inspection.frequency
      )
      const jul = julian(dueDate)
      row[jul] = { type: 'insp', name: inspection.inspection_details }
    })
    // Set the spares on the correct day
    aircraft.spareFlyers.forEach((spare) => {
      const dateString = spare.date.slice(0, -1)
      const jul = julian(new Date(dateString))
      const newSpare = {
        type: 'spare',
        id: spare,
      }
      row[jul] = row[jul] ? [row[jul], newSpare].flat() : [newSpare]
    })
    // Set the sortie on the correct day
    aircraft.sorties.forEach((sortie) => {
      const jul = julian(new Date(sortie.projected_launch))
      const newSortie = {
        type: 'sortie',
        id: sortie.id,
        times:
          formatTime(new Date(sortie.projected_launch)) +
          '-' +
          formatTime(new Date(sortie.projected_land)),
        fuel: sortie.required_fuel + 'K',
        config: sortie.config,
        aircraft_id: sortie.aircraft_id,
        call_sign: sortie.call_sign,
      }
      row[jul] = row[jul] ? [row[jul], newSortie].flat() : [newSortie]
    })
    return row
  })

  return (
    <Box className="weeklyBox">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'block',
            width: '1500px',
            paddingTop: '20px',
            textAlign: 'center',
            '& div.tailNumber a': {
              color: '#39f',
              fontWeight: 'bold',
            },
            '& div.sortie': {
              background: '#295',
              color: '#fff',
              flexFlow: 'column',
            },
            '& .spare': {
              background: '#f94',
              color: '#fff',
            },
            '& .insp': {
              background: '#38e',
              color: '#fff',
              whiteSpace: 'normal !important',
            },
            '& .spareInsp': {
              background: '#f94',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
            },
            '& .sortieInsp': {
              background: '#295',
              color: '#fff',
              flexFlow: 'column',
            },
          }}
        >
          <DataGrid
            className="dataGridBuilder"
            autoHeight
            disableColumnMenu
            hideFooter
            rows={rows}
            columns={columns}
            getRowHeight={() => 'auto'}
            showCellRightBorder={true}
            scrollbarSize={0}
            sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: 0.5,
              },
            }}
            getCellClassName={(params) => {
              if (Array.isArray(params.value)) {
                if (
                  params.value.find((element) => element.type === 'insp') &&
                  params.value.find((element) => element.type === 'spare')
                )
                  return 'spareInsp'
                if (
                  params.value.find((element) => element.type === 'insp') &&
                  params.value.find((element) => element.type === 'sortie')
                )
                  return 'sortieInsp'
                if (params.value.find((element) => element.type === 'sortie'))
                  return 'sortie'
                if (params.value.find((element) => element.type === 'spare'))
                  return 'spare'
              }
              if (typeof params.value === 'object') {
                if (params.value.type?.includes('insp')) return 'insp'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

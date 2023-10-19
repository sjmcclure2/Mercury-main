import { Link, routes } from '@redwoodjs/router'
import { Box, Grid, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { addDays, format, eachDayOfInterval } from 'date-fns'

import { formatTime, julian, longFormat } from 'src/functions/dateFormats'

const renderTailNumber = (id) => {
  const tn = id.toString().padStart(6, '0')
  return (
    <Link to={routes.aircraftDetails({ id })}>
      {tn.slice(0, 2) + '-' + tn.slice(2)}
    </Link>
  )
}

const renderSortie = (sortie) => (
  <div
    key={sortie.id}
    style={{
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
    }}
  >
    <span
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>{sortie.callSign}</span>
      <span>{sortie.times}</span>
    </span>
    <span
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>{sortie.fuel}K</span>
      <span>{sortie.config}</span>
    </span>
  </div>
)

const WeeklySchedule = ({ aircrafts, start, end }) => {
  const datesArray = eachDayOfInterval({ start, end })
  const columns = [
    {
      field: 'id',
      headerName: 'Aircraft',
      flex: 1,
      minWidth: 75,
      maxWidth: 150,
      align: 'center',
      renderCell: (params) => renderTailNumber(params.value),
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
          <div
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : null,
            }}
          >
            {params.value}
          </div>
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
          <div
            style={{
              textAlign: 'center',
              color: params.value < 5 ? 'red' : null,
            }}
          >
            {params.value}
          </div>
        )
      },
      cellClassName: 'hpo',
    },
  ]

  const dateRange = `${longFormat(start)} - ${longFormat(end)}`
  datesArray.forEach((date) => {
    columns.push({
      field: julian(date),
      headerName: format(date, 'EEEE'),
      description: longFormat(date),
      flex: 2,
      align: 'center',
      minWidth: 160,
      maxwidth: 360,
      renderCell: (params) => {
        if (params.value === undefined) {
          return <div></div>
        } else {
          if (Array.isArray(params.value)) {
            let hasInsp = params.value.find((target) => target.type === 'insp')
            return (
              <>
                {hasInsp ? (
                  <div
                    key={params.id}
                    style={{
                      width: '100%',
                      background: '#38e',
                      color: '#fff',
                      textAlign: 'center',
                      marginTop: '5px',
                    }}
                  >
                    {hasInsp.name}
                  </div>
                ) : null}
                {params.value.map((sortie) => {
                  if (sortie.type === 'sortie') {
                    return renderSortie(sortie)
                  } else if (sortie.type === 'spare')
                    return <div key={params.id}>Spare</div>
                })}
              </>
            )
          }
          if (params.value.type === 'insp')
            return <div>{params.value.name}</div>
        }
      },
    })
  })

  const rows = aircrafts.map((aircraft) => {
    var phaseInsp = aircraft.hourly_inspection.find(
      (insp) => insp.name === 'Phase'
    )

    var hpoInsp = aircraft.hourly_inspection.find((insp) => insp.name === 'HSC')

    let row = {
      id: aircraft.id,
      phase: aircraft.flight_hours - phaseInsp.last_completed,
      hpo: aircraft.flight_hours - hpoInsp.last_completed,
    }

    aircraft.calendar_inspections.forEach((inspection) => {
      var dueDate = addDays(
        new Date(inspection.last_completed),
        inspection.frequency
      )
      const jul = julian(dueDate)
      row[jul] = { type: 'insp', name: inspection.inspection_details }
    })

    aircraft.spareFlyers.forEach((spare) => {
      const jul = julian(spare.date.slice(0, -1))
      const newSpare = {
        type: 'spare',
        id: spare,
      }
      row[jul] = row[jul] ? [row[jul], newSpare].flat() : [newSpare]
    })

    aircraft.sorties.forEach((sortie) => {
      const jul = julian(sortie.projected_launch)
      const newSortie = {
        type: 'sortie',
        id: sortie.id,
        callSign: sortie.call_sign,
        times:
          formatTime(sortie.projected_launch) +
          '-' +
          formatTime(sortie.projected_land) +
          'L',
        fuel: sortie.required_fuel,
        config: sortie.config,
      }
      row[jul] = row[jul] ? [row[jul], newSortie].flat() : [newSortie]
    })

    return row
  })

  return (
    <Box className="weeklyBox">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{dateRange}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              document.title = dateRange
              window.print()
            }}
            className="noPrint"
          >
            Export
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'block',
          width: '1500px',
          height: '90vh',
          paddingTop: '20px',
          '& div.tailNumber a': {
            color: '#39f',
            fontWeight: 'bold',
          },
          '& div.sortie': {
            background: '#295',
            color: '#fff',
            flexFlow: 'column',
          },
          '& div.sortie > div + div::before': {
            content: '""',
            margin: '4px -4px',
            borderTop: '1px dashed',
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
          className="dataGrid"
          autoHeight
          disableColumnMenu
          hideFooter
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
          showCellRightBorder={true}
          scrollbarSize={0}
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
  )
}

export default WeeklySchedule

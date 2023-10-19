import { Box, Container, Grid, Typography, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { format, getDay, formatDistanceToNowStrict } from 'date-fns'

const AircraftInfo = ({
  aircraftInfo,
  insp,
  aircraftInfo2,
  insp2,
  nextSortie,
}) => {
  let weeklySchedule = []
  let nextWeeklySchedule = []

  const thisWeekSchedule = () => {
    if (aircraftInfo.sorties) {
      aircraftInfo.sorties.forEach((sortie) => {
        weeklySchedule.push({ sortie: sortie.projected_launch })
      })
      aircraftInfo.spare.forEach((spare) => {
        weeklySchedule.push({ spare: spare.date })
      })
      insp.forEach((target) => {
        weeklySchedule.push({
          insp: target.next_due,
          name: target.inspection_details,
        })
      })
    }
  }

  thisWeekSchedule()

  const nextWeekSchedule = () => {
    if (aircraftInfo2.sorties) {
      aircraftInfo2.sorties.forEach((sortie) => {
        nextWeeklySchedule.push({ sortie: sortie.projected_launch })
      })
      aircraftInfo2.spare.forEach((spare) => {
        nextWeeklySchedule.push({ spare: spare.date })
      })
      insp2.forEach((target) => {
        nextWeeklySchedule.push({
          insp: target.next_due,
          name: target.inspection_details,
        })
      })
    }
  }

  nextWeekSchedule()

  const lastFly = new Date(aircraftInfo.lastSortieFlown[0].actual_land)

  const daysSinceLastFlyString = formatDistanceToNowStrict(lastFly, {
    unit: 'day',
    roundingMethod: 'floor',
  })

  const cellRender = (params) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {params.value.map((val) => (
          <div key={val}>{val}</div>
        ))}
      </div>
    )
  }
  const columns = [
    {
      field: 'mon',
      headerName: 'Mon',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'tues',
      headerName: 'Tues',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'wed',
      headerName: 'Wed',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'thurs',
      headerName: 'Thurs',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'fri',
      headerName: 'Fri',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'sat',
      headerName: 'Sat',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'sun',
      headerName: 'Sun',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
  ]

  const buildSchedule = () => {
    const row = { id: 1 }
    weeklySchedule.forEach((event) => {
      if (event.sortie) {
        let dayInt = getDay(new Date(event.sortie))
        switch (dayInt) {
          case 0:
            row['sun'] = row['sun'] ? [row['sun'], 'Quickturn'] : 'Fly'
            break
          case 1:
            row['mon'] = row['mon'] ? [row['mon'], 'Quickturn'] : 'Fly'
            break
          case 2:
            row['tues'] = row['tues'] ? [row['tues'], 'Quickturn'] : 'Fly'
            break
          case 3:
            row['wed'] = row['wed'] ? [row['wed'], 'Quickturn'] : 'Fly'
            break
          case 4:
            row['thurs'] = row['thurs'] ? [row['thurs'], 'Quickturn'] : 'Fly'
            break
          case 5:
            row['fri'] = row['fri'] ? [row['fri'], 'Quickturn'] : 'Fly'
            break
          case 6:
            row['sat'] = row['sat'] ? [row['sat'], 'Quickturn'] : 'Fly'
            break
        }
      }
      if (event.spare) {
        let dayInt = getDay(new Date(event.spare))
        switch (dayInt) {
          case 6:
            row['sun'] = 'Spare'
            break
          case 0:
            row['mon'] = 'Spare'
            break
          case 1:
            row['tues'] = 'Spare'
            break
          case 2:
            row['wed'] = 'Spare'
            break
          case 3:
            row['thurs'] = 'Spare'
            break
          case 4:
            row['fri'] = 'Spare'
            break
          case 5:
            row['sat'] = 'Spare'
            break
        }
      }
      if (event.insp) {
        let dayInt = getDay(new Date(event.insp))

        switch (dayInt) {
          case 0:
            row['sun'] = row['sun'] ? [row['sun'], event.name] : event.name
            break
          case 1:
            row['mon'] = row['mon'] ? [row['mon'], event.name] : event.name
            break
          case 2:
            row['tues'] = row['tues'] ? [row['tues'], event.name] : event.name
            break
          case 3:
            row['wed'] = row['wed'] ? [row['wed'], event.name] : event.name
            break
          case 4:
            row['thurs'] = row['thurs']
              ? [row['thurs'], event.name]
              : event.name
            break
          case 5:
            row['fri'] = row['fri'] ? [row['fri'], event.name] : event.name
            break
          case 6:
            row['sat'] = row['sat'] ? [row['sat'], event.name] : event.name
            break
        }
      }
    })
    return [row]
  }

  const columns2 = [
    {
      field: 'mon',
      headerName: 'Mon',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'tues',
      headerName: 'Tues',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'wed',
      headerName: 'Wed',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'thurs',
      headerName: 'Thurs',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'fri',
      headerName: 'Fri',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'sat',
      headerName: 'Sat',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
    {
      field: 'sun',
      headerName: 'Sun',
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (Array.isArray(params.value)) return cellRender(params)
      },
    },
  ]
  const buildSchedule2 = () => {
    const row = { id: 1 }
    nextWeeklySchedule.forEach((event) => {
      if (event.sortie) {
        let dayInt = getDay(new Date(event.sortie))
        switch (dayInt) {
          case 0:
            row['sun'] = row['sun'] ? [row['sun'], 'Quickturn'] : 'Fly'
            break
          case 1:
            row['mon'] = row['mon'] ? [row['mon'], 'Quickturn'] : 'Fly'
            break
          case 2:
            row['tues'] = row['tues'] ? [row['tues'], 'Quickturn'] : 'Fly'
            break
          case 3:
            row['wed'] = row['wed'] ? [row['wed'], 'Quickturn'] : 'Fly'
            break
          case 4:
            row['thurs'] = row['thurs'] ? [row['thurs'], 'Quickturn'] : 'Fly'
            break
          case 5:
            row['fri'] = row['fri'] ? [row['fri'], 'Quickturn'] : 'Fly'
            break
          case 6:
            row['sat'] = row['sat'] ? [row['sat'], 'Quickturn'] : 'Fly'
            break
        }
      }
      if (event.spare) {
        let dayInt = getDay(new Date(event.spare))
        switch (dayInt) {
          case 6:
            row['sun'] = 'Spare'
            break
          case 0:
            row['mon'] = 'Spare'
            break
          case 1:
            row['tues'] = 'Spare'
            break
          case 2:
            row['wed'] = 'Spare'
            break
          case 3:
            row['thurs'] = 'Spare'
            break
          case 4:
            row['fri'] = 'Spare'
            break
          case 5:
            row['sat'] = 'Spare'
            break
        }
      }
      if (event.insp) {
        let dayInt = getDay(new Date(event.insp))

        switch (dayInt) {
          case 0:
            row['sun'] = row['sun'] ? [row['sun'], event.name] : event.name
            break
          case 1:
            row['mon'] = row['mon'] ? [row['mon'], event.name] : event.name
            break
          case 2:
            row['tues'] = row['tues'] ? [row['tues'], event.name] : event.name
            break
          case 3:
            row['wed'] = row['wed'] ? [row['wed'], event.name] : event.name
            break
          case 4:
            row['thurs'] = row['thurs']
              ? [row['thurs'], event.name]
              : event.name
            break
          case 5:
            row['fri'] = row['fri'] ? [row['fri'], event.name] : event.name
            break
          case 6:
            row['sat'] = row['sat'] ? [row['sat'], event.name] : event.name
            break
        }
      }
    })
    return [row]
  }

  const rows = buildSchedule()
  const rows2 = buildSchedule2()

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ marginTop: '2%', marginBottom: '15px' }}>
        <Grid container spacing={2} sx={{ paddingBottom: '2%' }}>
          <Grid item md={3.5}>
            <Typography>
              <b>Location: </b> {aircraftInfo.parking_location}
            </Typography>
          </Grid>
          <Grid item md={2.5}>
            <Typography>
              <b>Fuel: </b> {aircraftInfo.fuel_quant}K
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>
              <b>Preflight: </b>
              {format(
                new Date(aircraftInfo.preflight_inspection),
                'd LLL yy @ HHmm'
              )}
            </Typography>
          </Grid>
          <Grid item md={3.5}>
            <Typography>
              <b>Airframe Hrs: </b> {aircraftInfo.flight_hours}
            </Typography>
          </Grid>
          <Grid item md={2.5}>
            <Typography>
              <b>Oxygen: </b>
              {aircraftInfo.cur_oxygen}L
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>
              <b>ETIC: </b>
              {format(
                new Date(aircraftInfo.driver_jcn?.etic),
                'd LLL yy @ HHmm'
              )}
            </Typography>
          </Grid>
          <Grid item md={3.5}>
            <Typography>
              <b>Config: </b>
              {aircraftInfo.config}
            </Typography>
          </Grid>
          <Grid item md={2.5}>
            <Typography>
              <b>WUC: </b>
              {aircraftInfo.driver_jcn?.work_unit_code_id}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>
              <b>Last Fly: </b>
              {`${format(
                lastFly,
                'd LLL yy @ HHmm'
              )} (${daysSinceLastFlyString})`}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>

      <Box>
        <Grid container spacing={2} sx={{ marginTop: '-5%' }}>
          <Grid item md={12} sx={{ marginBottom: '-3%' }}>
            <Typography>
              <h3>
                <b>Next Sortie:</b>
              </h3>
            </Typography>
          </Grid>
          {nextSortie ? (
            <>
              <Grid item md={6}>
                <Typography>
                  <b>Line: </b> {nextSortie.id}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <b>Callsign: </b> {nextSortie.call_sign}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <b>Required Fuel: </b> {nextSortie.required_fuel}K
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <b>Config: </b> {nextSortie.config}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <b>Take-off: </b>
                  {format(
                    new Date(nextSortie.projected_launch),
                    'eee, d LLL yy @ HHmm'
                  )}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  <b>Land: </b>
                  {format(
                    new Date(nextSortie.projected_land),
                    'eee, d LLL yy @ HHmm'
                  )}
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid container sx={{ paddingTop: '2%', paddingLeft: '2%' }}>
              <Grid item md={12}>
                <Typography>No sortie scheduled.</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'block',
          paddingTop: '5%',
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
          '& .error': {
            background: '#295',
            color: '#fff',
            whiteSpace: 'normal !important',
          },
        }}
      >
        <Typography sx={{ marginBottom: '-2%' }}>
          <h3>
            <b>Current Week:</b>
          </h3>
        </Typography>
        <DataGrid
          density="compact"
          autoHeight
          rowHeight={80}
          disableColumnMenu
          disableColumnFilter
          hideFooter
          hideFooterPagination
          showCellRightBorder={true}
          columns={columns}
          rows={rows}
          rowCount={1}
          scrollbarSize={0}
          getCellClassName={(params) => {
            if (Array.isArray(params.value)) return 'sortie'
            if (typeof params.value === 'string') {
              if (params.value.includes('Spare')) return 'spare'
              else if (params.value.includes('Wash')) return 'insp'
              else if (params.value.includes('Rain Rep')) return 'insp'
              else if (params.value.includes('Seat Chutes')) return 'insp'
              else return 'error'
            }
          }}
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        />
        <Typography sx={{ marginTop: '30px', marginBottom: '-2%' }}>
          <h3>
            <b>Next Week:</b>
          </h3>
        </Typography>
        <DataGrid
          density="compact"
          autoHeight
          rowHeight={80}
          disableColumnMenu
          disableColumnFilter
          hideFooter
          hideFooterPagination
          showCellRightBorder={true}
          columns={columns2}
          rows={rows2}
          rowCount={1}
          scrollbarSize={0}
          getCellClassName={(params) => {
            if (Array.isArray(params.value)) return 'sortie'
            if (typeof params.value === 'string') {
              if (params.value.includes('Spare')) return 'spare'
              else if (params.value.includes('Wash')) return 'insp'
              else if (params.value.includes('Rain Rep')) return 'insp'
              else if (params.value.includes('Seat Chutes')) return 'insp'
              else return 'error'
            }
          }}
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        />
      </Box>
    </Container>
  )
}

export default AircraftInfo

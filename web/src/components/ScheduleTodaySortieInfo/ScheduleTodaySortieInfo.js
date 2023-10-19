import { Box, Grid, Typography } from '@mui/material'

import { formatTime } from 'src/functions/dateFormats'
import intToDurStr from 'src/functions/intervalToDurationHmmssString'

export default function ScheduleTodaySortieInfo({ sortieInfo }) {
  const launch = sortieInfo.projected_launch
  const land = sortieInfo.projected_land

  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={7}
        sx={{ paddingLeft: '15px' }}
      >
        <Grid item xs={7.5}>
          <Typography sx={{ color: 'gray' }}>Callsign</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography sx={{ color: 'gray' }}>Take-off</Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Typography variant="h5">{sortieInfo?.call_sign}</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography variant="h5">{formatTime(launch)}L</Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Typography sx={{ color: 'gray' }}>Required Fuel</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography sx={{ color: 'gray' }}>Land</Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Typography variant="h5">{sortieInfo?.required_fuel}K</Typography>
        </Grid>

        <Grid item xs={4.5}>
          <Typography variant="h5">{formatTime(land)}L</Typography>
        </Grid>

        <Grid item xs={7.5}>
          <Typography sx={{ color: 'gray' }}>Configuration</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography sx={{ color: 'gray' }}>Duration</Typography>
        </Grid>
        <Grid item xs={7.5}>
          <Typography variant="h5">{sortieInfo?.config}</Typography>
        </Grid>
        <Grid item xs={4.5}>
          <Typography variant="h5">
            {intToDurStr({ start: launch, end: land }).slice(0, -4)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

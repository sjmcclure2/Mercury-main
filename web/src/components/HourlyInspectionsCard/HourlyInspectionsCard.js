import { Box, Card, Typography } from '@mui/material'

import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../CustomizedAccordions'

export default function HourlyInspectionsCard({
  hourlyInspections = [],
  aircraft,
}) {
  const [expanded, setExpanded] = React.useState(null)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null)
  }

  return (
    <Card sx={{ height: '100%', width: 'calc(50vw - 24px)' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
        }}
      >
        <h2 style={{ margin: 0 }}>Hourly Inspections</h2>
        Current flight hrs: {aircraft.flight_hours}
      </Box>
      {hourlyInspections.length
        ? hourlyInspections.map((insp) => {
            const dueDate = insp.last_completed + insp.frequency

            return (
              <StyledAccordion
                key={insp.id}
                expanded={expanded === insp.id}
                onChange={handleChange(insp.id)}
              >
                <StyledAccordionSummary>
                  <Typography style={{ margin: 0 }}>{insp.name}</Typography>
                  <Typography>&nbsp;due @ {dueDate} hr</Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography>{insp.inspection_details}</Typography>
                  <Typography>
                    last completed @ {insp.last_completed} hr
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            )
          })
        : 'No inspections found.'}
    </Card>
  )
}

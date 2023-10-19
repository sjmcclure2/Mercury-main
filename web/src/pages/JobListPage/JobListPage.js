import JobListCell from '../../components/JobListCell/JobListCell'
import { Box, Typography } from '@mui/material'

const JobListPage = () => {
  return (
    <Box
      sx={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        paddingTop: '150px',
      }}
    >
      <JobListCell />
    </Box>
  )
}

export default JobListPage

import { Chip } from '@mui/material'

export default function StatusChip({ status, ...props }) {
  if (typeof status === 'string') {
    const color = status.includes('FMC')
      ? 'success'
      : status.includes('PMC')
      ? 'warning'
      : status.includes('NMC')
      ? 'error'
      : 'default'
    return (
      <Chip
        label={status}
        color={color}
        sx={{ fontWeight: 'bold' }}
        {...props}
      />
    )
  }
  return null
}

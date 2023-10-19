import { MetaTags } from '@redwoodjs/web'

import AircraftInspectionsCell from 'src/components/AircraftInspectionsCell'
import formatTailNumber from 'src/functions/formatTailNumber'

const AircraftInspectionsPage = (params) => {
  const tailNumber = formatTailNumber(params.id)

  const pageTitle = `Aircraft ${tailNumber}: Inspections`

  return (
    <>
      <MetaTags title={pageTitle} description="Aircraft inspection details" />
      <AircraftInspectionsCell id={params.id} />
    </>
  )
}

export default AircraftInspectionsPage

import AircraftDetailCell from 'src/components/AircraftDetailCell'

export const AircraftEditModalContext = React.createContext(null)
export const OpenJobPanelContext = React.createContext(null)
export const AddJcnModalContext = React.createContext({ open: true })
export const AddNoteModalContext = React.createContext({ open: true })

export default function AircraftDetailsPage(params) {
  return <AircraftDetailCell id={params.id} />
}

import { useDrop } from 'react-dnd'
import { useMutation } from '@redwoodjs/web'

export const ASSIGN_ACFT = gql`
  mutation updateSortieMutation($id: Int!, $aircraft_id: Int) {
    updateSortie(id: $id, input: { aircraft_id: $aircraft_id }) {
      id
    }
  }
`

export const ADD_SPARE = gql`
  mutation AddSpareMutation($aircraft_id: Int!, $date: DateTime!) {
    createSpareFlyer(input: { aircraft_id: $aircraft_id, date: $date }) {
      id
    }
  }
`

const EmptyCell = ({ params, date, addAcftToSortie, addAcftToSpare }) => {
  const [addAcft] = useMutation(ASSIGN_ACFT)
  const [addSpare] = useMutation(ADD_SPARE)

  const [{ isOver }, drop] = useDrop({
    accept: ['sortie'],
    drop: (sortie) => addSortie(sortie),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const addSortie = ({ sortie }) => {
    if (Array.isArray(sortie)) {
      addSpare({
        variables: {
          aircraft_id: params.id,
          date: date,
        },
      })
      addAcftToSpare(params.id, date)
    } else {
      addAcft({
        variables: {
          id: sortie.id,
          aircraft_id: params.id,
        },
      })
      addAcftToSortie(params.id, sortie)
    }
  }

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isOver ? 'lightgrey' : null,
        color: 'white',
      }}
    >
      {' '}
    </div>
  )
}

export default EmptyCell

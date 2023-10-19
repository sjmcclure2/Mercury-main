import { useDrop } from 'react-dnd'
import { useMutation } from '@redwoodjs/web'

const ASSIGN_ACFT = gql`
  mutation updateSortieMutation($id: Int!, $aircraft_id: Int) {
    updateSortie(id: $id, input: { aircraft_id: $aircraft_id }) {
      id
    }
  }
`

const ADD_SPARE = gql`
  mutation AddSpareMutation($aircraft_id: Int!, $date: DateTime!) {
    createSpareFlyer(input: { aircraft_id: $aircraft_id, date: $date }) {
      id
    }
  }
`

const RenderInsp = ({ params, date, addAcftToSortie, addAcftToSpare }) => {
  const [addAcft] = useMutation(ASSIGN_ACFT)
  const [addSpare] = useMutation(ADD_SPARE)

  const [{ isOver }, drop] = useDrop({
    accept: ['sortie'],
    drop: (sortie) => addSortie(sortie),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const addSortie = (sortie) => {
    if (sortie.aircraft) {
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
          id: sortie.sortie.id,
          aircraft_id: params.id,
        },
      })
      addAcftToSortie(params.id, sortie.sortie)
    }
  }

  return (
    <div
      ref={drop}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: isOver ? 'lightgrey' : null,
      }}
    >
      {Array.isArray(params.value) ? (
        <span style={{ background: '#38e', color: '#fff' }}>
          {params.value.find((target) => target.type === 'insp').name}
        </span>
      ) : (
        <span>{params.value?.name}</span>
      )}
    </div>
  )
}

export default RenderInsp

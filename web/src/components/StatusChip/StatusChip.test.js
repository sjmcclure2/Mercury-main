import { render } from '@redwoodjs/testing/web'

import StatusChip from './StatusChip'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StatusChip', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StatusChip />)
    }).not.toThrow()
  })
})

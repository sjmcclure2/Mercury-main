export const schema = gql`
  type CalendarInspection {
    id: Int!
    name: String!
    inspection_details: String!
    frequency: Float!
    last_completed: DateTime!
    next_due: DateTime!
    aircraft: Aircraft!
    aircraft_id: Int!
  }

  type Query {
    calendarInspections: [CalendarInspection!]! @skipAuth
    calendarInspection(id: Int!): CalendarInspection @skipAuth
    calendarInspectionInDateRange(
      id: Int!
      start: DateTime!
      end: DateTime!
    ): [CalendarInspection!]! @skipAuth
  }

  input CreateCalendarInspectionInput {
    name: String!
    inspection_details: String!
    frequency: Float!
    last_completed: DateTime!
    next_due: DateTime!
    aircraft_id: Int!
  }

  input UpdateCalendarInspectionInput {
    name: String
    inspection_details: String
    frequency: Float
    next_due: DateTime!
    last_completed: DateTime
    aircraft_id: Int
  }

  type Mutation {
    createCalendarInspection(
      input: CreateCalendarInspectionInput!
    ): CalendarInspection! @skipAuth
    updateCalendarInspection(
      id: Int!
      input: UpdateCalendarInspectionInput!
    ): CalendarInspection! @skipAuth
    deleteCalendarInspection(id: Int!): CalendarInspection! @skipAuth
  }
`

export default `
  type Location {
    _id: ID!
    code: String!
    city: String!
    state: State!
    location: Position!
  }

  type State {
    uf: String!
    name: String!
  }
  type Position {
    type: String!
    coordinates: [Float]!
  }

  input InputStateOptional {
    uf: String
    name: String
  }

  input InputStateRequired {
    uf: String!
    name: String!
  }

  input InputQueryLocation {
    _id: ID
    code: String
    city: String
    state: InputStateOptional
  } 

  input InputQueryLocations {
    city: String,
    state: InputStateOptional
  }

  type Query {
    location(filter: InputQueryLocation): Location!
    locations(page: Int, perpage: Int, filter: InputQueryLocations): OutputLocations
  }

  type Mutation {
    createLocation(location: CreateLocationInput): Location!
    updateLocation(_id: ID!, location: UpdateLocationInput): Location!
    deleteLocation(_id: ID!): Location!
  }

  input InputPositionRequired {
    type: String!
    coordinates: [Float]!
  }

  input InputPositionOptional {
    type: String
    coordinates: [Float]!
  }

  input CreateLocationInput {
    code: String!
    city: String!
    state: InputStateRequired!
    location: InputPositionRequired!
  }

  input UpdateLocationInput {
    _id: ID
    code: String
    city: String
    state: InputStateOptional
    location: InputPositionOptional
  }

  type OutputLocations {
    totalcount: Int!
    hasnextpage: Boolean!
    locations: [Location!]!
  }
`;

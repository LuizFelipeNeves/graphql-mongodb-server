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

  input InputLocation {
    _id: ID
    code: String
    city: String
    state: InputState2
    location: InputPosition2
  }
  
  input InputState2 {
    uf: String
    name: String
  }

  input InputPosition2 {
    type: String!
    coordinates: [Float]!
  }

  input InputStateLocation {
    uf: String
    name: String
  }

  input InputQueryLocation {
    _id: ID
    code: String
    city: String
    state: InputStateLocation
  } 

  input InputQueryLocations {
    city: String,
    state: InputStateLocation
  }

  type Query {
    location(filter: InputQueryLocation): Location!
    locations(filter: InputQueryLocations): [Location!]!
  }

  type Mutation {
    createLocation(location: CreateLocationInput): Location!
    updateLocation(_id: ID!, location: UpdateLocationInput): Location!
    deleteLocation(_id: ID!): Location!
  }

  input InputState {
    uf: String!
    name: String!
  }

  input InputPosition {
    type: String!
    coordinates: [Float]!
  }

  input CreateLocationInput {
    code: String!
    city: String!
    state: InputState!
    location: InputPosition!
  }
  
  input UpdateLocationInput {
    code: String
    city: String
    state: InputState2
    location: InputPosition2
  }
`;

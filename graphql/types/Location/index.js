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

  input InputState {
    uf: String!
    name: String!
  }
  input InputPosition {
    type: String!
    coordinates: [Float]!
  }

  input InputStateLocation {
    uf: String
    name: String
  }

  type Query {
    location(_id: ID, code: String, city: String, state: InputStateLocation): Location!
    locations(city: String, state: InputStateLocation): [Location!]!
  }

  type Mutation {
    createLocation(location: CreateLocationInput): Location!
    updateLocation(_id: ID!, location: UpdateLocationInput): Location!
    deleteLocation(_id: ID!): Location!
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
    state: InputState
    location: InputPosition
  } 
`;

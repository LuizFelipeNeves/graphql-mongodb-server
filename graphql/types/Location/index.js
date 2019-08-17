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

  type Query {
    location(filter: InputLocation): Location!
    locations(page: Int, perpage: Int, filter: InputLocations): OutputLocations
  }

  input InputLocation {
    _id: ID
    code: String
    city: String
    state: InputStateOptional
  }

  input InputStateOptional {
    uf: String
    name: String
  }

  input InputLocations {
    city: String,
    state: InputStateOptional
  }

  type OutputLocations {
    totalcount: Int!
    hasnextpage: Boolean!
    locations: [Location!]!
  }
`;

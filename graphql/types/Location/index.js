export default `
  type Location {
    _id: ID!
    codigo: String!
    cidade: String!
    estado: State!
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
`;

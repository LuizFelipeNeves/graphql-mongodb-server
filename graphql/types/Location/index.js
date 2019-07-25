export default `
  type Location {
    _id: ID!
    cidade: String!
    estado: State!
    location: Position!
  }
  type State {
    uf: String!,
    nome: [Float]!
  }
  type Position {
    type: String!,
    coordinates: [Float]!
  }
`;

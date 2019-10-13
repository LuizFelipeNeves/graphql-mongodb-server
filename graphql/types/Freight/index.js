export default `
  type Freight {
    _id: ID!
    url: String
    site: String
    origin: Location!
    destination: Location!
    price: String!

    status: Boolean
    weight: String
    cargo: String
    km: String
    especie: String
    complement: String
    tracking: String
    note: String

    vehicles: [String]
    bodies: [String]
    cellphone: [String]
    telephone: [String]
    whatsapp: [String]
    sac: [String]
    company: Company!
  }

  type OutputFreight {
    totalcount: Int!
    hasnextpage: Boolean!
    freights: [Freight!]!
  }

  input InputQueryState {
    destination: InputCiyStateOptional
    origin: InputCiyStateOptional
  }

  input InputCiyStateOptional {
    city: String
    state: InputStateOptional
  }

  input InputCiyStateO {
    city: String
    state: InputStateOptional
  }

  input InputCiyStateR {
    city: String
    state: InputStateUFR
  }

  input InputQueryCityOrigin {
    destination: InputCiyStateO
    origin: InputCiyStateR!
  }

  input InputQueryCityDestination {
    destination: InputCiyStateR!
    origin: InputCiyStateO
  }

  type Query {
    stateOrigin(filter: InputQueryState): [String!]!
    stateDestination(filter: InputQueryState): [String!]!

    cityOrigin(filter: InputQueryCityOrigin!): [String!]!
    cityDestination(filter: InputQueryCityDestination!): [String!]!
    
    freight(_id: ID!): Freight!
    freights(page: Int, perpage: Int, filter: InputFreights): OutputFreight!
    freightsrange(page: Int, perpage: Int, filter: InputFreightsRange, range: Int!, coordinates: [Float!]!): OutputFreight!
  }

  input InputFreights {
    status: Boolean
    vehicles: [String]
    bodies: [String]
    origin: InputLocation
    destination: InputLocation
    company: QueryFreigth
  }

  input InputFreightsRange {
    status: Boolean
    vehicles: [String]
    bodies: [String]
    company: QueryFreigth
  }

  input QueryFreigth {
    _id: ID
    name: String
    level: Int
    status: Int
  }

  type Mutation {
    createFreight(freight: CreateFreightInput!): Freight!
    updateFreight(_id: ID!, freight: UpdateFreightInput!): Boolean!
    deleteFreight(_id: ID, url: String): Boolean!
  }

  input CreateFreightInput {
    url: String
    site: String
    origin: inputLocation!
    destination: inputLocation!
    status: Boolean
    weight: String
    cargo: String
    price: String
    km: String
    especie: String
    complement: String
    tracking: String
    note: String
    
    vehicles: [String]!
    bodies: [String]!
    cellphone: [String]
    telephone: [String]
    whatsapp: [String]
    sac: [String]
    company: ID!
  }
  
  input UpdateFreightInput {
    url: String
    site: String
    origin: ID
    destination: ID
    status: Boolean
    weight: String
    cargo: String
    price: String
    km: String
    especie: String
    complement: String
    tracking: String
    note: String

    vehicles: [String]
    bodies: [String]
    cellphone: [String]
    telephone: [String]
    whatsapp: [String]
    sac: [String]
    company: ID
  }

  type Subscription {
    freight: FreightSubscriptionPayload!
  }

  type FreightSubscriptionPayload {
    mutation: MutationType!
    freight: Freight!
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;

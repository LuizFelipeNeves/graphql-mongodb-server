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
    nextel: [String]
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

  type Query {
    stateOrigin(filter: InputQueryState): [String!]!
    stateDestination(filter: InputQueryState): [String!]!

    cityOrigin(filter: InputQuerStateRequired): [String!]!
    cityDestination(filter: InputQuerStateRequired): [String!]!
    
    freight(_id: ID!): Freight!
    freights(page: Int, perpage: Int, filter: InputFreights): OutputFreight!
  }

  input InputQueryState {
    city: String
    stateuf: String
    statename: String
  }

  input InputQuerStateRequired {
    city: String
    stateuf: String
    statename: String
    statebase: String!
  }

  input InputFreights {
    status: Boolean
    vehicles: [String]
    bodies: [String]

    origin_id: ID
    origincode: String
    origincity: String
    originstatename: String
    originstateuf: String

    destination_id: ID
    destinationcode: String
    destinationcity: String
    destinationstatename: String
    destinationstateuf: String

    company_id: ID
    companyname: String
    companylevel: Int
    companystatus: Int
  }

  type Mutation {
    createFreight(freight: CreateFreightInput!): Freight!
    updateFreight(_id: ID!, freight: UpdateFreightInput!): Boolean!
    deleteFreight(_id: ID, url: String): Boolean!
  }

  input CreateFreightInput {
    url: String
    site: String
    origin: ID!
    destination: ID!
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
    nextel: [String]
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
    nextel: [String]
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

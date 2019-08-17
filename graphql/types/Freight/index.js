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

  input InputFreights {
    status: Boolean
    origin: UpdateLocationInput
    destination: UpdateLocationInput
    company: InputFreightCompany
    
    vehicles: [String]
    bodies: [String]
  }

  input InputFreightCompany {
    _id: ID
    name: String
    logo: String
    level: Int
    status: Int
  }

  type Query {
    freight(_id: ID!): Freight!
    freights(page: Int, perpage: Int, filter: InputFreights): OutputFreight!
  }

  type Mutation {
    createFreight(freight: CreateFreightInput!): Freight!
    updateFreight(_id: ID!, freight: UpdateFreightInput!): Freight!
    deleteFreight(_id: ID!): Freight!
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

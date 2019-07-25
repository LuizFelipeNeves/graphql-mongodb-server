export default `
  type Frete {
    _id: ID
    url: String!,
    origem: Location!,
    destino: Location!,
    preco: String!,

    status: Boolean,
    peso: String,
    carga: String,
    km: String,
    especie: String,
    complemento: String,
    rastreamento: String,
    obs: String,

    veiculos: [String],
    carrocerias: [String],
    nextel: [String],
    celular: [String],
    fone: [String],
    whatsapp: [String],
    sac: [String],
    empresa: Company!,
  }

  type Query {
    frete(_id: ID!): Frete!
    fretes: [Frete!]!
  }

  type Mutation {
    createFrete(frete: CreateFreteInput): Frete!
    updateFrete(_id: ID!, frete: UpdateFreteInput): Frete!
    deleteFrete(_id: ID!): Frete!
  }
 
  type Subscription {
    frete: FreteSubscriptionPayload!
  }

  type FreteSubscriptionPayload {
    mutation: MutationType!
    frete: Frete!
  }

  input CreateFreteInput {
    url: String!,
    origem: ID!,
    destino: ID!,
    status: Boolean,
    peso: String,
    carga: String,
    preco: String,
    km: String,
    especie: String,
    complemento: String,
    rastreamento: String,
    obs: String,
    
    veiculos: [String]!,
    carrocerias: [String]!,
    nextel: [String],
    celular: [String],
    fone: [String],
    whatsapp: [String],
    sac: [String],
    empresa: ID!,
  }
  
  input UpdateFreteInput {
    url: String,
    origem: ID,
    destino: ID,
    status: Boolean,
    peso: String,
    carga: String,
    preco: String,
    km: String,
    especie: String,
    complemento: String,
    rastreamento: String,
    obs: String,
    
    veiculos: [String],
    carrocerias: [String],
    nextel: [String],
    celular: [String],
    fone: [String],
    whatsapp: [String],
    sac: [String],
    empresa: ID,
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;

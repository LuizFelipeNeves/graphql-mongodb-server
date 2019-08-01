export default `
  type Company {
    _id: ID!
    name: String!
    logo: String!
    level: Int
    freights: [Freight!]!
  }

  type Query {
    company(_id: ID, name: String): Company!
    companys: [Company!]!
  }
  type Mutation {
    createCompany(company: CreateCompanyInput!): Company!
    updateCompany(_id: String!, company: UpdateCompanyInput!): Company!
    deleteCompany(_id: String!): Company!
  }
  input CreateCompanyInput {
    name: String!
    logo: String!
    level: Int
  }
  
  input UpdateCompanyInput {
    name: String
    logo: String
    level: Int
  } 
`;

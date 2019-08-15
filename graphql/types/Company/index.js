export default `
  type Company {
    _id: ID!
    name: String!
    logo: String!
    level: Int
    freights: [Freight!]!
  }

  input InputCompanys {
    level: Int
  }

  type Query {
    company(_id: ID, name: String): Company!
    companys(page: Int, perpage: Int, filter: InputCompanys): [Company!]!
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

/*
type InputCompanys {
  level: Int
  name: String 
}
*/

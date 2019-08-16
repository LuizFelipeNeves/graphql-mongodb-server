export default `
  type Company {
    _id: ID!
    name: String!
    logo: String!
    level: Int
  }

  type Companys {
    _id: ID!
    name: String!
    logo: String!
    level: Int
  }

  input InputCompanys {
    level: Int
    name: String
  }

  type Query {
    company(_id: ID, name: String): Company!
    companys(page: Int, perpage: Int, filter: InputCompanys): [Companys!]!
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

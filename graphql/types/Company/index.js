export default `
  type Company {
    _id: ID!
    name: String!
    logo: String!
    level: Int
    status: Int
  }

  type Companys {
    _id: ID!
    name: String!
    logo: String!
    level: Int
    status: Int
  }

  input InputCompanys {
    level: Int
    name: String
    status: Int
  }

  type Query {
    company(_id: ID, name: String): Company!
    companys(page: Int, perpage: Int, filter: InputCompanys): [Companys!]!
  }

  type Mutation {
    createCompany(company: CreateCompanyInput!): Company!
    updateCompany(_id: String!, company: UpdateCompanyInput!): Boolean!
    deleteCompany(_id: String!): Boolean!
  }
  input CreateCompanyInput {
    name: String!
    logo: String!
    level: Int
    status: Int
  }
  
  input UpdateCompanyInput {
    name: String
    logo: String
    level: Int
    status: Int
  }
`;

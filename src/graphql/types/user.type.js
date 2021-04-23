const UserTypeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!

    }

    extend type Query {
        getUser(id:ID!): User
    }

    extend type Mutation{
        createUser(name: String!,email:String!,password:String!) : User
    }

`

export default UserTypeDefs

const UserTypeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!

    }

    extend type Query {
        me: User
        login(email:String!,password:String!): Boolean
    }

    extend type Mutation{
        register(name: String!,email:String!,password:String!) : Boolean
    }

`

export default UserTypeDefs

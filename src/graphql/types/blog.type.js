const blogType = `
type Blog {
    id:ID!
    title:String!
    owner: User!
    text: String!
    comments: [Comment]
    tags: [Tag]
}

extend type Query {
    getBlogs:[Blog]
    getBlog(id:ID!):Blog
}

extend type Mutation {
    createBlog(title:String!,text:String!,owner:ID!,tags:[String]):Blog
}

`

export default blogType

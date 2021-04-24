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
    getBlogsByTags(tags:[String]):[Blog]
}

extend type Mutation {
    createBlog(title:String!,text:String!,tags:[String]):Blog
    updateBlog(blogId:ID!,title:String,text:String,tags:[String]):Blog
}

`

export default blogType

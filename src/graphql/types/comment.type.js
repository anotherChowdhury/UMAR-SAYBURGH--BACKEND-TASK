const commentType = `
type Comment {
    id:ID!
    user:User!
    blog:Blog!
    comment: String!
}
extend type Mutation{
    createComment(userId:ID!,blogId:ID!,comment:String):Comment
}

`
export default commentType

const commentType = `
type Comment {
    id:ID!
    user:User!
    blog:Blog!
    comment: String!
}
extend type Mutation{
    createComment(blogId:ID!,comment:String):Comment
    updateComment(commentId:ID!,comment:String):Comment
}

`
export default commentType

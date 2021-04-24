const tagType = `
type Tag {
    id:ID!
    name:String!
    blogs:[Blog]
}

extend type Query {
    getBlogsByTag(tag:String!):[Blog]
}
extend type Mutation {
    createTag: Tag!
}


`
export default tagType

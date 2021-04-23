const tagType = `
type Tag {
    id:ID!
    name:String!
    blogs:[Blog]
}

extend type Mutation {
    createTag: Tag!
}


`
export default tagType

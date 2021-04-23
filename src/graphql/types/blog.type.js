export const blogType = `
type Blog {
    id:ID!
    owner: User!
    text: String!
    comments: [Comment]
    tags: [Tag]
}

`

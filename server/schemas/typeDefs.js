const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input bookInput{
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        image: String
        link: String
    }


    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(bookData: bookInput): User
        removeBook(bookId: ID!): User
    }

    type Auth {
        token: ID!
        User: User
    }
`;

module.exports = typeDefs
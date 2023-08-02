const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [
            {
                type: String!
            }
        ]
        description: {
            type: String!
        }
        bookId: {
            type: String!
        }
        image: {
            type: String!
        }
        link: {
            type: String!
        }
        title: {
            type: String!
        }
    }
    
    type User {
        _id: ID!
        username: {
            type: String!
        }
        email: {
            type: String!
        }
        password: {
            type: String!
        }
        savedBooks: [Book]!
    }

    type Query {
        me: user
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(bookData: bookInput): User
        removeBook(bookId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs
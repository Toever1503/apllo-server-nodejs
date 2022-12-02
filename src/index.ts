// define dataset
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {readFileSync} from "fs";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// define a resolver
const resolvers = {
    Query: {
        books: (parent, args, contextValue, info) => getBooks(parent, args, contextValue, info),
    },
};

async function getBooks(parent, args, contextValue, info){
    console.log("1241241", parent, args, contextValue, info)
    return books;
}


interface MyContext {
    // we'd define the properties a user should have
    // in a separate user interface (e.g., email, id, url, etc.)
    user?: UserEntity;
}


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const typeDefs = readSchemaFile('schema.graphql');
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // enable playground
    // allowBatchedHttpRequests: true, // allow batched queries
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const {url} = await startStandaloneServer(server, {
    listen: {
        port: 4000,
        path: '/graphql',
    },
});
console.log(`🚀  Server ready at: ${url}graphql`);

function readSchemaFile(path) {
    return readFileSync(`./schemas/${path}`).toString('utf-8');
}

export {};

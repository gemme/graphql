'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean
 } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
	name: 'Video',
	description: 'a video on egghead!!!',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The id of the video'
		},
		title: {
			type: GraphQLString,
			description: 'The title of the video'
		},
		duration: {
			type: GraphQLInt,
			description: 'The duration of the video'
		},
		watched: {
			type: GraphQLBoolean,
			description: 'if a video has been watched'
		}
	}
})
// defining a query type
const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root query type',
	fields: {
		video: {
			type: videoType,
			resolve: () => new Promise(resolve => {
				resolve({
					id: 'a',
					title: 'GraphQL',
					duration: 180,
					watched: true
				})
			})
		}
	}
})
 // defining a schema
const schema = new GraphQLSchema({
	query: queryType,
});


const videoA =  {
	id: '123',
	title: 'videoA',
	duration: 321,
	watched: true
};

const videoB =  {
	id: '456',
	title: 'videoB',
	duration: 111,
	watched: false
};

const videos =  [videoA, videoB];

server.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

server.listen(PORT, () => {
	console.log(`Listen on http://localhost:${PORT}`);
});


//const { graphql, buildSchema } = require('graphql');
/*
const schema = buildSchema(`
	type Video {
		id: ID,
		title: String,
		duration: Int,
		watched: Boolean
	}
	type Query  {
		video: Video,
		videos: [Video]
	}
	type Schema {
		query: Query
	}
`);
 */

/* const query = `
	query myFirstQuery {
		videos {
			id,
			title,
			duration,
			watched
		}
	}
`; */

/* const resolvers = {
	video: () => ({
		id: () => '1',
		title: () => 'bar',
		duration: () => 180,
		watched: () => true
	}),
	videos: () => videos
}; */

/* graphql(schema, query, resolvers)
	.then(result => console.log(result))
	.catch(err => console.log(err)); */

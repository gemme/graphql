'use strict';

const { graphql, buildSchema } = require('graphql');

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

const resolvers = {
	video: () => ({
		id: () => '1',
		title: () => 'bar',
		duration: () => 180,
		watched: () => true
	}),
	videos: () => videos
};

const query = `
	query myFirstQuery {
		videos {
			id,
			title,
			duration,
			watched
		}
	}
`;

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

graphql(schema, query, resolvers)
	.then(result => console.log(result))
		.catch(err => console.log(err));

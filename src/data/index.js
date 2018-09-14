const videoA =  {
	id: 'a',
	title: 'Making an Schema',
	duration: 321,
	watched: true
};

const videoB =  {
	id: 'b',
	title: 'whatever you wanna put here inside',
	duration: 111,
	watched: false
};

const videos =  [videoA, videoB];

const getVideoById = (id) => new Promise(resolve => {
    const [video] = videos.filter(video => video.id === id);
    console.log(video);
    console.log(id);
    resolve(video);
})

exports.getVideoById = getVideoById;
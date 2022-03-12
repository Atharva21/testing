const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const TICKRATE = 60;

const setup = () => {};

const update = () => {};

const render = () => {};

// game loop.
setup();
setInterval(() => {
	update();
	render();
}, 1000 / TICKRATE);

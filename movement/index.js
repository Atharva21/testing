const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const TICKRATE = 60;
const BOX_SIZE = 40;
const GRID_SIZE = 40;
const BOX_POS = {
	x: 0,
	y: 0,
};
const dir = {
	x: 0,
	y: 0,
};

const drawGrid = () => {
	const limitx = (canvas.width * 3) / GRID_SIZE + 1;
	const limity = (canvas.height * 3) / GRID_SIZE + 1;
	ctx.strokeStyle = 'grey';
	ctx.translate(-BOX_POS.x, -BOX_POS.y);
	for (let i = 0; i < limitx; i++) {
		ctx.beginPath();
		ctx.moveTo(i * GRID_SIZE, 0);
		ctx.lineTo(i * GRID_SIZE, canvas.height * 3 + 1);
		ctx.stroke();
	}
	for (let i = 0; i < limity; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * GRID_SIZE);
		ctx.lineTo(canvas.width * 3 + 1, i * GRID_SIZE);
		ctx.stroke();
	}
	ctx.translate(BOX_POS.x, BOX_POS.y);
};

const setup = () => {
	window.addEventListener('keydown', ({ key }) => {
		if (key === 'ArrowRight') {
			dir.x = 1;
			dir.y = 0;
		}
		if (key === 'ArrowLeft') {
			dir.x = -1;
			dir.y = 0;
		}
		if (key === 'ArrowUp') {
			dir.y = -1;
			dir.x = 0;
		}
		if (key === 'ArrowDown') {
			dir.x = 0;
			dir.y = 1;
		}
	});

	drawGrid();
};

const update = () => {
	BOX_POS.x += dir.x;
	BOX_POS.y += dir.y;
};

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	ctx.fillStyle = 'steelblue';
	ctx.fillRect(
		canvas.width / 2 - BOX_SIZE / 2,
		canvas.height / 2 - BOX_SIZE / 2,
		BOX_SIZE,
		BOX_SIZE
	);
};

// game loop.
setup();
setInterval(() => {
	update();
	draw();
}, 1000 / TICKRATE);

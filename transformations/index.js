const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const TICKRATE = 60;
const GRID_SIZE = 20;
let IS_DRAGGING = false;
const GRID_LIM_X = canvas.width / GRID_SIZE + 1;
const GRID_LIM_Y = canvas.height / GRID_SIZE + 1;
let MAIN_SCALE = 1;
const MAIN_OFFSET = {
	x: 0,
	y: 0,
};
const DRAG_OFFSET = {
	x: 0,
	y: 0,
};
const PIVOT = {
	x: 0,
	y: 0,
};

const handleDragEnd = (offsetX, offsetY) => {
	if (!IS_DRAGGING) return;
	IS_DRAGGING = false;
	canvas.style.cursor = 'grab';
	// console.log(offsetX, offsetY);
	MAIN_OFFSET.x += DRAG_OFFSET.x;
	MAIN_OFFSET.y += DRAG_OFFSET.y;

	DRAG_OFFSET.x = 0;
	DRAG_OFFSET.y = 0;
};

const setup = () => {
	canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
		if (IS_DRAGGING) return;
		IS_DRAGGING = true;
		// console.log(offsetX, offsetY);
		PIVOT.x = offsetX;
		PIVOT.y = offsetY;
	});
	canvas.addEventListener('mouseup', ({ offsetX, offsetY }) => {
		handleDragEnd(offsetX, offsetY);
	});
	canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
		if (!IS_DRAGGING) return;
		// console.log(offsetX, offsetY);
		canvas.style.cursor = 'grabbing';
		DRAG_OFFSET.x = PIVOT.x - offsetX;
		DRAG_OFFSET.y = PIVOT.y - offsetY;
	});
	canvas.addEventListener('mouseleave', ({ offsetX, offsetY }) => {
		handleDragEnd(offsetX, offsetY);
	});
	canvas.addEventListener('wheel', (e) => {
		e.preventDefault();
		const { deltaY } = e;
		if (deltaY < 0) {
			MAIN_SCALE /= 0.9;
		} else {
			MAIN_SCALE *= 0.9;
		}
		// console.log(MAIN_SCALE);
	});
};

const update = () => {};

const render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'grey';

	ctx.translate(-MAIN_OFFSET.x, -MAIN_OFFSET.y);
	ctx.translate(-DRAG_OFFSET.x, -DRAG_OFFSET.y);

	ctx.scale(MAIN_SCALE, MAIN_SCALE);

	for (let i = 0; i < GRID_LIM_X; i++) {
		ctx.beginPath();
		ctx.moveTo(i * GRID_SIZE, 0);
		ctx.lineTo(i * GRID_SIZE, canvas.height);
		ctx.stroke();
	}
	for (let i = 0; i < GRID_LIM_Y; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i * GRID_SIZE);
		ctx.lineTo(canvas.width, i * GRID_SIZE);
		ctx.stroke();
	}

	ctx.scale(1 / MAIN_SCALE, 1 / MAIN_SCALE);

	ctx.translate(DRAG_OFFSET.x, DRAG_OFFSET.y);
	ctx.translate(MAIN_OFFSET.x, MAIN_OFFSET.y);
};

// game loop.
setup();
setInterval(() => {
	update();
	render();
}, 1000 / TICKRATE);

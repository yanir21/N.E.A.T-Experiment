let cactii = [];
let liveDinos = [];
const DINOS_COUNT = 1000;
let dinosBackup = [];
let score;
let i;
let speedi;
let randomizer;
let bimg1;
let canPushAnother;
let bestScore;
let generation = 1;

function preload() {
	bimg1 = loadImage('background.jpg');
}
// function keyPressed() {
// 	if (key == ' ' && dino.y == height - dino.r) dino.jump();
// 	if (key == 'c') dino.shouldJump(cactii);
// }

function setup() {
	createCanvas(1000, 400);
	for (let index = 0; index < DINOS_COUNT; index++) {
		liveDinos.push(new Dino());
	}
	score = 0;
	i = 2000;
	speedi = 3000;
	randomizer = 0.03;
}

function draw() {
	background(bimg1);
	rectMode(CORNER);
	liveDinos.forEach(dino => dino.show());
	liveDinos.forEach(dino => dino.move());
	liveDinos.forEach(dino => {
		const { jump, down, left, right } = dino.getDecision(cactii);
		if (jump && dino.y == height - dino.r) dino.jump();
		if (down && dino.y > height) dino.duck();
		if (left && dino.x >= 20) dino.moveLeft();
		if (right && dino.x <= 900) dino.moveRight();
	});
	textSize(20);
	if (score % 30 == 0) canPushAnother = true;
	stroke(0);
	strokeWeight(1);
	fill(0);
	text('Score : ' + score, 10, 20);
	text('Best score : ' + bestScore, 10, 40);
	text('Generation : ' + generation, 200, 20);
	text('Players left : ' + liveDinos.length, 10, 60);
	if (random(1.25) < randomizer && canPushAnother) {
		cactii.push(new cactus());
		canPushAnother = false;
	}

	if (liveDinos.length && cactii.length >= 1) score += 1;

	for (let c of cactii) {
		stroke(0);
		strokeWeight(2);
		c.show();

		if (score > speedi) {
			speedi += 3000;
			cactus.speed += 5;
			if (randomizer < 0.015) randomizer += 0.0005;
		}
		removeColliders(c);
		if (!liveDinos.length) {
			// strokeWeight(5);
			// fill(255, 0, 0);
			// textSize(50);
			// text('GAME OVER :(', 250, 200);
			// noLoop();
			console.log('New generation');
			generation++;
			dinosBackup = nextGen(dinosBackup);
			liveDinos = [...dinosBackup];
			bestScore = score;
			score = 0;
			cactii.length = 0;
			dinosBackup.length = 0;
		}
	}

	function removeColliders(c) {
		for (let i = 0; i < liveDinos.length; i++) {
			if (liveDinos[i].collide(c)) {
				const dino = liveDinos[i];
				dino.score = score;
				dinosBackup.push(dino);
				liveDinos.splice(i, 1);
			}
		}
	}
}

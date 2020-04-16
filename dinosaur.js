class Dino {
	constructor() {
		this.r = random(20, 50);
		// this.r = 40;
		this.x = 40;
		this.y = height - this.r;
		this.v = 0;
		this.gravity = this.r / 20;
		this.color = random(255);
		this.brain = new NeuralNetwork(4, 8, 4);
	}

	jump() {
		// this.v = 20;
		this.v = 20;
	}

	duck() {
		this.v = -20;
	}
	moveRight() {
		this.x += 5;
	}

	moveLeft() {
		this.x -= 5;
	}

	show() {
		stroke(this.color);
		fill(this.color / 2, this.color * 2, this.color / 2);
		stroke(0);
		strokeWeight(2);
		rect(this.x, this.y, this.r, this.r);
	}

	move() {
		this.y -= this.v;
		this.v -= this.gravity;
		this.y = constrain(this.y, 0, height - this.r);
	}

	collide(cactus) {
		return collideRectRect(
			this.x,
			this.y,
			this.r - 5,
			this.r - 5,
			cactus.x,
			cactus.y,
			cactus.r,
			cactus.r
		);
	}

	getDecision(cactii) {
		const [first, second] = this.closetCactii(cactii);
		let input = [first.x / width, first.y / height, this.y / height, this.x / width];

		input = this.sigmoidArr(input);
		const res = this.brain.predict(input);
		return { jump: res[0] > 0.5, down: res[1] > 0.5, right: res[2] > 0.4, left: res[3] > 0.3 };
	}

	closetCactii(cactii) {
		const closet = cactii.filter(cac => cac.x >= this.x && cac.x - this.x <= 200);
		const arr = [];
		arr[0] = {
			x: closet[0] ? closet[0].x : 1,
			y: closet[0] ? closet[0].y : 1
		};
		arr[1] = {
			x: closet[1] ? closet[1].x : width / 2,
			y: closet[1] ? closet[1].y : height / 2
		};
		// if (arr[0].y != 1) {
		// 	debugger;
		// }
		return arr;
	}

	mySigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}
	sigmoidArr(arr) {
		return arr.map(num => this.mySigmoid(num));
	}
}

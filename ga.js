const nextGen = dinos => {
	const newGen = [];
	calcFitness(dinos);
	dinos.forEach(dino => {
		const parentA = pickOne(dinos);
		const parentB = pickOne(dinos);
		let child = crossOver(parentA, parentB);
		mutate(child);
		newGen.push(child);
	});
	return newGen;
};

const calcFitness = dinos => {
	let scoreSum = dinos.reduce((a, b) => a + b.score, 0);
	dinos.forEach(dino => (dino.prob = dino.score / scoreSum));
};

const pickOne = list => {
	let index = 0;
	let r = random(1);

	while (r > 0) {
		r = r - list[index].prob;
		index++;
	}

	index--;
	return list[index];
};

const crossOver = (parentA, parentB) => {
	const child = new Dino();
	child.brain = parentA.brain.copy();
	child.r = (parentA.r + parentB.r) / 2;
	child.gravity = child.r / 20;
	return child;
};

const mutate = dino => {
	if (random() < 0.01) {
		console.count('mutation');
		dino.brain.mutate(node => {
			node += 0.01;
		});
	}
};

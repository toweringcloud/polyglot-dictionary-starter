"use strict";
class WordV {
	constructor(term, def) {
		this.term = term;
		this.def = def;
	}
}

class DictionaryV {
	constructor() {}

	add(word) {}
	get(term) {}
	delete(term) {}
	update(term, def) {}
	showAll() {}
	count() {}
	upsert(word) {}
	exists(term) {}
	bulkAdd(wordArr) {}
	bulkDelete(defArr) {}
}

class SimpleDicV extends DictionaryV {
	constructor(words) {
		super();
		this.words = words;
	}

	add(word) {
		if (!this.words.has(word.term)) {
			this.words.set(word.term, word.def);
			console.log(`[add] term: ${word.term}, def: ${word.def}`);
		} else {
			console.log(`[add] ${word.term} already exists!`);
		}
	}

	get(term) {
		if (this.words.has(term)) {
			console.log(`[get] ${this.words.get(term)}`);
			return this.words.get(term);
		} else {
			return `[get] no word matching ${term}`;
		}
	}

	delete(term) {
		if (this.words.has(term)) {
			this.words.delete(term);
			console.log(`[delete] ${term}`);
		} else {
			console.log(`[delete] ${term} not exists!`);
		}
	}

	update(term, def) {
		if (this.words.has(term)) {
			this.words.set(term, def);
			console.log(`[update] ${term} -> ${def}`);
		} else {
			console.log(`[update] ${term} not exists!`);
		}
	}

	showAll() {
		const strArr = [];
		for (let val in this.words.values) {
			strArr.push(val.toString());
		}
		console.log(`[showAll] ${strArr.join(", ")}`);
		return strArr;
	}

	count() {
		console.log(`[count] ${this.words.size}`);
		return this.words.size;
	}

	upsert(word) {
		if (!this.words.has(word.term)) {
			console.log(`[upsert][a] ${word.term} -> ${word.def}`);
			this.add(word);
		} else {
			console.log(`[upsert][u] ${word.term} -> ${word.def}`);
			this.update(word.term, word.def);
		}
	}

	exists(term) {
		console.log(`[exists] ${this.words.has(term)}`);
		return this.words.has(term);
	}

	bulkAdd(wordArr) {
		console.log(`[bulkAdd] ${wordArr.length}`);
		wordArr.forEach((word) => {
			this.add(word);
		});
	}

	bulkDelete(defArr) {
		console.log(`[bulkDelete] ${defArr.length}`);
		Object.keys(this.words)
			.map((key) => new WordV(key, this.words.get(key)))
			.map((word) => {
				if (defArr.includes(word.def)) {
					console.log(`[bulkDelete] ${word.def} exists!`);
					this.delete(word.term);
				}
			});
	}
}

const mainV = () => {
	let words = new Map();
	let wordic = new SimpleDicV(words);
	const wordCat = new WordV("cat", "고양이");
	const wordDog = new WordV("dog", "강아지");
	const wordRabbit = new WordV("rabbit", "토끼");
	const wordDynamic = new WordV("any", ["A", 2, true, {}]);

	wordic.add(wordCat);
	console.log(`# get: ${wordic.get("cat")}`);
	wordic.update("cat", "야옹이");
	wordic.delete("cat");
	console.log(`# exists: ${wordic.exists("cat")}`);
	wordic.upsert(wordCat);
	wordic.bulkAdd([wordDog, wordRabbit, wordDynamic]);
	console.log(`# count: ${wordic.count()}`);
	wordic.bulkDelete(["고양이", "강아지"]);
	console.log(`# showAll: ${wordic.showAll()}`);
};
mainV();

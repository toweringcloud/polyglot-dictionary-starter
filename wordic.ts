class Word {
	constructor(public term: string, public def: any) {}
}

abstract class Dictionary {
	constructor() {}

	protected add(word: Word) {}
	protected get(term: string) {}
	protected delete(term: string) {}
	protected update(term: string, def: any) {}
	protected showAll() {}
	protected count() {}
	protected upsert(word: Word) {}
	protected exists(term: string) {}
	protected bulkAdd(wordArr: Word[]) {}
	protected bulkDelete(defArr: any[]) {}
}

type Words = Map<string, any>;

class SimpleDic extends Dictionary {
	constructor(public words: Words) {
		super();
		this.words = words;
	}

	add(word: Word): void {
		if (!this.words.has(word.term)) {
			this.words.set(word.term, word.def);
			console.log(`[add] term: ${word.term}, def: ${word.def}`);
		} else {
			console.log(`[add] ${word.term} already exists!`);
		}
	}

	get(term: string): any {
		if (this.words.has(term)) {
			console.log(`[get] ${this.words.get(term)}`);
			return this.words.get(term);
		} else {
			return `[get] no word matching ${term}`;
		}
	}

	delete(term: string): void {
		if (this.words.has(term)) {
			this.words.delete(term);
			console.log(`[delete] ${term}`);
		} else {
			console.log(`[delete] ${term} not exists!`);
		}
	}

	update(term: string, def: any): void {
		if (this.words.has(term)) {
			this.words.set(term, def);
			console.log(`[update] ${term} -> ${def}`);
		} else {
			console.log(`[update] ${term} not exists!`);
		}
	}

	showAll(): string[] {
		const strArr: string[] = [];
		for (let val in this.words.values) {
			strArr.push(val.toString());
		}
		console.log(`[showAll] ${strArr.join(", ")}`);
		return strArr;
	}

	count(): number {
		console.log(`[count] ${this.words.size}`);
		return this.words.size;
	}

	upsert(word: Word): void {
		if (!this.words.has(word.term)) {
			console.log(`[upsert][a] ${word.term} -> ${word.def}`);
			this.add(word);
		} else {
			console.log(`[upsert][u] ${word.term} -> ${word.def}`);
			this.update(word.term, word.def);
		}
	}

	exists(term: string): boolean {
		console.log(`[exists] ${this.words.has(term)}`);
		return this.words.has(term);
	}

	bulkAdd(wordArr: Word[]): void {
		console.log(`[bulkAdd] ${wordArr.length}`);
		wordArr.forEach((word) => {
			this.add(word);
		});
	}

	bulkDelete(defArr: any[]): void {
		console.log(`[bulkDelete] ${defArr.length}`);
		Object.keys(this.words)
			.map((key: string) => new Word(key, this.words.get(key)))
			.map((word: Word) => {
				if (defArr.includes(word.def)) {
					console.log(`[bulkDelete] ${word.def} exists!`);
					this.delete(word.term);
				}
			});
	}
}

const main = () => {
	let words: Words = new Map<string, any>();
	let wordic = new SimpleDic(words);
	const wordCat = new Word("cat", "고양이");
	const wordDog = new Word("dog", "강아지");
	const wordRabbit = new Word("rabbit", "토끼");
	const wordDynamic = new Word("any", ["A", 2, true, {}]);

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
main();

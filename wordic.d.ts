declare class Word {
	term: string;
	def: any;
	constructor(term: string, def: any);
}

declare abstract class Dictionary {
	constructor();
	protected add(word: Word): void;
	protected get(term: string): void;
	protected delete(term: string): void;
	protected update(term: string, def: any): void;
	protected showAll(): void;
	protected count(): void;
	protected upsert(word: Word): void;
	protected exists(term: string): void;
	protected bulkAdd(wordArr: Word[]): void;
	protected bulkDelete(defArr: any[]): void;
}

type Words = Map<string, any>;

declare class SimpleDic extends Dictionary {
	words: Words;
	constructor(words: Words);
	add(word: Word): void;
	get(term: string): any;
	delete(term: string): void;
	update(term: string, def: any): void;
	showAll(): string[];
	count(): number;
	upsert(word: Word): void;
	exists(term: string): boolean;
	bulkAdd(wordArr: Word[]): void;
	bulkDelete(defArr: any[]): void;
}

declare const main: () => void;

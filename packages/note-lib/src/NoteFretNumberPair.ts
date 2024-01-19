import { Note } from "./Note";

export class NoteFretNumberPair {
	value: Note;
	fretNumber: number;

	constructor (value: Note, fretNumber: number) {
		this.value = value;
		this.fretNumber = fretNumber;
	}

	toJSON () {
		return {
			value: this.value,
			fretNumber: this.fretNumber
		};
	}

	valueOf () {
		return JSON.stringify(this);
	}

	toString () {
		return JSON.stringify(this);
	}
}

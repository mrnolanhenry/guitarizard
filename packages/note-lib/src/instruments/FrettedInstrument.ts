import { FretBoard } from "../FretBoard";
import { Note } from "../Note";
import { Tuning } from "../Tuning";
import { Tunings } from "../data/tunings";
import { IFretSpan } from "../interfaces/IFretSpan";

const getFrettedInstrumentCommonTunings = (name: string): Tuning[] => {
	const commonTunings: Tuning[] = [];
	for (let i = 0; i < Tunings.length; i++) {
		if (Tunings[i].instrument === name) {
			commonTunings.push(Tunings[i]);
		}
	}
	return commonTunings;
};

const getFrettedInstrumentStandardTuning = (name: string): Tuning => {
	return getFrettedInstrumentCommonTunings(name)[0];
};

export abstract class FrettedInstrument {
	abstract name: string;
	abstract fretBoard: FretBoard;
	getDefaultFretSpan = (fretCount: number, tuning: Note[]): IFretSpan[] => tuning.map(() => {
		return { fret: { start: 0, end: fretCount - 1 } };
	});

	getCommonTunings = (): Tuning[] => getFrettedInstrumentCommonTunings(this.name);
	getStandardTuning = (): Tuning => getFrettedInstrumentStandardTuning(this.name);
}

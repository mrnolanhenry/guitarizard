import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface INoteSelectorProps {
	id: string;
	label?: string;
	minWidth?: string;
	note: Note;
	onNoteSelect: (note: Note) => void;
	temperament: Temperament;
	theme: Base16Theme;
}

const NoteSelector = (props: INoteSelectorProps) => {
	const {
		id,
		label,
		minWidth,
		note,
		onNoteSelect,
		temperament,
		theme
	} = props;
	return (
		<LabeledSelector<Note>
			id={`note-selector-${id}`}
			label={label}
			minWidth={minWidth}
			items={temperament.getNotesInTemperament()}
			getValue={(note: Note) => note.id}
			getDisplay={(note: Note) => note.id}
			activeItem={note}
			onChange={onNoteSelect}
			theme={theme}
		/>
	);
};

export { NoteSelector };

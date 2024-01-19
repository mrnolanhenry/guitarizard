import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import { CSSProperties } from "react";

interface INoteTableProps {
	activeKey: Key;
	isRainbowMode: boolean;
	theme: Base16Theme;
}

const NoteTable = (props: INoteTableProps) => {
	const { activeKey, isRainbowMode, theme } = props;

	const rowDiv: CSSProperties = {
		display: "flex",
		flexDirection: "row"
	};

	const colDiv: CSSProperties = {
		padding: "5px",
		textAlign: "left",
		listStylePosition: "inside"
	};

	const noteStyle: CSSProperties = {
		backgroundColor: theme.base00,
		color: theme.base05,
		borderStyle: "solid",
		borderColor: theme.base01,
		borderWidth: "1px",
		padding: "2px 0px 2px 5px",
		width: "100px"
	};

	const getNoteTextStyle = (
		isRainbowMode: boolean,
		noteStyle: CSSProperties,
		note: Note | null,
		activeKey: Key
	): CSSProperties => {
		let noteTextStyle: CSSProperties = noteStyle;

		if (isRainbowMode && note) {
			const notes: Note[] = activeKey.scale.getNotesInKey(activeKey.note);
			const semitones: number[] = activeKey.scale.intervals.map(
				(interval) => interval.semitones
			);

			const semitoneColors: string[] = semitones.map((semitone) => rainbow[semitone]);

			const noteIntervalColorCombos = notes.map((n, i) => ({
				note: n,
				semitone: semitones[i],
				semitoneColor: semitoneColors[i]
			}));

			const thisNoteIntervalColorCombo = noteIntervalColorCombos.find(
				(noteIntervalColorCombo) => noteIntervalColorCombo.note.isSimilar(note)
			);

			if (thisNoteIntervalColorCombo) {
				noteTextStyle = {
					...noteTextStyle,
					color: thisNoteIntervalColorCombo.semitoneColor
				};
			}
		}
		return noteTextStyle;
	};

	const notes: Note[] = activeKey.scale.getNotesInKey(activeKey.note);

	const mapNotes = (findFlats: boolean): JSX.Element => {
		return (
			<>
				{notes.map((note, i) => {
					const correctNote = findFlats
						? note.findFlatOrNatural()
						: note.findSharpOrNatural();

					const noteTextStyle = getNoteTextStyle(
						isRainbowMode,
						noteStyle,
						correctNote,
						activeKey
					);

					return (
						<div
							key={`${i}:${Math.random()}`}
							className="noteItem"
							style={noteTextStyle}
						>
							{correctNote ? correctNote.id : ""}
						</div>
					);
				})}
			</>
		);
	};

	const renderNoteRow = (findFlats: boolean): JSX.Element => {
		return (
			<div id="noteRow" style={rowDiv}>
				<div className="noteItem" style={noteStyle}>
					{" "}
					{findFlats ? "Flats:" : "Sharps:"}
				</div>
				{mapNotes(findFlats)}
			</div>
		);
	};

	return (
		<div id="noteTable" style={colDiv}>
      Notes included:
			{renderNoteRow(true)}
			{renderNoteRow(false)}
		</div>
	);
};

export { NoteTable };

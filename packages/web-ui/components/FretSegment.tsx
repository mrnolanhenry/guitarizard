import './FretSegment.scss';
import { instrument, Key } from "guitarizard-note-lib";
import { Base16Theme, rainbow } from "../lib/colors";

interface Props {
    stringScale: instrument.StringScale;
    fret: number;
    theme: Base16Theme;
    activeKey: Key;
}

export default function fretSegment(props: Props) {
    let notes = props.activeKey.scale.getNotesInKey(props.activeKey.note);
    let semitones = props.activeKey.scale.intervals.map(itrvl => itrvl.semitones);
    let semitoneColors = semitones.map((semitone) => rainbow[semitone]);

    let lol = notes.map((n, i) => ({
        note: n,
        semitone: semitones[i],
        semitoneColor: semitoneColors[i]
    }));

    console.log(props.stringScale);
    
    // Get the note on this string (if it exists)
    const note = props.stringScale.notes.find(note => {
        return note.fretNumber === props.fret;
    });

    const noteLul = note ? lol.find((lul) => lul.note.isSimilar(note.value)) : null;

    console.log('lul', noteLul);

    const noteDisplay = note ? note.value.id : "";

    const fretLineStyle = { backgroundColor: props.theme.base07 };

    const stringLineStyle = { backgroundColor: props.theme.base0E };
    
    const noteTextStyle = {
        backgroundColor: noteLul ? noteLul.semitoneColor : props.theme.base00,
        color: props.theme.base00,
        fontWeight: 550,
    };

    const backgroundStyle = props.fret <= props.stringScale.config.fret.start ? {
        backgroundColor: props.theme.base01
    }: {};

    return (<div className="fret-segment">
        <div className="background" style={backgroundStyle}></div>
        <div className="inner">
            <div className="string-line" style={stringLineStyle}></div>
            {note && <div className="note-container">
                <div className="note-text" style={noteTextStyle}>{noteDisplay}</div>
            </div>}
            <div className="fret-line" style={fretLineStyle}></div>
        </div>
    </div>);
}

import { Key, Note, Scale, instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import FretBoard from "./FretBoard";

interface Props {
    ukulele: instrument.Ukulele;
    keyNote: Note;
    scale: Scale;
    onTune: (stringID: string, newTuning: Note) => void;
    theme: Base16Theme;
    activeKey: Key;
}

export default function Ukulele(props: Props) {
    return <FretBoard
               fretBoard={props.ukulele.fretBoard}
               scale={props.scale}
               keyNote={props.keyNote}
               showFretBar={true}
               activeKey={props.activeKey}  
               onTune={props.onTune}
               theme={props.theme} />;
}

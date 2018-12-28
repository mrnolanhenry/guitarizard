import * as Choo from "choo";
import * as EventEmitter from "events";
import { ChooAppState } from "./client";
import { Note, instrument, Scale } from "note-lib";
import { ToolName } from "./components/toolSelector";

export default function store(
  state: ChooAppState,
  emitter: EventEmitter,
  _app: Choo
) {
  emitter.on("set-key-note", function(keyNote: Note) {
    state.keyNote = keyNote;
    emitter.emit("render");
  });

  emitter.on("set-instrument", function(
    instrument: instrument.FrettedInstrument
  ) {
    state.activeInstrumentName = instrument.name;
    emitter.emit("render");
  });

  emitter.on("set-tool", function(toolName: ToolName) {
    state.activeToolName = toolName;
    emitter.emit("render");
  });

  emitter.on("set-scale", function(scale: Scale) {
    state.activeScale = scale;
    emitter.emit("render");
  });

  emitter.on("set-instrument-tuning", function({
    instrumentName,
    stringID,
    newTuning
  }: {
    instrumentName: string;
    stringID: string;
    newTuning: Note;
  }) {
    const instrument = state.instruments.get(instrumentName);

    if (typeof instrument === "undefined") {
      return;
    }

    instrument.fretBoard.setStringTuningNote(stringID, newTuning);

    emitter.emit("render");
  });
}

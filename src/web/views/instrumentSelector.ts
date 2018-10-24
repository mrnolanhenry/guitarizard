import html from "choo/html";
import { instrument } from "note-lib";

interface Props {
  instruments: Array<instrument.FrettedInstrument>;
  activeInstrument: instrument.FrettedInstrument;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
}

export default function instrumentSelector({
  instruments,
  activeInstrument,
  onInstrumentSelect
}: Props) {
  const options = instruments.map((i: instrument.FrettedInstrument) => {
    return html`<option selected=${i.name === activeInstrument.name}
                        value="${i.name}">${i.name}</option>`;
  });

  return html`<select onchange=${onChange}>${options}</select>`;

  function onChange(e: Event) {
    e.preventDefault();

    const instrumentName = e.target
      ? (e.target as HTMLSelectElement).value
      : "";

    const instrument:
      | instrument.FrettedInstrument
      | undefined = instruments.find(i => i.name === instrumentName);

    if (typeof instrument !== "undefined") {
      onInstrumentSelect(instrument);
    }
  }
}

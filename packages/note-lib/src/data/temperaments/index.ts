import { twelveTETNotesAll, twelveTET } from "./twelveTET";

// Important to note that twelveTETNotesAll contains all notes in the twelveTET system, including enharmonic equivalents (e.g., A# and Bb)
// whereas twelveTET.notes contains only the 12 unique notes in the twelveTET system (e.g., A# is not explicitly included because A# and Bb are not BOTH included as they are enharmonically equivalent).
export { twelveTETNotesAll, twelveTET };

export const temperaments = [twelveTET];

import { twelveTETNotes, twelveTETIntervals, twelveTETIntervalQualities, twelveTETScaleDegrees, twelveTET } from "./twelveTET";

// Important to note that twelveTETNotes is an object that contains all notes in the twelveTET system, including enharmonic equivalents (e.g., A# and Bb)
// whereas twelveTET.notes is an array that contains only the 12 unique notes in the twelveTET system (e.g., A# is not explicitly included because A# and Bb are not BOTH included as they are enharmonically equivalent).
// Similarly, twelveTETIntervals is an object that contains all intervals in the twelveTET system 
// whereas twelveTET.intervals is an array that contains only the 12 unique intervals in the twelveTET system (e.g., A# is not explicitly included because A# and Bb are not BOTH included as they are enharmonically equivalent).
export { twelveTETNotes, twelveTETIntervals, twelveTETIntervalQualities, twelveTETScaleDegrees, twelveTET };

export const temperaments = [twelveTET];

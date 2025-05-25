import { Temperament } from "./Temperament";
import { Course } from "./Course";
import { Note } from "./Note";
import { Scale } from "./Scale";
import { ScaleOnCourse } from "./ScaleOnCourse";
import { IFretSpan } from "./interfaces/IFretSpan";
import { NotePitch } from "./enums/NotePitch";
import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { Key } from "./Key";

export class FretBoard {
  temperament: Temperament;
  courses: Course[];
  fretSpan: IFretSpan[];
  /**
   * A FretBoard that holds strings.
   *
   * @param temperament : what temperament do the
   *   frets on this bord conform to?
   *
   * @param courses : Course[] - TunedString[] that represents
   * either a single string or series of strings typically tuned to the same note
   * e.g. Mandolin or 12-string guitar have pairs of TunedStrings in their courses,
   * some instruments have triplets or varied courses)
   *
   * (TunedString[]): left to right
   *   order---imagine a guitar hanging on the wall: The
   *   "A" string would be second from the left, and the
   *   high "e" string would be wayyyy on the right, or in
   *   this example, the last element in the array.
   *
   * @param fretSpan (Array<{ fret: { start,  end } }>):
   *   Defines the position of the strings on the FretBoard
   *   with the string's starting position, and tohe
   */
  constructor(
    temperament: Temperament,
    courses: Course[],
    fretSpan: IFretSpan[],
  ) {
    this.temperament = temperament;
    this.courses = courses;
    this.fretSpan = fretSpan;
  }

  /**
   * calculate fretCount as the longest given bound
   */
  getFretCount(): number {
    return this.fretSpan.reduce((max, config) => {
      return config.fret.end > max ? config.fret.end : max;
    }, 0);
  }

  /**
   * Set a single string's tuning on this fretboard
   */
  setCourseTuningNote(courseId: string, tuningNote: Note): void {
    this.courses = this.courses.map((course) => {
      if (course.id === courseId) {
        course.tunedStrings.forEach((tunedString) => {
          tunedString.setTuningNote(tuningNote);
        });
      }
      return course;
    });
  }

  /**
   * NOLAN TODO: Do some renaming of either this method or "ScaleOnCourse"
   * gets all notes available on each course of the Fretboard
   */
  getNotes(): ScaleOnCourse[] {
    return this.courses.map((course, i) => {
      const config = this.fretSpan[i];

      const fret = config.fret;
      const fretSpan = fret.end - fret.start;
      const notesOnString = course.tunedStrings[0].getFrettedNotes(
        this.temperament,
        fretSpan,
      );

      const notes = notesOnString.map(
        (note, offset) => new NoteFretNumberPair(note, fret.start + offset),
      );

      return new ScaleOnCourse(course, config, notes);
    });
  }

  // NOLAN TODO: Do some renaming of either this method or "ScaleOnCourse"
  // same result as `getNotes`, but the notes are filtered
  // out according to the scale given. EG. A chromatic
  // scale will always equal the output of `getNotes`
  getNotesInKey(key: Key): ScaleOnCourse[] {
    const notesInKey = key.getNotesInKey();
    return this.getNotes().map((string) => {
      // filter out any notes that don't exist
      // in the `notesInKey` array
      const fretNotes = string.notes.filter((fretNote) => {
        return !!notesInKey.find((noteInKey) => fretNote.value.isSimilar(noteInKey));
      });

      // "tune" the notes to the given key.note. currently
      // super dumb... makes the notes "sharp" if the
      // key note is sharp lol.
      const tunedFretNotes = fretNotes.map((fretNote) => {
        if (key.tonic.pitch === NotePitch.Sharp) {
          const sharpNote = fretNote.value.findSharp();

          if (sharpNote) {
            fretNote.value = sharpNote;
          }
        }

        return fretNote;
      });

      return new ScaleOnCourse(string.course, string.config, tunedFretNotes);
    });
  }

  toJSON() {
    return {
      temperament: this.temperament,
      courses: this.courses,
      fretSpan: this.fretSpan,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}

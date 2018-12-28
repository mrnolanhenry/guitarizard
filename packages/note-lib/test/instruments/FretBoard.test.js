const tap = require('tap');
const diatonic = require('../../src/data/scaleSystem/diatonic');
const Note = require('../../src/Note');
const ScaleSystem = require('../../src/ScaleSystem');
const Scale = require('../../src/Scale');
const TunedString = require('../../src/instrument/TunedString');
const FretBoard = require('../../src/instrument/FretBoard');

tap.test('class FretBoard --- init', function (t) {

  const system = new ScaleSystem('test', [
    new Note('X'),
    new Note('Y')
  ])

  const tunedStrings = [
    new TunedString('X', new Note('X'), 'metal', 0.25),
    new TunedString('X', new Note('Y'), 'metal', 0.33)
  ];

  const stringConfig = [
    {
      fret: { start: 0, end: 2 }
    },
    {
      fret: { start: 1, end: 2 }
    }
  ];

  const fretBoard = new FretBoard(system,
                                  tunedStrings,
                                  stringConfig)

  t.same(fretBoard.getNotes(), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: new Note('X'), fretNumber: 0 },
        { value: new Note('Y'), fretNumber: 1 },
        { value: new Note('X'), fretNumber: 2 }
      ]
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: new Note('Y'), fretNumber: 1 },
        { value: new Note('X'), fretNumber: 2 }
      ]
    }
  ]);

  t.end();
});

tap.test('class FretBoard --- getNotesInScale', function (t) {

  const tunedStrings = [
    new TunedString('0', diatonic.E, 'metal', 0.2540),
    new TunedString('1', diatonic.A, 'metal', 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } }
  ]

  const stubbyBoard = new FretBoard(diatonic, tunedStrings, stringConfig);

  const chromatic = new Scale('chromatic', diatonic, [0,1,2,3,4,5,6,7,8,9,10,11,12])

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note('A')), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: diatonic.E, fretNumber: 0 },
        { value: diatonic.F, fretNumber: 1 },
        { value: diatonic.Gb, fretNumber: 2 },
        { value: diatonic.G, fretNumber: 3 },
        { value: diatonic.Ab, fretNumber: 4 },
        { value: diatonic.A, fretNumber: 5 }
      ]
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: diatonic.A, fretNumber: 0 },
        { value: diatonic.Bb, fretNumber: 1 },
        { value: diatonic.B, fretNumber: 2 },
        { value: diatonic.C, fretNumber: 3 },
        { value: diatonic.Db, fretNumber: 4 },
        { value: diatonic.D, fretNumber: 5 }
      ]
    }
  ])

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note('A')),
         stubbyBoard.getNotesInScale(chromatic, new Note('B')),
         'chromatic scale does not change based on key')

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note('A')),
         stubbyBoard.getNotes(),
         'chromatic scale is the same as `getNotes()`')

  const blues = new Scale('blues', diatonic, [0,3,5,6,7,10,12])

  t.same(stubbyBoard.getNotesInScale(blues, new Note('A')), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: diatonic.E, fretNumber: 0 },
        { value: diatonic.G, fretNumber: 3 },
        { value: diatonic.A, fretNumber: 5 }
      ]
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: diatonic.A, fretNumber: 0 },
        { value: diatonic.C, fretNumber: 3 },
        { value: diatonic.D, fretNumber: 5 }
      ]
    }
  ], 'blues scale in A works ok')

  t.same(stubbyBoard.getNotesInScale(blues, new Note('F#', { isSharp: true })), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: diatonic.E, fretNumber: 0 },
        { value: diatonic.Fs, fretNumber: 2 },
        { value: diatonic.A, fretNumber: 5 }
      ]
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: diatonic.A, fretNumber: 0 },
        { value: diatonic.B, fretNumber: 2 },
        { value: diatonic.C, fretNumber: 3 },
        { value: diatonic.Cs, fretNumber: 4 }
      ]
    }
  ], 'blues scale in F# works ok')


  t.end()
});

tap.test('class FretBoard --- toJSON / valueOf / toString', function (t) {
  const tunedStrings = [
    new TunedString('0', diatonic.E, 'metal', 0.2540),
    new TunedString('1', diatonic.A, 'metal', 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } }
  ]

  const stubbyBoard = new FretBoard(diatonic, tunedStrings, stringConfig);

  t.same(stubbyBoard.toJSON(), {
    scaleSystem: diatonic,
    tunedStrings,
    stringConfig
  }, 'correct json format');

  t.same(stubbyBoard.valueOf(), JSON.stringify(stubbyBoard.toJSON()))
  t.same(stubbyBoard.toString(), JSON.stringify(stubbyBoard.toJSON()))

  t.end();
});

tap.test('setStringTuningNote()', (t) => {
  const tunedStrings = [
    new TunedString('x', diatonic.E, 'metal', 0.2540),
    new TunedString('y', diatonic.A, 'metal', 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } }
  ]

  const stubbyBoard = new FretBoard(diatonic, tunedStrings, stringConfig);

  t.equal(stubbyBoard.tunedStrings[0].tuningNote, diatonic.E);
  t.equal(stubbyBoard.tunedStrings[1].tuningNote, diatonic.A);

  stubbyBoard.setStringTuningNote('x', diatonic.C);

  t.equal(stubbyBoard.tunedStrings[0].tuningNote, diatonic.C);
  t.equal(stubbyBoard.tunedStrings[1].tuningNote, diatonic.A);

  t.end();
});

tap.test('getFretCount()', (t) => {
  const tunedStrings = [
    new TunedString('x', diatonic.E, 'metal', 0.2540),
    new TunedString('y', diatonic.A, 'metal', 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } }
  ]

  const stubbyBoard = new FretBoard(diatonic, tunedStrings, stringConfig);

  t.equal(stubbyBoard.getFretCount(), 5);

  t.end();
});

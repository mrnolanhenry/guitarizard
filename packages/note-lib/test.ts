import test from 'node:test';
import { spec } from 'node:test/reporters';
import * as glob  from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = glob.sync(__dirname + '/test/**/*.ts')

console.log("TESTING FILES: ", JSON.stringify(files, null, 4));

// See full options for `test.run` here:
//
// https://nodejs.org/api/test.html#runoptions
//
test.run({
  files,

  // Set to true if you want to auto-run tests on change.
  watch: false,

  // Set to `true` to run `test.only` test cases:
  //
  // (useful when debugging).
  //
  // See:
  //
  // https://nodejs.org/api/test.html#testonlyname-options-fn
  only: false,

  // Set to false if you're debugging multiple test files at once
  // and need the output to be sane.
  concurrency: true
})
 .on('test:fail', () => {
   process.exitCode = 1;
 })
 .compose(spec)
 .pipe(process.stdout);

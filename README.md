# guitarizard

Collection of tools for string-based instruments.

## Development

Install npm dependencies and run the UI:

```
npm i
npm -w ui run dev
```

To run the note-lib tests:

```
npm -w note-lib run test
```

- These tests make use of the [official Node.js test runner](https://nodejs.org/api/test.html#test-runner)
  and the official [node assert library](https://nodejs.org/api/assert.html#assertokvalue-message).

To check if the ui build works:

```
npm -w ui run build
```

To lint the source code:

```
npm run lint
```

To format projects source code:

```
npm run format
```

## Dependencies

- Node.js 18 (LTS)

## Projects

- `note-lib`: music theory library.
- `web-ui`: web interface for guitarizard.

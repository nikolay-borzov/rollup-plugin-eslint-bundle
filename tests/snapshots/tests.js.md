# Snapshot report for `tests/tests.js`

The actual snapshot is saved in `tests.js.snap`.

Generated by [AVA](https://avajs.dev).

## Sourcemap » Should generate source map for fixed code

> Snapshot 1

    SourceMap {
      file: 'fixable.js',
      mappings: 'AAAe,gBAAQ,GAAG;AAC1B,EAAE,IAAI,CAAC,GAAG,EAAC;;AACX,EAAE,IAAI,CAAC,CAAC,GAAG,EAAE;AACb,IAAI,SAAS;;AACb,IAAI,OAAO,CAAC,CAAC,CAAC;AACd,GAAG;AACH,IAAI,GAAG,MAAM,EAAE,EAAE,OAAO,CAAC,MAAO,CAAC,EAAE;AACnC,EAAG;AACH;;',
      names: [],
      sources: [
        'fixtures/fixable.js',
      ],
      sourcesContent: [
        `export default function() {␊
          var a = 6␊
          if (!!foo) {␊
            debugger;␊
            return [a]␊
          } else {␊
            if(window) { return [1984, ]; }␊
          }␊
        }`,
      ],
      version: 3,
    }

## Sourcemap » Should preserve existing source map by default

> Snapshot 1

    SourceMap {
      file: 'fixable.js',
      mappings: 'AAAe,gBAAQ,GAAG;AAC1B,EAAE,IAAI,CAAC,GAAG,EAAC;AACX,EAAE,IAAI,CAAC,CAAC,GAAG,EAAE;AACb,IAAI,SAAS;AACb,IAAI,OAAO,CAAC,CAAC,CAAC;AACd,GAAG,MAAM;AACT,IAAI,GAAG,MAAM,EAAE,EAAE,OAAO,CAAC,IAAI,GAAG,CAAC,EAAE;AACnC,GAAG;AACH;;;;',
      names: [],
      sources: [
        'fixtures/fixable.js',
      ],
      sourcesContent: [
        `export default function() {␊
          var a = 6␊
          if (!!foo) {␊
            debugger;␊
            return [a]␊
          } else {␊
            if(window) { return [1984, ]; }␊
          }␊
        }`,
      ],
      version: 3,
    }

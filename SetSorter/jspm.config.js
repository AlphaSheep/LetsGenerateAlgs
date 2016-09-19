SystemJS.config({
  devConfig: {
    'map': {
      'babel-plugin-transform-decorators-legacy': 'npm:babel-plugin-transform-decorators-legacy@1.3.4',
      'babel-plugin-transform-class-properties': 'npm:babel-plugin-transform-class-properties@6.10.2',
      'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@6.8.0',
      'babel-plugin-transform-es2015-typeof-symbol': 'npm:babel-plugin-transform-es2015-typeof-symbol@6.8.0',
      'babel-plugin-angular2-annotations': 'npm:babel-plugin-angular2-annotations@5.1.0',
      'plugin-babel': 'npm:systemjs-plugin-babel@0.0.10'
    },
    'packages': {
      'npm:babel-plugin-transform-decorators-legacy@1.3.4': {
        'map': {
          'babel-template': 'npm:babel-template@6.9.0',
          'babel-plugin-syntax-decorators': 'npm:babel-plugin-syntax-decorators@6.8.0',
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-transform-class-properties@6.10.2': {
        'map': {
          'babel-plugin-syntax-class-properties': 'npm:babel-plugin-syntax-class-properties@6.8.0',
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-transform-flow-strip-types@6.8.0': {
        'map': {
          'babel-plugin-syntax-flow': 'npm:babel-plugin-syntax-flow@6.8.0',
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-transform-es2015-typeof-symbol@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-syntax-class-properties@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-syntax-decorators@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-syntax-flow@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.9.2'
        }
      },
      'npm:babel-plugin-angular2-annotations@5.1.0': {
        'map': {
          'babel-generator': 'npm:babel-generator@6.11.4'
        }
      }
    }
  },
  packages: {
    'src': {
      'defaultExtension': 'js'
    }
  },
  transpiler: 'plugin-babel',
  babelOptions: {
    'plugins': [
      'babel-plugin-transform-es2015-typeof-symbol',
      'babel-plugin-angular2-annotations',
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-flow-strip-types'
    ]
  }
});

SystemJS.config({
  packageConfigPaths: [
    'npm:@*/*.json',
    'npm:*.json',
    'github:*/*.json'
  ],
  map: {
    '@angular/common': 'npm:@angular/common@2.0.0-rc.4',
    '@angular/compiler': 'npm:@angular/compiler@2.0.0-rc.4',
    '@angular/core': 'npm:@angular/core@2.0.0-rc.4',
    '@angular/http': 'npm:@angular/http@2.0.0-rc.4',
    '@angular/platform-browser': 'npm:@angular/platform-browser@2.0.0-rc.4',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.0.0-rc.4',
    'assert': 'github:jspm/nodelibs-assert@0.2.0-alpha',
    'babel': 'npm:babel-core@6.11.4',
    'buffer': 'github:jspm/nodelibs-buffer@0.2.0-alpha',
    'child_process': 'github:jspm/nodelibs-child_process@0.2.0-alpha',
    'es6-promise': 'npm:es6-promise@3.2.1',
    'events': 'github:jspm/nodelibs-events@0.2.0-alpha',
    'fs': 'github:jspm/nodelibs-fs@0.2.0-alpha',
    'http': 'github:jspm/nodelibs-http@0.2.0-alpha',
    'module': 'github:jspm/nodelibs-module@0.2.0-alpha',
    'path': 'github:jspm/nodelibs-path@0.2.0-alpha',
    'process': 'github:jspm/nodelibs-process@0.2.0-alpha',
    'reflect-metadata': 'npm:reflect-metadata@0.1.3',
    'rxjs': 'npm:rxjs@5.0.0-beta.6',
    'stream': 'github:jspm/nodelibs-stream@0.2.0-alpha',
    'ui-router-ng2': 'npm:ui-router-ng2@1.0.0-alpha.5',
    'url': 'github:jspm/nodelibs-url@0.2.0-alpha',
    'util': 'github:jspm/nodelibs-util@0.2.0-alpha',
    'zone.js': 'npm:zone.js@0.6.12'
  },
  packages: {
    'npm:babel-core@6.11.4': {
      'map': {
        'babel-template': 'npm:babel-template@6.9.0',
        'slash': 'npm:slash@1.0.0',
        'shebang-regex': 'npm:shebang-regex@1.0.0',
        'json5': 'npm:json5@0.4.0',
        'path-exists': 'npm:path-exists@1.0.0',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-helpers': 'npm:babel-helpers@6.8.0',
        'path-is-absolute': 'npm:path-is-absolute@1.0.0',
        'babel-code-frame': 'npm:babel-code-frame@6.11.0',
        'babel-register': 'npm:babel-register@6.9.0',
        'private': 'npm:private@0.1.6',
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'convert-source-map': 'npm:convert-source-map@1.2.0',
        'minimatch': 'npm:minimatch@3.0.2',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-traverse': 'npm:babel-traverse@6.11.4',
        'debug': 'npm:debug@2.2.0',
        'babel-generator': 'npm:babel-generator@6.11.4',
        'babylon': 'npm:babylon@6.8.4',
        'lodash': 'npm:lodash@4.13.1',
        'source-map': 'npm:source-map@0.5.6'
      }
    },
    'npm:babel-template@6.9.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'babel-types': 'npm:babel-types@6.11.1',
        'babel-traverse': 'npm:babel-traverse@6.11.4',
        'babylon': 'npm:babylon@6.8.4',
        'lodash': 'npm:lodash@4.13.1'
      }
    },
    'npm:babel-messages@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2'
      }
    },
    'npm:babel-helpers@6.8.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'babel-template': 'npm:babel-template@6.9.0'
      }
    },
    'npm:babel-code-frame@6.11.0': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'esutils': 'npm:esutils@2.0.2',
        'js-tokens': 'npm:js-tokens@2.0.0',
        'chalk': 'npm:chalk@1.1.3'
      }
    },
    'npm:babel-register@6.9.0': {
      'map': {
        'babel-core': 'npm:babel-core@6.11.4',
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'path-exists': 'npm:path-exists@1.0.0',
        'lodash': 'npm:lodash@4.13.1',
        'home-or-tmp': 'npm:home-or-tmp@1.0.0',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'source-map-support': 'npm:source-map-support@0.2.10',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:babel-types@6.11.1': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'babel-traverse': 'npm:babel-traverse@6.11.4',
        'lodash': 'npm:lodash@4.13.1',
        'esutils': 'npm:esutils@2.0.2',
        'to-fast-properties': 'npm:to-fast-properties@1.0.2'
      }
    },
    'npm:babel-traverse@6.11.4': {
      'map': {
        'babel-code-frame': 'npm:babel-code-frame@6.11.0',
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'babel-types': 'npm:babel-types@6.11.1',
        'debug': 'npm:debug@2.2.0',
        'babylon': 'npm:babylon@6.8.4',
        'lodash': 'npm:lodash@4.13.1',
        'invariant': 'npm:invariant@2.2.1',
        'globals': 'npm:globals@8.18.0'
      }
    },
    'npm:babel-generator@6.11.4': {
      'map': {
        'babel-messages': 'npm:babel-messages@6.8.0',
        'babel-runtime': 'npm:babel-runtime@6.9.2',
        'babel-types': 'npm:babel-types@6.11.1',
        'lodash': 'npm:lodash@4.13.1',
        'source-map': 'npm:source-map@0.5.6',
        'detect-indent': 'npm:detect-indent@3.0.1'
      }
    },
    'npm:babylon@6.8.4': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.9.2'
      }
    },
    'npm:babel-runtime@6.9.2': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.9.5',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:minimatch@3.0.2': {
      'map': {
        'brace-expansion': 'npm:brace-expansion@1.1.6'
      }
    },
    'npm:source-map-support@0.2.10': {
      'map': {
        'source-map': 'npm:source-map@0.1.32'
      }
    },
    'npm:home-or-tmp@1.0.0': {
      'map': {
        'os-tmpdir': 'npm:os-tmpdir@1.0.1',
        'user-home': 'npm:user-home@1.1.1'
      }
    },
    'npm:debug@2.2.0': {
      'map': {
        'ms': 'npm:ms@0.7.1'
      }
    },
    'npm:mkdirp@0.5.1': {
      'map': {
        'minimist': 'npm:minimist@0.0.8'
      }
    },
    'npm:detect-indent@3.0.1': {
      'map': {
        'minimist': 'npm:minimist@1.2.0',
        'get-stdin': 'npm:get-stdin@4.0.1',
        'repeating': 'npm:repeating@1.1.3'
      }
    },
    'npm:invariant@2.2.1': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.2.0'
      }
    },
    'npm:loose-envify@1.2.0': {
      'map': {
        'js-tokens': 'npm:js-tokens@1.0.3'
      }
    },
    'npm:brace-expansion@1.1.6': {
      'map': {
        'concat-map': 'npm:concat-map@0.0.1',
        'balanced-match': 'npm:balanced-match@0.4.2'
      }
    },
    'npm:source-map@0.1.32': {
      'map': {
        'amdefine': 'npm:amdefine@1.0.0'
      }
    },
    'npm:repeating@1.1.3': {
      'map': {
        'is-finite': 'npm:is-finite@1.0.1'
      }
    },
    'npm:chalk@1.1.3': {
      'map': {
        'has-ansi': 'npm:has-ansi@2.0.0',
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5',
        'ansi-styles': 'npm:ansi-styles@2.2.1',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'supports-color': 'npm:supports-color@2.0.0'
      }
    },
    'npm:is-finite@1.0.1': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.0'
      }
    },
    'npm:has-ansi@2.0.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'npm:strip-ansi@3.0.1': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'github:jspm/nodelibs-stream@0.2.0-alpha': {
      'map': {
        'stream-browserify': 'npm:stream-browserify@2.0.1'
      }
    },
    'npm:stream-browserify@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'readable-stream': 'npm:readable-stream@2.1.4'
      }
    },
    'github:jspm/nodelibs-buffer@0.2.0-alpha': {
      'map': {
        'buffer-browserify': 'npm:buffer@4.7.1'
      }
    },
    'npm:readable-stream@2.1.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'buffer-shims': 'npm:buffer-shims@1.0.0',
        'isarray': 'npm:isarray@1.0.0',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:buffer@4.7.1': {
      'map': {
        'isarray': 'npm:isarray@1.0.0',
        'base64-js': 'npm:base64-js@1.1.2',
        'ieee754': 'npm:ieee754@1.1.6'
      }
    },
    'github:jspm/nodelibs-http@0.2.0-alpha': {
      'map': {
        'http-browserify': 'npm:stream-http@2.3.0'
      }
    },
    'npm:stream-http@2.3.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.1',
        'readable-stream': 'npm:readable-stream@2.1.4',
        'to-arraybuffer': 'npm:to-arraybuffer@1.0.1',
        'builtin-status-codes': 'npm:builtin-status-codes@2.0.0',
        'xtend': 'npm:xtend@4.0.1'
      }
    },
    'github:jspm/nodelibs-url@0.2.0-alpha': {
      'map': {
        'url-browserify': 'npm:url@0.11.0'
      }
    },
    'npm:url@0.11.0': {
      'map': {
        'punycode': 'npm:punycode@1.3.2',
        'querystring': 'npm:querystring@0.2.0'
      }
    }
  }
});

const gulp = require('gulp');
const replace = require('gulp-replace');

const Builder = require('jspm').Builder;
const inlineNg2Template = require('gulp-inline-ng2-template');
const del = require('del');
const conf = require('../conf/gulp.conf');

gulp.task('systemjs', gulp.series(replaceTemplates, systemjs));
gulp.task('systemjs:html', gulp.parallel(updateIndexHtml, copyVendor));

function systemjs(done) {
  const builder = new Builder('./', 'jspm.config.js');
  builder.config({
    paths: {
      "github:*": "jspm_packages/github/*",
      "npm:*": "jspm_packages/npm/*"
    },
    packageConfigPaths: [
      'npm:@*/*.json',
      'npm:*.json',
      'github:*/*.json'
    ]
  });
  builder.buildStatic(
    conf.path.tmp('templates/index.js'),
    conf.path.tmp('index.js'),
    {
      production: true,
      browser: true
    }
  ).then(() => {
    del([conf.path.tmp('templates')]);
    done();
  }, done);
}

function copyVendor() {
  return gulp.src([
    'node_modules/reflect-metadata/Reflect.js'
  ])
  .pipe(gulp.dest(conf.path.dist('vendor')));
}

function replaceTemplates() {
  return gulp.src(conf.path.src(`**/*.js`))
    .pipe(inlineNg2Template({base: conf.path.src('app'), useRelativePaths: true}))
    .pipe(gulp.dest(conf.path.tmp('templates')));
}

function updateIndexHtml() {
  return gulp.src(conf.path.src('index.html'))
    .pipe(replace(
      /<script src="jspm_packages\/system.js">[\s\S]*System.import.*\n\s*<\/script>/,
      `<script src="index.js"></script>`
    ))
    .pipe(replace(
      /<!-- <script src="(node_modules)(\/([\s\S]*?))*"><\/script> -->/g,
      `<script src="vendor$2"></script>`
    ))
    .pipe(gulp.dest(conf.path.tmp()));
}

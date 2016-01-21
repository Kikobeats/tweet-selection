'use strict'

gulp        = require 'gulp'
gutil       = require 'gulp-util'
concat      = require 'gulp-concat'
header      = require 'gulp-header'
uglify      = require 'gulp-uglify'
cssmin      = require 'gulp-cssmin'
changed     = require 'gulp-changed'
shorthand   = require 'gulp-shorthand'
pkg         = require './package.json'
prefix      = require 'gulp-autoprefixer'
strip       = require 'gulp-strip-css-comments'
browserSync = require 'browser-sync'
reload      = browserSync.reload

PORT =
  BROWSERSYNC: 3000

dist =
  name     : pkg.name
  folder   : 'dist'

src =
  js       : 'src/tweet-selection.js'
  css      : 'src/tweet-selection.css'

banner = [ "/**"
           " * <%= pkg.name %> - <%= pkg.description %>"
           " * @version <%= pkg.version %>"
           " * @link    <%= pkg.homepage %>"
           " * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)"
           " * @license <%= pkg.license %>"
           " */"
           "" ].join("\n")

gulp.task 'css', ->
  gulp.src src.css
  .pipe changed dist.folder
  .pipe concat '' + dist.name + '.css'
  .pipe prefix()
  .pipe strip all: true
  .pipe shorthand()
  .pipe cssmin()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest dist.folder
  return

gulp.task 'js', ->
  gulp.src src.js
  .pipe changed dist.folder
  .pipe concat '' + dist.name + '.js'
  .pipe uglify()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest dist.folder
  return

gulp.task 'server', ->
  browserSync.init
    server: baseDir: "./"
    files: ["#{dist.folder}/**"]
    reloadDelay: 300
    port: PORT.BROWSERSYNC
  return

gulp.task 'build', ['css', 'js']
gulp.task 'default', ->
  gulp.start ['build', 'server']
  gulp.watch src.js, ['js']
  gulp.watch src.css, ['css']

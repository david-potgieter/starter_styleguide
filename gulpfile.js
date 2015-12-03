var gulp          = require('gulp'),
    fs            = require('fs')
    es            = require('event-stream'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    watch         = require('gulp-watch'),
    babel         = require("gulp-babel"),
    minifycss     = require('gulp-minify-css'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    notify        = require("gulp-notify"),
    plumber       = require('gulp-plumber'),
    inject        = require('gulp-inject'),
    injectStr     = require('gulp-inject-string')
    bulkSass      = require('gulp-css-globbing'),
    rename        = require('gulp-rename'),
    bowerFiles    = require('main-bower-files'),
    header        = require("gulp-header"),
    indexFile     = './index.html',
    baseSrc       = './build/base/',
    projectSrc    = './build/project/',
    contentVendor = './Content/vendor/',
    contentNpm    = './node_modules/',
    contentJS     = './Content/js/',
    contentCSS    = './Content/css/',
    contentFonts  = './Content/fonts/',
    outputJS      = 'output.js',
    outputCSS     = 'output.css',
    projOutputCSS = 'project.css',
    pkg           = require('./package.json'),
    banner        = ['/**',
                      ' * <%= pkg.name %> - <%= pkg.description %>',
                      ' * @version v<%= pkg.version %>',
                      ' * @repo <%= pkg.repository.url %>',
                      ' * @license <%= pkg.license %>',
                      ' * @who <%= pkg.contributors %>',
                      ' */',
                    ''].join('\n');

    var onError = function(err) {
        notify.onError({
            title: "Gulp",
            subtitle: 'Workflow did not compile!',
            message: "Error: <%= error.message %>",
            sound: "Beep"})(err);
        this.emit('end');
    };

    //build main.js
    gulp.task('main-js', function(cb) {
        return gulp.src(baseSrc+'app.js')
            .pipe(plumber({errorHandler: onError}))
            .pipe(babel())
            .pipe(concat(outputJS))
            //.pipe(uglify())
            .pipe(header(banner, { pkg : pkg } ))
            .pipe(gulp.dest(contentJS));
            cb();
    });

    gulp.task('main-sass', function(cb) {
        return gulp.src(baseSrc+'stylesheets/main.scss')
            .pipe(plumber({errorHandler: onError}))
            .pipe(bulkSass({extensions: ['.css', '.scss']}))
            .pipe(sass({includePaths: [contentVendor+'susy/sass/',contentNpm+'bourbon/app/assets/stylesheets/']}))
            //.pipe(sass({ outputStyle: 'default' }))
            .pipe(sass())
            .pipe(concat(outputCSS))
            .pipe(gulp.dest(contentCSS));
            cb();
    });

    //build directives
    gulp.task('angular', ['main-js'], function() {
        return gulp.src([
                contentJS+outputJS,
                baseSrc+'**/directives/**/*.js',
                baseSrc+'**/services/**/*.js',
                baseSrc+'**/controllers/**/*.js'
            ])
            .pipe(plumber({errorHandler: onError}))
            .pipe(babel())
            .pipe(concat(outputJS))
            //.pipe(uglify())
            .pipe(gulp.dest(contentJS));
    });

    //inject bower
    gulp.task('inject-bower', function() {
        var target = gulp.src(indexFile);
        var sources = gulp.src(bowerFiles(), {read:false, relative:false});
        return target.pipe(inject(sources,{name: 'bower'})).pipe(gulp.dest('./'));
    });

    //inject base
    gulp.task('inject-base', ['inject-bower','main-js','main-sass','angular'], function() {
        var target = gulp.src(indexFile);
        var sources = gulp.src([contentJS+'*.js', contentCSS+'*.css'], {read: false, relative:false});
        return target.pipe(inject(sources,{name:'app'})).pipe(gulp.dest('./'));
    });

    //BUILD PROJECT
    // copy fonts to correct place
    gulp.task('copy-fonts', function() {
        gulp.src([
                projectSrc+'fonts/**/*.eot',
                projectSrc+'fonts/**/*.svg',
                projectSrc+'fonts/**/*.ttf',
                projectSrc+'fonts/**/*.woff'
            ])
          .pipe(gulp.dest(contentFonts));
    });

    gulp.task('project-sass', function(cb) {
        return gulp.src(projectSrc+'stylesheets/main.scss')
            .pipe(plumber({errorHandler: onError}))
            .pipe(bulkSass({extensions: ['.css', '.scss']}))
            .pipe(sass({includePaths: [contentVendor+'susy/sass/',contentNpm+'bourbon/app/assets/stylesheets/']}))
            //.pipe(sass({ outputStyle: 'default' }))
            .pipe(sass())
            .pipe(concat(projOutputCSS))
            .pipe(gulp.dest(contentCSS));
            cb();
    });

    gulp.task('default',['main-js','main-sass','angular']);
    gulp.task('build',['inject-bower','main-js','main-sass','angular','inject-base','copy-fonts']);


    gulp.task('watch',function() {
        gulp.watch([baseSrc+'**/*.js'],['main-js','angular']);
        gulp.watch([baseSrc+'**/*.scss'],['main-sass']);
        gulp.watch([projectSrc+'**/*.scss'],['project-sass']);
    });



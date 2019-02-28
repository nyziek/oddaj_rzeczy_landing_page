const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');

function errorMessage(err) {

    console.log(c.red(err.messageFormatted));

    notifier.notify({
        title: 'Błąd SASS!',
        message: err.messageFormatted
    });
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" //compact, compressed, expanded
        }).on('error', errorMessage))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("default", function() {
   console.log("<><><><><><<><><><>");
   gulp.start(["sass", "watch", "browser-sync"]);
});

var gulp = require("gulp");
var browserSync = require('browser-sync').create();
var browserify = require("browserify");
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var tsify = require("tsify");

// var gulp = require("gulp");
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");

var paths = {
    pages: ['src/*.html']
};
 

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task('sass', function(done) {
    gulp.src("scr/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("scr/css"))
        .pipe(browserSync.stream());


    done();
});

/*
// Компилирует и переносит отдельно каждый src/*.ts
gulp.task("bind", () => {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
});
*/

gulp.task("bind", function(){
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});


gulp.task('serve', function(done) {

    browserSync.init({
        server: "dist/"
    });

    gulp.watch(['src/*.html', 'src/*.ts'], gulp.series("bind", "copy-html", "sass")).on('change', () => {
        browserSync.reload();
        done();
        
    });

    gulp.watch("src/sass/*.sass", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', () => {
      browserSync.reload();
      done();
    });
  

    done();
});

gulp.task("default", gulp.series("bind", "copy-html", "sass", "serve"));


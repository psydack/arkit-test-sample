const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// // copy BOOTSTRAP to vendor folder
gulp.task("vendor-bootstrap", () => {
  return gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));
});

// // copy JQUERY to vendor folder
gulp.task("vendor-jquery", () => {
  return gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./vendor/jquery"));
});

// // Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", gulp.parallel("vendor-bootstrap", "vendor-jquery"));

// // Default task
gulp.task("default", gulp.series("vendor"));

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task(
  "dev",
  gulp.series("browserSync", function() {
    gulp.watch("./css/*.css", browserSync.reload);
    gulp.watch("./*.html", browserSync.reload);
  })
);

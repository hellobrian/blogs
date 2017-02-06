const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('html-watch', (done) => {
  browserSync.reload();
  done();
});

gulp.task('serve', () => {
  browserSync.init({
    open: false,
    server: { 
      baseDir: './' 
    }
  });

  gulp.watch('*.html', ['html-watch']);
});
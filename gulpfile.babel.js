// General
import gulp         from 'gulp';
import del          from 'del';
import rename       from 'gulp-rename';
import sourcemaps   from 'gulp-sourcemaps'

// CSS
import sass         from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

// Paths
const paths = {
    src: './src/**/*',
    dest: './dist/**/*',

    styles: {
      src: './src/scss/*.scss',
      dest: './dist/'
    }
  };

export const clean = () => del(paths.dest);

export function styles() {
    console.log('styles()');
    return gulp.src(paths.styles.src)
                .pipe(sourcemaps.init())
                .pipe(autoprefixer())
                .pipe(sass({
                    outputStyle: 'compressed'
                }))
                .pipe(sourcemaps.write())
                .pipe(rename('style.min.css'))
                .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
    gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(clean, styles);

export { watchFiles as watch };
export default build;
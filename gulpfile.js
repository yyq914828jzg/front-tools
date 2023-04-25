//gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')( require ( 'sass' ) )  //sass转成css
const minifyCSS = require('gulp-minify-css') //压缩
gulp.task('sass',async function(){
    gulp.src('src/style/**.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('lib/style'));
    gulp.src(['src/**/**.js','!src/index.js'])
    .pipe(gulp.dest('lib'))
})


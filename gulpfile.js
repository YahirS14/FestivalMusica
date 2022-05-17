const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require("gulp-sass")(require("sass"));     
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js');

function css(done) {
    src("src/scss/**/*.scss") //Identificar el archivo scss a compilar
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css")); //Almacenarla
    done();
}

function imagenes(done){
    
    const opciones = {
        optimisationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

function javaScipt(done){
    src('src/js/**/*.js')    
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);//Busca el archivo a escuchar y manda a llamar una tarea
    watch("src/js/**/*.js", javaScipt);

    done();
}

exports.dev = parallel(dev, versionWebp, imagenes, versionAvif, javaScipt);
exports.css = css;
exports.js = javaScipt;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

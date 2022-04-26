const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');

function css(done) {
    src("src/scss/**/*.scss") //Identificar el archivo scss a compilar
        .pipe(plumber())
        .pipe(sass()) //Compilarlo
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

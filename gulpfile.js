const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
    src("src/scss/**/*.scss") //Identificar el archivo scss a compilar
        .pipe(sass()) //Compilarlo
        .pipe(dest("build/css")); //Almacenarla
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);//Busca el archivo a escuchar y manda a llamar una tarea

    done();
}

exports.dev = dev;
exports.css = css;

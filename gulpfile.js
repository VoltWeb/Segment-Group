"use strict";

const gulp = require("gulp"),
      del = require("del"),
      sass = require("gulp-sass"),
      csslint = require("gulp-csslint"),
      autoprefixer = require("gulp-autoprefixer"),
      cleancss = require("gulp-clean-css"),
      csscomb = require("gulp-csscomb"),
      sourcemaps = require("gulp-sourcemaps"),
      pug = require("gulp-pug"),
      htmlhint = require("gulp-htmlhint"),
      eslint = require("gulp-eslint"),
      uglify = require("gulp-uglify"),
      webp = require("gulp-webp"),
      imagemin = require("gulp-imagemin"),
      mozjpeg = require("imagemin-mozjpeg"),
      pngquant = require("imagemin-pngquant"),
      gifsicle = require("imagemin-gifsicle"),
      svgstore = require("gulp-svgstore"),
      svgmin = require("gulp-svgmin"),
      rename = require("gulp-rename"),
      server = require("browser-sync");

// 1 - Удаление папки build перед каждым запуском сборки.

gulp.task("clear", function () {
  return del("build");
});

// 2 - Копирование файлов проекта в папку сборки - build.

gulp.task("copy", function () {
  return gulp.src([
      "src/*.html",
      "src/fonts/**/*.{ttf,woff,woff2,eot,svg}",
      "src/css/**/*.css",
      "src/js/**/*.js",
      "src/img/**/*.{jpg,jpeg,png,gif,svg,ico}"
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

// 3 - Компилирование SASS в CSS. Проверка на ошибки. Расстановка вендорных префиксов. Минификация

gulp.task("css", function () {
  return gulp.src("src/css/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(csslint({
      "box-model": false,
      "display-property-grouping": true,
      "duplicate-properties": true,
      "empty-rules": true,
      "known-properties": false,
      "adjoining-classes": false,
      "box-sizing": false,
      "compatible-vendor-prefixes": false,
      "gradients": false,
      "text-indent": true,
      "vendor-prefix": true,
      "fallback-colors": false,
      "star-property-hack": true,
      "underscore-property-hack": true,
      "bulletproof-font-face": false,
      "font-faces": false,
      "import": true,
      "regex-selectors": false,
      "universal-selector": false,
      "unqualified-attributes": false,
      "zero-units": true,
      "overqualified-elements": false,
      "shorthand": false,
      "duplicate-background-images": true,
      "floats": false,
      "font-sizes": false,
      "ids": true,
      "important": true,
      "order-alphabetical": false,
      "outline-none": false,
      "qualified-headings": false,
      "unique-headings": false
    }))
    .pipe(csslint.formatter())
    .pipe(gulp.dest("build/css"))
    .pipe(cleancss({
      level: 2
    }))
    .pipe(rename("stylesheet.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"));
});

// 4 - Форматирование CSS.

gulp.task("csscomb", function () {
  return gulp.src("build/css/stylesheet.css")
    .pipe(csscomb())
    .pipe(gulp.dest("build/css"));
});

// 5 - Препроцессор HTML (PUG)

gulp.task("pug", function () {
  return gulp.src("src/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("build"))
    .pipe(server.reload({
      stream: true
    }));
});

// 6 - Проверка HTML на ошибки

gulp.task("htmlhint", function () {
  return gulp.src("build/*.html")
    .pipe(htmlhint({
      "tagname-lowercase": true,
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "attr-value-not-empty": true,
      "attr-no-duplication": true,
      "doctype-first": true,
      "tag-pair": true,
      "tag-self-close": false,
      "spec-char-escape": true,
      "id-unique": true,
      "src-not-empty": true,
      "title-require": true,
      "alt-require": true,
      "doctype-html5": true,
      "id-class-value": false,
      "style-disabled": true,
      "inline-style-disabled": false,
      "inline-script-disabled": false,
      "space-tab-mixed-disabled": "space",
      "id-class-ad-disabled": false,
      "href-abs-or-rel": false,
      "indent-width": 2,
      "attr-unsafe-chars": true
    }))
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest("build"));
});

// 7 - Проверка JS-файла проекта на ошибки и его минификация (script.js)

gulp.task("js", function () {
  return gulp.src("src/js/script.js")
    .pipe(eslint({
      globals: [
        "jQuery",
        "$"
      ],
      rules: {
        "no-console": 0,
        "no-debugger": 0,
        "camelcase": 1,
        "quotes": 0
      },
      extends: {
        "eslint": "recommended"
      },
      env: {
        "es6": true,
        "browser": true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"));
});

// 8 - Конвертация JPG, PNG в WebP

gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{jpg,jpeg,png,gif}")
  .pipe(webp())
  .pipe(gulp.dest("build/img"));
});

// 9 - Оптимизация изображений

gulp.task("img", function () {
  return gulp.src("build/img/**/*.{jpg,jpeg,png,gif}")
  .pipe(imagemin([
    mozjpeg({ quality: 100, progressive: true }),
    pngquant({ quality: [0.9, 1] }),
    gifsicle({ interlaced: true })
  ]))
  .pipe(gulp.dest("build/img"));
});

// 10 - Создание спрайта из SVG и его минификация

gulp.task("svg", function () {
  return gulp.src("build/img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({ inlineSvg: true }))
  .pipe(rename("icons.svg"))
  .pipe(gulp.dest("build/img"));
});

// 11 - Сборка проекта без запуска сервера

gulp.task("build", gulp.series( "clear", "copy", "pug", "htmlhint", gulp.parallel("css", "js"), 'csscomb', "img", "webp", "svg" ));

// 12 - Запуск сервера разработки проекта

gulp.task("server", function () {
  server.create().init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("src/css/sass/**/*.scss", gulp.series("css"));
  gulp.watch("src/**/*.js", gulp.series("js"));

});

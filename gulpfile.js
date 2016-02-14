var gulp = require("gulp");
////引入模块
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');

////gulp只有五个方法： task，run，watch，src，和dest

////检查脚本
gulp.task("hint", function(){
    gulp.src("./public/javascripts/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

////sass
gulp.task("sass", function(){
    gulp.src("./public/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/stylesheets"));
});

////合并，压缩文件
gulp.task("scripts", function(){
    gulp.src("./public/javascripts/*.js")
        .pipe(concat("all.js"))   ////合并
        .pipe(gulp.dest("./public/dest"))  ///放在dest文件夹
        .pipe(rename("all.min.js"))  ///重命名
        .pipe(uglify())  ///压缩
        .pipe(gulp.dest('./public/dest'));
});

////默认任务
gulp.task("default", function(){
    gulp.run("hint", "sass", "scripts");
    gulp.watch("./public/javascripts/*.js", function(){
        gulp.run("hint", "sass", "scripts");
    });
//    gulp.start("hint", "sass", "scripts");
});
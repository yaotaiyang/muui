/**
 * Created by yaoxy on 2017/3/13.
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),//给 CSS 增加前缀。解决某些CSS属性不是标准属性，有各种浏览器前缀的情况
    rename = require('gulp-rename'),//设置压缩后的文件名
    cssmin = require('gulp-minify-css');
gulp.task('css', function () {
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['less/*.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('wuui.css'))
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'})) //设置压缩文件名
        .pipe(gulp.dest('dist/css'));
});
gulp.task('minifyjs',function() {
    return gulp.src(['js/*.js','!js/wuui.js','!js/zepto.min.js','js/template.js'])      //需要操作的文件
        .pipe(concat('wuui.js'))    //合并所有js到wuui.js
        .pipe(gulp.dest('js'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        //.pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));  //输出
});
gulp.task('copy',['css','minifyjs'],function(){
    return gulp.src(['js/template.js','js/zepto.min.js','js/wuui.js'])
        .pipe(gulp.dest('dist/js'));
});

//监听文件变化
gulp.task('watch', function () {
    gulp.watch(['js/*.*','less/*.*'], ['copy']);
});
var arrtask = ["copy","watch"];
gulp.task('default', arrtask);
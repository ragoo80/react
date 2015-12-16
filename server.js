/*
 * For initial front-end testing of mo-pic
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var basePath = '/dist/templates/admin_page';


app
    .set('port', (process.env.PORT || 3000))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));

//상품정보 조회
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '00.html'));
});
//상품등록
app.get(/01/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '01.html'));
});

//이벤트 조회
app.get(/02/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '02.html'));
});
//이벤트 등록
app.get(/03/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '03.html'));
});

//메뉴 관리
app.get(/04/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '04.html'));
});
//배경 이미지 설정
app.get(/05/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '05.html'));
});
//1:1 문의 답변
app.get(/06/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '06.html'));
});
//통계 - DashBoard
app.get(/07/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '07.html'));
});
//통계 - 방문현황
app.get(/08/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '08.html'));
});
//통계 - 회원분석
app.get(/09/, function(req, res) {
    res.sendFile(path.join(__dirname + basePath + '09.html'));
});





app.use('/dist/static/css', express.static(path.join(__dirname, 'dist', 'static', 'css')));
app.use('/dist/static/scripts', express.static(path.join(__dirname, 'dist', 'static', 'scripts')));
app.use('/dist/static/images', express.static(path.join(__dirname, 'dist', 'static', 'images')));
app.use('/lib/', express.static(path.join(__dirname, 'bower_components')));


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

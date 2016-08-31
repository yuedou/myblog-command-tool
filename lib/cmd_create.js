const path = require('path');
const utils = require('./util');
const fse = require('fs-extra');
const moment = require('moment');

module.exports = function (dir){
  dir = dir || '.';

  fse.mkdirsSync(path.resolve(dir,'_layout'));
  fse.mkdirsSync(path.resolve(dir,'_posts'));
  fse.mkdirsSync(path.resolve(dir,'assets'));

  //复制模板文件
  var tplDir = path.resolve(__dirname,'../tpl');
  fse.copySync(tplDir,dir);

  //创建第一篇文章
  newPost(dir,'hello,world','这是我的第一篇文章');

  console.log('ok');
}



function newPost (dir,title,content) {
  var data = [
    '---',
    'title:' + title,
    'date: ' + moment().format('YYYY-MM-DD'),
    '---',
    '',
    content
  ].join('\n');

  var name = moment().format('YYYY-MM') + '/hello-world.md';
  var file = path.resolve(dir,'_posts' , name);
  fse.outputFileSync(file,data);
}

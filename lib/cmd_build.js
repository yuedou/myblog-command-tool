const path = require('path');
const utils = require('./util');
const fse = require('fs-extra');


module.exports = function (dir , options){
  dir = dir || '.';
  var outputDir = path.resolve(options.output || dir);


  //input file
  function outputFile(file,content){
    console.log("生成页面 %s",file.slice(outputDir.length + 1));
    fse.outputFileSync(file,content);
  }


  var sourceDir = path.resolve(dir,'_posts');
  utils.eachSourceFile(sourceDir,function(f,s){
    var html = utils.renderPost(dir,f);
    var relativeFile = utils.stripExtname(f.slice(sourceDir.length + 1)) + '.html';
    var file = path.resolve(outputDir,'posts',relativeFile);
    outputFile(file,html);
  });

  //首页

  var htmlIndex = utils.renderIndex(dir);
  var fileIndex = path.resolve(outputDir,'index.html');
  outputFile(fileIndex,htmlIndex);
};

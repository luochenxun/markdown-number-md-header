#!/usr/bin/env node

/**
 *    Created by luochenxun on 16/08/28.
 *    Copyright © 2016年 Jiayoubao. All rights reserved.
 *
 *  V 1.0.0
 *
 *  Brief:
 *
 *  Need a NodeJS environment to run , learn more : https://github.com/nodejs/node  <br>
 *
 *  Usage :
 *
 *    See the variable -- usage
 *
 */

const usage =
' This script is used to number the header of markdown-files as doc-numbers , like : \n\
    #     ->    #1 \n\
    ##    ->    ##1.1  \n\
    ##    ->    ##1.2  \n\
    ###   ->    ###1.2.1 \n\
    #     ->    #2 \n\
    ##    ->    ##2.1  \n\
You can use it to translate a markdown-file directly, or you can use it to a diretory. \n\
When you use a diretory as a option of the script, \n \
it will traverse the diretory and its sub-diretory , and translate all the .md files it them. \n \
  Usage : \n\
  1. markdownNumberHeader xxx/xxx/xxx.md\n\
  2. markdownNumberHeader xxx/xxx/Diretory\n\
';
const fs = require('fs');
const path = require('path');

function checkParamAndRun() {
  let paramPath = process.argv[2];
  if (paramPath == undefined) {
    console.log(usage);
    process.exit(0);;
  }

  fs.stat(paramPath, (err, stats) => {
    // error
    if (err) {
      console.log(usage);
      process.exit(0);
    }
    // a .md file
    else if(!stats.isDirectory() && path.extname(paramPath) === '.md'){
      titleMarkdownFile(paramPath);
    }
    // diretory
    else if(stats.isDirectory()){
      console.log('Markdown-doc-header is running the in dir :' + paramPath);
      walkDirAndTitleMD(paramPath);
    }
    else {
      console.log(usage);
      process.exit(0);
    }
  });
}

function walkDirAndTitleMD(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log('readdir ' + dirPath + ' error');
      process.exit(0);
    }

    files.forEach(function(item) {
      let itemPath = path.join(dirPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        walkDirAndTitleMD(itemPath);
      } else {
        titleMarkdownFile(itemPath);
      }
    });

  });
}

/**
 * title the given markdown file , if the file isn't a markdown , return diretly
 * @param  {string}         filePath
 * @return {void}
 */
function titleMarkdownFile(filePath) {
  // param check
  if (path.extname(filePath) !== '.md') {
    return;
  }

  fs.readFile(filePath,'utf-8',function(err,data){
    if(err) throw err;

    let contentLines = data.split('\n');
    let contentBuffer = new String();
    let headerArray = [ 0 , 0 , 0 , 0];

    contentLines.map(line=>{

      // find header
      let regFindHeader = /^#+\s/g;
      let regFindNumHeader = /^#+\s[\d|.]+\s/g;
      let foundHeader = line.trimLeft().match(regFindHeader);
      let foundDocHeader = line.trimLeft().match(regFindNumHeader);
      let header; // the markdown header, as : #,##
      let headerTitle; // headerTitle , as : 1 ， 1.1

      // delete the old number
      if(foundHeader != null && foundDocHeader != null){
        let header = foundHeader[0];
        line = line.trimLeft().replace(regFindNumHeader, header);
      }

      // add new number
      if(foundHeader != null){
        let header = foundHeader[0].trim();
        let headerLevel = header.length;
        headerArray[headerLevel-1]++;
        // reset the lowLevel title doc
        for( let i = 3 ; i >= headerLevel ; i -- ){
          headerArray[i] = 0;
        }
        // add doc Header
        headerTitle = new String(headerArray[0]);
        if(headerLevel > 1){
          for( let i = 1 ; i < headerLevel ; i ++ ){
            headerTitle += ('.' + headerArray[i]);
          }
        }
        headerTitle = header + ' ' + headerTitle + ' ';
        line = line.trimLeft().replace(regFindHeader, headerTitle);
      }

      contentBuffer += (line + '\n');
    });

    fs.writeFile(filePath + '_bk', contentBuffer, 'utf8', function(err){
        if(err) throw err;
        fs.renameSync(filePath + '_bk', filePath);
        console.log('Add doc-header of file : ' + filePath + ' success. ');
    });

  });
}

//  Main{
checkParamAndRun();
//  }

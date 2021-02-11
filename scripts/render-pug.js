'use strict';
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');

module.exports = function renderPug(filePath) {
     let destPath = filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, '.html');

    var idxOf = destPath.indexOf('src\\pug\\');
    if (idxOf != -1){
        destPath = destPath.replace('src\\pug\\', 'dist/');
    }

    const srcPath = path.resolve(path.dirname(__filename), '../src');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    const html = pug.renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath
    });

    const destPathDirname = path.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    fs.writeFileSync(destPath, prettified);
};

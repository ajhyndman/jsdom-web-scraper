
const fs = require('fs');

const jsdom = require('jsdom');
const html2markdown = require('html2markdown');
const entities = require('entities');

jsdom.env({
  url: `https://your-link.com`,
  scripts: ['http://code.jquery.com/jquery.js'],
  done: (errors, window) => {
    if (errors) throw errors;

    const $ = window.$;

    $('p').each(function() {
      fs.appendFile(`./output/test.md`, `\n\n${entities.decodeHTML(html2markdown(this.innerHTML))}`, function(err) {
        if (err) return console.log(err);
      });
    });
  }
});
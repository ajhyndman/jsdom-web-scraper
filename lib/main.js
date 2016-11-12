
const fs = require('fs');

const jsdom = require('node-jsdom');
const html2markdown = require('html2markdown');
const entities = require('entities');


const printChapter = (index, title, length) => {
  // chapter content
  for (let i = 1; i <= length; i += 1) {
    let page = i < 10 ? `0${i}` : `${i}`;

    jsdom.env({
      url: `https://pactwebserial.wordpress.com/category/story/arc-${index}-${title}/${index}-${page}/`,
      scripts: ['http://code.jquery.com/jquery.js'],
      done: (errors, window) => {
        if (errors) console.log(errors);

        const $ = window.$;

        $('p').each(function() {
          fs.appendFile(`./output/chapter-${index}-${page}.md`, `\n\n${entities.decodeHTML(html2markdown(this.innerHTML))}`, function(err) {
            if (err) return console.log(err);
          });
        });
      }
    });
  }

  // histories page
  jsdom.env({
    url: `https://pactwebserial.wordpress.com/category/story/arc-${index}-${title}/${index}-x-histories/`,
    scripts: ['http://code.jquery.com/jquery.js'],
    done: (errors, window) => {
      if (errors) console.log(errors);

      const $ = window.$;

      $('p').each(function() {
        fs.appendFile(`./output/chapter-${index}-x-histories.md`, `\n\n${entities.decodeHTML(html2markdown(this.innerHTML))}`, function(err) {
          if (err) return console.log(err);
        });
      });
    }
  });
}

printChapter(1, 'bonds', 7);

printChapter(2, 'damages', 7);

printChapter(3, 'breach', 5);

printChapter(4, 'collateral', 12);

printChapter(5, 'conviction', 6);

printChapter(6, 'subordination', 12);

printChapter(7, 'void', 11);

printChapter(8, 'signature', 7);

printChapter(9, 'null', 6);

printChapter(10, 'mala-fide', 7);

printChapter(11, 'malfeasance', 11);

printChapter(12, 'duress', 8);

printChapter(13, 'execution', 9);

printChapter(14, 'sine-die', 10);

printChapter(15, 'possession', 7);

printChapter(16, 'judgment', 13);

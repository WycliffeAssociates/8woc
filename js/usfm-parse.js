// takes in usfm file as string

function usfmToJSON(usfm) {
  let chapData = {};
  let chapters = usfm.split("\\c ");
  for (let ch in chapters) {
    if (chapters[ch] == "") continue;
    if (/\\h /.exec(chapters[ch])) {
      chapData.header = chapters[ch];
    }
    else {
      let chapNum;
      try {
        // deconstructed assignment with a try-catch block! woooo
        [,chapNum] = /^\s*(\d+)/.exec(chapters[ch]);
    } catch(e) {chapNum = "-1";}
    chapData[chapNum] = {};
      let verses = chapters[ch].split("\\v ");
      for (let v in verses) {
          if (verses[v] == "") continue;
          let verseNum;
          try { // this shoudl work the majority of the time
            [,verseNum] = /^(\d+)/.exec(verses[v]);
        } catch(e) {verseNum = "-1";}
        chapData[chapNum][verseNum] = verses[v].replace(/^\s*(\d+)\s*/, "");
      }
    }
  }
return chapData;



  // let config = chapters[0];
  // let reg = /\\h ([^\\]+)/;
  // reg = reg.exec(config);
  // let name = reg[1];
  // chapters.shift();
  // console.log(name);
  //
  // let chap_data = {};
  // // loop through all chapters
  // for (var ch in chapters) {
  //   // make this chapter an object
  //   chap_data[ch] = [];
  //   let verses = chapters[ch].split("\\v ");
  //   chap_data[0] = parseInt(/^ *([0-9]+) */.exec(verses[0]));
  //   // process prequel if needed
  //   verses.shift();
  //   verses = verses.map((v) => {
  //     return v.replace(/^ *[0-9]+ */, "");
  //   });
  //   return verses;
  // }

}
module.exports = usfmToJSON;

/**
 * @author Evan Wiederspan
 * @description takes in usfm file as string
 * @param {string} usfm - A string in the USFM format
 * @return {string} A string that is the parsed version of the USFM input.
*******************************************************************************/
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
}
module.exports = usfmToJSON;

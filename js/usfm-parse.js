/**
 * @author Evan Wiederspan
 * @description takes in usfm file as string
 * @param {string} usfm - A string in the USFM format
 * @return {string} A string that is the parsed version of the USFM input.
*******************************************************************************/
function usfmToJSON(usfm) {
  let chapters = usfm.split('\\c ');
  let config = chapters[0];
  let reg = /\\h ([^\\]+)/;
  reg = reg.exec(config);
  // let name = reg[1];  //Save for later
  chapters.shift();
  let chapData = {};
  // loop through all chapters
  for (var ch in chapters) {
    // make this chapter an object
    chapData[ch] = [];
    let verses = chapters[ch].split('\\v ');
    chapData[0] = parseInt(/^ *([0-9]+) */.exec(verses[0]));
    // process prequel if needed
    verses.shift();
    verses = verses.map(v => {
      return v.replace(/^ *[0-9]+ */, '');
    });
    return verses;
  }
}
module.exports = usfmToJSON;

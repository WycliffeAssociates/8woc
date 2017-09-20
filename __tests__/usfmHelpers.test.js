/* eslint-env jest */

//helpers
import * as usfmHelpers from '../src/js/helpers/usfmHelpers';

//valid
const tc_commas = window.__base + 'test/fixtures/usfm/valid/tc_commas.usfm';
const tc_spaces = window.__base + 'test/fixtures/usfm/valid/tc_spaces.usfm';
const autographaExport = window.__base + 'test/fixtures/usfm/valid/autographa.usfm';
const translationStudioExport = window.__base + 'test/fixtures/usfm/valid/id_tit_text_reg.usfm';
const justBookId = window.__base + 'test/fixtures/usfm/valid/php_usfm.usfm';
//missing
const missingIdTag = window.__base + 'test/fixtures/usfm/missing/php_usfm_NId.usfm';
const missingVerseMarkers = window.__base + 'test/fixtures/usfm/missing/many_missing_verses.usfm';
const missingChapterMarkers = window.__base + 'test/fixtures/usfm/missing/many_missing_chapters.usfm';
const missingAChapter = window.__base + 'test/fixtures/usfm/missing/php_usfm_NoC2.usfm';
//invalid
const badIdTag = window.__base + 'test/fixtures/usfm/invalid/php_usfm_badId.txt';
//out of sequence
const outOfSequenceVerseMarkers = window.__base + 'test/fixtures/usfm/out_of_sequence/verse_markers.usfm';
const outOfSequenceChapterMarkers = window.__base + 'test/fixtures/usfm/out_of_sequence/chapter_markers.usfm';

const usfmDetails = (usfmFile) => {
  const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
  const usfm = usfmHelpers.getParsedUSFM(usfmRaw);
  return usfmHelpers.getUSFMDetails(usfm);
};

describe('USFM Details', () => {
  test('should handle translationStudio usfm export', () => {
    // parse valid usfm file
    const usfmFile = translationStudioExport;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('tit');
    expect(details.book.name).toEqual('Titus');
    expect(details.language.id).toBeUndefined();
    expect(details.language.name).toBeUndefined();
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle Autographa usfm export', () => {
    // parse valid usfm file
    const usfmFile = autographaExport;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('tit');
    expect(details.book.name).toEqual('Titus');
    expect(details.language.id).toBeUndefined();
    expect(details.language.name).toBeUndefined();
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle translationCore usfm export - \id with commas', () => {
    // parse valid usfm file
    const usfmFile = tc_commas;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('tit');
    expect(details.book.name).toEqual('Titus');
    expect(details.language.id).toEqual('gux');
    expect(details.language.name).toEqual('Gourmanchéma');
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle translationCore usfm export - \id with spaces', () => {
    // parse valid usfm file
    const usfmFile = tc_spaces;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('tit');
    expect(details.book.name).toEqual('Titus');
    expect(details.language.id).toEqual('sw');
    expect(details.language.name).toEqual('Kiswahili');
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle missing \id tag', () => {
    // parse valid usfm file
    const usfmFile = missingIdTag;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toBeUndefined();
    expect(details.book.name).toBeUndefined();
    expect(details.language.id).toBeUndefined();
    expect(details.language.name).toBeUndefined();
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle \id bookId', () => {
    // parse valid usfm file
    const usfmFile = justBookId;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('php');
    expect(details.book.name).toEqual('Philippians');
    expect(details.language.id).toBeUndefined();
    expect(details.language.name).toBeUndefined();
    expect(details.language.direction).toEqual('ltr');
  });
  
  test('should handle bad \id tag', () => {
    // parse valid usfm file
    const usfmFile = badIdTag;
    const details = usfmDetails(usfmFile);
    expect(details.book.id).toEqual('ph');
    expect(details.book.name).toBeUndefined();
    expect(details.language.id).toBeUndefined();
    expect(details.language.name).toBeUndefined();
    expect(details.language.direction).toEqual('ltr');
  });

  test('should handle missing verse markers', () => {
    // parse valid usfm file
    const usfmFile = missingVerseMarkers;
    const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
    const usfm = usfmHelpers.getParsedUSFM(usfmRaw);
    expect(usfm[1][3]).toBeUndefined();
    expect(usfm[1][4]).toBeUndefined();
    expect(usfm[1][21]).toEqual('For to me to live is Christ, and to die is gain.');
    expect(30 - Object.keys(usfm[1]).length).toEqual(2);

    expect(usfm[2][5]).toBeUndefined();
    expect(usfm[2][6]).toBeUndefined();
    expect(usfm[2][10]).toEqual('So at the name of Jesus every knee should bow,');
    expect(30 - Object.keys(usfm[2]).length).toEqual(2);

    expect(usfm[3][5]).toBeUndefined();
    expect(usfm[3][10]).toBeUndefined();
    expect(usfm[3][11]).toBeUndefined();
    expect(usfm[3][15]).toBeUndefined();
    expect(usfm[3][16]).toBeUndefined();
    expect(usfm[3][17]).toEqual('Brothers, join me and imitate me, and watch closely those who are walking by our example.');
    expect(21 - Object.keys(usfm[3]).length).toEqual(5);

    expect(usfm[4][1]).toBeUndefined();
    expect(usfm[4][21]).toBeUndefined();
    expect(usfm[4][22]).toBeUndefined();
    expect(usfm[4][4]).toEqual('Rejoice in the Lord always; again I will say, rejoice.');
    expect(23 - Object.keys(usfm[4]).length).toEqual(3);
  });

  test('should handle out of sequence verse markers', () => {
    // parse valid usfm file
    const usfmFile = outOfSequenceVerseMarkers;
    const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
    const usfm = usfmHelpers.getParsedUSFM(usfmRaw);
    expect(usfm[1]).not.toBeUndefined();
    expect(Object.keys(usfm[1])).to.have.lengthOf(30);
    expect(usfm[1][21]).toEqual('For to me to live is Christ, and to die is gain.');

    expect(usfm[2]).not.toBeUndefined();
    expect(Object.keys(usfm[2])).to.have.lengthOf(30);
    expect(usfm[2][10]).toEqual('So at the name of Jesus every knee should bow,');

    expect(usfm[3]).not.toBeUndefined();
    expect(Object.keys(usfm[3])).to.have.lengthOf(21);
    expect(usfm[3][11]).toEqual('so somehow I may experience the resurrection from the dead.');

    expect(usfm[4]).not.toBeUndefined();
    expect(Object.keys(usfm[4])).to.have.lengthOf(23);
    expect(usfm[4][4]).toEqual('Rejoice in the Lord always; again I will say, rejoice.');
  });

  test('should handle missing chapter markers', () => {
    // parse valid usfm file
    const usfmFile = missingChapterMarkers;
    const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
    const usfm = usfmHelpers.getParsedUSFM(usfmRaw);
    expect(usfm[1]).toBeUndefined();
    expect(usfm[2]).toBeUndefined();

    expect(usfm[3]).not.toBeUndefined();
    expect(Object.keys(usfm[3])).to.have.lengthOf(21);
    expect(usfm[3][11]).toEqual('so somehow I may experience the resurrection from the dead.');
  });

  test('should handle missing a chapter marker', () => {
    // parse valid usfm file
    const usfmFile = missingAChapter;
    const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
    const usfm = usfmHelpers.getParsedUSFM(usfmRaw);
    expect(usfm[2]).toBeUndefined();
    expect(usfm[3]).not.toBeUndefined();

    expect(Object.keys(usfm[1])).to.have.lengthOf(30);
    expect(Object.keys(usfm[3])).to.have.lengthOf(21);
    expect(Object.keys(usfm[4])).to.have.lengthOf(23);
    expect(usfm[3][1]).toEqual('Finally, my brothers, rejoice in the Lord.  For me to write these same things to you is not a problem, and they will keep you safe.');
  });

  test('should handle out of sequence chapter markers', () => {
    // parse valid usfm file
    const usfmFile = outOfSequenceChapterMarkers;
    const usfmRaw = usfmHelpers.loadUSFMFile(usfmFile);
    const usfm = usfmHelpers.getParsedUSFM(usfmRaw);

    expect(usfm[1]).not.toBeUndefined();
    expect(Object.keys(usfm[1])).to.have.lengthOf(30);
    expect(usfm[1][21]).toEqual('For to me to live is Christ, and to die is gain.');

    expect(usfm[2]).not.toBeUndefined();
    expect(Object.keys(usfm[2])).to.have.lengthOf(30);
    expect(usfm[2][10]).toEqual('So at the name of Jesus every knee should bow,');

    expect(usfm[3]).not.toBeUndefined();
    expect(Object.keys(usfm[3])).to.have.lengthOf(21);
    expect(usfm[3][11]).toEqual('so somehow I may experience the resurrection from the dead.');

    expect(usfm[4]).not.toBeUndefined();
    expect(Object.keys(usfm[4])).to.have.lengthOf(23);
    expect(usfm[4][4]).toEqual('Rejoice in the Lord always; again I will say, rejoice.');
  });
});


const api = window.ModuleApi;

const HTMLScraper = require('./parsers/HTMLscraper');
const Parser = require('./parsers/tNParser.js');
const Door43DataFetcher = require('./parsers/Door43DataFetcher.js');

const DataFetcher = function(params, progress, onComplete){
  var phraseData;
  params = params;
  var DoorDataFetcher = new Door43DataFetcher();
  var chapterData = {};
  var ulb = {};
  onCompleteFunction = onComplete;
  DoorDataFetcher.getBook(
    params.bookAbbr,
    function(done, total){
      progress(done/total*100);
    },
    function(err, book){
      if(err){
        onComplete(err);
      }else{

        //check to see if gatewayLanguage has already been loaded
        var gatewayLanguage = api.getDataFromCommon('gatewayLanguage');
        if (!gatewayLanguage) {
          ulb = DoorDataFetcher.getULBFromBook(book);
          var newStructure = {title: ''};
          for (chapter in ulb) {
            for (verses in ulb[chapter]) {
              var chapterNumber = ulb[chapter][verses].num;
              newStructure[chapterNumber] = {}
              for(verse in ulb[chapter][verses].verses) {
                var verseNumber = ulb[chapter][verses].verses[verse].num;
                var verse = ulb[chapter][verses].verses[verse].text;
                newStructure[chapterNumber][verseNumber] = verse;
              }
            }
          }
          //assign gatewayLanguage into CheckStore
          newStructure.title = api.convertToFullBookName(params.bookAbbr);
          api.putDataInCommon('gatewayLanguage', newStructure);
        }
        chapterData = DoorDataFetcher.getTNFromBook(book, params.bookAbbr);
        phraseData = parseObject(chapterData);
        saveData(phraseData, params, onComplete);
      }
    }
  );
}

var parseObject = function(object){
  let phraseObject = {};
  phraseObject["groups"] = [];
  for(let type in object){
    var newGroup = {group: type, checks: []};
    for(let verse of object[type].verses) {
      let newVerse = Object.assign({},verse);
      // i spent probably two hours trying to figure out
      // why my chapter and verse references were 1 off
      // i found why
      // #stopsamfaulkner2016
      //newVerse.chapter += 1;
      //newVerse.verse += 1;
      newVerse.flagged = false;
      newVerse.checkStatus = "UNCHECKED";
      newVerse.retained = "";
      newVerse.comments = "";
      newVerse.group = type;
      newGroup.checks.push(newVerse);
    }
    phraseObject["groups"].push(newGroup);
  }
  return phraseObject;
}

// Saves phrase data into the CheckStore
function saveData(phraseObject, params, onCompleteFunction) {
  api.putDataInCheckStore('TranslationNotesChecker', 'book', api.convertToFullBookName(params.bookAbbr));
  //TODO: This shouldn't be put in check store because we don't want it to be saved
  api.putDataInCheckStore('TranslationNotesChecker', 'groups', phraseObject['groups']);
  api.putDataInCheckStore('TranslationNotesChecker', 'currentCheckIndex', 0);
  api.putDataInCheckStore('TranslationNotesChecker', 'currentGroupIndex', 0);
  onCompleteFunction(null);
}

module.exports = DataFetcher;

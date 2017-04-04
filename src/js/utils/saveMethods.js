 /**
 * @description this file holds all methods that handle saving/persisting data in the
 *  file system add your methods as need and then import them into localstorage.js
 */
import fs from 'fs-extra';
import path from 'path-extra';
// consts declaration
const PARENT = path.datadir('translationCore');
const SETTINGS_DIRECTORY = path.join(PARENT, 'settings.json');
const RESOURCES_DATA_DIR = path.join('apps', 'translationCore', 'resources');
const CHECKDATA_DIRECTORY = path.join('apps', 'translationCore', 'checkData');
const INDEX_DIRECTORY = path.join('apps', 'translationCore', 'index');
/**
 * @description saves all data in settingsReducer to the specified directory.
 * @param {object} state - object of reducers (objects).
 * @const {string} SETTINGS_DIRECTORY - directory to path where settigns is being saved.
 */
export const saveSettings = state => {
  fs.outputJson(SETTINGS_DIRECTORY, state.settingsReducer);
};

export const saveResources = state => {
  const PROJECT_SAVE_LOCATION = state.projectDetailsReducer.projectSaveLocation;
  let biblesObject = state.resourcesReducer.bibles;
  let resourcesObject = state.resourcesReducer.resources;
  if (PROJECT_SAVE_LOCATION) {
    for (var keyName in biblesObject) {
      let bibleVersion = keyName + '.json';
      let savePath = path.join(
        PROJECT_SAVE_LOCATION,
        RESOURCES_DATA_DIR,
        'bibles',
        bibleVersion
      );
      fs.outputJson(savePath, biblesObject[keyName]);
    }
    if (PROJECT_SAVE_LOCATION) {
      for (var resources in resourcesObject) {
        for (var file in resourcesObject[resources]) {
          let savePath = path.join(
            PROJECT_SAVE_LOCATION,
            RESOURCES_DATA_DIR,
            resources,
            file
          );
          fs.outputJson(savePath, resourcesObject[resources][file]);
        }
      }
    }
  }
};

/**
 * @description abstracted function to hanlde data saving.
 * @param {object} state - store state object.
 * @param {string} checkDataName - checkDate folder name where data will be saved.
 *  @example 'comments', 'reminders', 'selections', 'verseEdits' etc
 * @param {object} payload - object of data: merged contextIdReducer and commentsReducer.
 * @param {sting} modifiedTimestamp - timestamp.
 */
function saveData(state, checkDataName, payload, modifiedTimestamp) {
  try {
    let savePath = generateSavePath(state, checkDataName, modifiedTimestamp);
    if (savePath) {
      fs.outputJson(savePath, payload);
    } else {
      console.warn('savePath is undefined');
    }
  } catch (err) {
    console.warn(err);
  }
}

/**
 * @description generates the output directory.
 * @param {object} state - store state object.
 * @param {string} checkDataName - checkDate folder name where data is saved.
 *  @example 'comments', 'reminders', 'selections', 'verseEdits' etc.
 * @param {string} modifiedTimestamp - timestamp.
 * that contains the specific timestamp.
 * @return {string} save path.
 */
function generateSavePath(state, checkDataName, modifiedTimestamp) {
  /**
  * @description output directory
  *  /translationCore/ar_eph_text_ulb/apps/translationCore/checkData/comments/eph/1/3
  * @example PROJECT_SAVE_LOCATION - /translationCore/ar_eph_text_ulb
  * @example CHECKDATA_DIRECTORY - /apps/translationCore/checkData
  * @example bookAbbreviation - /eph
  * @example checkDataName - /comments
  * @example chapter - /1
  * @example verse - /3
  */
  const PROJECT_SAVE_LOCATION = state.projectDetailsReducer.projectSaveLocation;
  if (PROJECT_SAVE_LOCATION && state && modifiedTimestamp) {
    let bookAbbreviation = state.contextIdReducer.contextId.reference.bookId;
    let chapter = state.contextIdReducer.contextId.reference.chapter.toString();
    let verse = state.contextIdReducer.contextId.reference.verse.toString();
    let fileName = modifiedTimestamp + '.json';
    let savePath = path.join(
        PROJECT_SAVE_LOCATION,
        CHECKDATA_DIRECTORY,
        checkDataName,
        bookAbbreviation,
        chapter,
        verse,
        fileName
    );
    return savePath;
  }
}

/**
 * @description This function saves the comments data.
 * @param {object} state - store state object.
 */
export const saveComments = state => {
  let commentsPayload = {
    ...state.contextIdReducer,
    ...state.commentsReducer
  };
  let modifiedTimestamp = state.commentsReducer.modifiedTimestamp;
  saveData(state, "comments", commentsPayload, modifiedTimestamp);
};

/**
 * @description This function saves the selections data.
 * @param {Object} state - The state object courtesy of the store
 */
export const saveSelections = state => {
  let selectionsPayload = {
    ...state.contextIdReducer,
    ...state.selectionsReducer
  };
  let modifiedTimestamp = state.selectionsReducer.modifiedTimestamp;
  saveData(state, "selections", selectionsPayload, modifiedTimestamp);
};
 /**
 * @description This function saves the verse Edit data.
 * @param {object} state - store state object.
 */
export const saveVerseEdit = state => {
  let verseEditPayload = {
    ...state.contextIdReducer,
    ...state.verseEditReducer
  };
  let modifiedTimestamp = state.verseEditReducer.modifiedTimestamp;
  saveData(state, "verseEdits", verseEditPayload, modifiedTimestamp);
};

/**
 * @description This function saves the reminders data.
 * @param {object} state - store state object.
 */
export const saveReminders = state => {
  let remindersPayload = {
    ...state.contextIdReducer,
    ...state.remindersReducer
  };
  let modifiedTimestamp = state.remindersReducer.modifiedTimestamp;
  saveData(state, "reminders", remindersPayload, modifiedTimestamp);
};
/**
 * @description saves the groups index array in the file system.
 * @param {object} state - store state object.
 */
export const saveGroupsIndex = state => {
  try {
    const PROJECT_SAVE_LOCATION = state.projectDetailsReducer.projectSaveLocation;
    let toolName = state.contextIdReducer.contextId ?
               state.contextIdReducer.contextId.tool : undefined;
    let fileName = "index.json";
    let groupsIndex = state.groupsIndexReducer.groupsIndex;
    if (toolName && PROJECT_SAVE_LOCATION && groupsIndex) {
      let savePath = path.join(PROJECT_SAVE_LOCATION, INDEX_DIRECTORY, toolName, fileName);
      fs.outputJson(savePath, groupsIndex);
    }
  } catch (err) {
    console.warn(err);
  }
};
/**
 * @description saves the groups data by groupId name.
 * @param {object} state - store state object.
 */
export const saveGroupsData = state => {
  try {
    const PROJECT_SAVE_LOCATION = state.projectDetailsReducer.projectSaveLocation;
    let toolName = state.contextIdReducer.contextId ?
               state.contextIdReducer.contextId.tool : undefined;
    let bookAbbreviation = state.contextIdReducer.contextId ?
                           state.contextIdReducer.contextId.reference.bookId : undefined;
    if (PROJECT_SAVE_LOCATION && toolName && bookAbbreviation) {
      let groupsData = state.groupsDataReducer.groupsData;
      for (let groupID in groupsData) {
        let fileName = groupID + ".json";
        let savePath = path.join(PROJECT_SAVE_LOCATION, INDEX_DIRECTORY, toolName, bookAbbreviation, fileName);
        fs.outputJson(savePath, groupsData[groupID]);
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

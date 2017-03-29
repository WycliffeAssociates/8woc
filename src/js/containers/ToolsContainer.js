import React from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../actions/NotificationActions.js';
import { showPopover } from '../actions/PopoverActions.js';
import { addNewResource, addNewBible } from '../actions/ResourcesActions.js';
import { addComment } from '../actions/CommentsActions.js';
import { addVerseEdit } from '../actions/VerseEditActions.js';
import { toggleReminder } from '../actions/RemindersActions.js';
import { changeSelections, removeSelections } from '../actions/SelectionsActions.js';
import {changeCurrentContextId} from '../actions/ContextIdActions.js';
import {addGroupData} from '../actions/GroupDataActions.js';
import * as CheckStoreActions from '../actions/CheckStoreActions.js';
import {setModuleSettings, changeModuleSettings} from '../actions/ModulesSettingsActions.js';


class ToolsContainer extends React.Component {
  render() {
    let Tool = this.props.currentTool;
    return (
      <Tool {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    modules: state.coreStoreReducer.modules,
    checkStoreReducer: state.checkStoreReducer,
    loginReducer: state.loginReducer,
    settingsReducer: state.settingsReducer,
    statusBarReducer: state.statusBarReducer,
    loaderReducer: state.loaderReducer,
    resourcesReducer: state.resourcesReducer,
    commentsReducer: state.commentsReducer,
    remindersReducer: state.remindersReducer,
    contextIdReducer: state.contextIdReducer,
    projectDetailsReducer: state.projectDetailsReducer,
    modulesSettingsReducer: state.modulesSettingsReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      updateCurrentCheck: (NAMESPACE, newCurrentCheck) => {
        dispatch(CheckStoreActions.updateCurrentCheck(NAMESPACE, newCurrentCheck));
      },
      handleGoToCheck: (newGroupIndex, newCheckIndex, groups) => {
        dispatch(CheckStoreActions.goToCheck(newGroupIndex, newCheckIndex, groups));
      },
      handleGoToNext: () => {
        dispatch(CheckStoreActions.goToNext());
      },
      handleGoToPrevious: () => {
        dispatch(CheckStoreActions.goToPrevious());
      },
      showNotification: (message, duration) => {
        dispatch(showNotification(message, duration));
      },
      showPopover: (title, bodyText, positionCoord) => {
        dispatch(showPopover(title, bodyText, positionCoord));
      },
      addNewResource: (resourceName, resourceData) => {
        dispatch(addNewResource(resourceName, resourceData));
      },
      addNewBible: (bibleName, bibleData) => {
        dispatch(addNewBible(bibleName, bibleData));
      },
      progress: (progress) => {
        console.log(progress);
      },
      addComment: (text, userName) => {
        dispatch(addComment(text, userName));
      },
      changeSelections: (text, userName) => {
        dispatch(changeSelections(text, userName));
      },
      removeSelections: (text, userName) => {
        dispatch(removeSelections(text, userName));
      },
      toggleReminder: (userName) => {
        dispatch(toggleReminder(userName));
      },
      addVerseEdit: (text, userName) => {
        dispatch(addVerseEdit(text, userName));
      },
      updateCheckIndex: (index) => {
        dispatch(CheckStoreActions.goToCheck(null, index));
      },
      updateGroupIndex: (index) => {
        dispatch(CheckStoreActions.goToCheck(index, null));
      },
      changeCurrentContextId: (contextId) => {
        dispatch(changeCurrentContextId(contextId));
      },
      addGroupData: (groupName, groupData) => {
        dispatch(addGroupData(groupName, groupData));
      },
      setModuleSettings: (moduleName, moduleSettingsData) => {
        dispatch(setModuleSettings(moduleName, moduleSettingsData));
      },
      changeModuleSettings: (moduleName, moduleSettingsData) => {
        dispatch(changeModuleSettings(moduleName, moduleSettingsData));
      }
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ToolsContainer);

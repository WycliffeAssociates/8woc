import React from 'react';
import { connect } from 'react-redux';
// actions
import { showPopover } from '../actions/PopoverActions';
import { addComment } from '../actions/CommentsActions';
import { addVerseEdit } from '../actions/VerseEditActions';
import { toggleReminder } from '../actions/RemindersActions';
import { changeSelections, validateSelections } from '../actions/SelectionsActions';
import { changeCurrentContextId, loadCurrentContextId, changeToNextContextId, changeToPreviousContextId } from '../actions/ContextIdActions';
import { addGroupData, verifyGroupDataMatchesWithFs } from '../actions/GroupsDataActions';
import { setGroupsIndex } from '../actions/GroupsIndexActions';
import { setModuleSettings } from '../actions/ModulesSettingsActions';
import { sendProgressForKey } from '../actions/LoaderActions';
import { setProjectDetail } from '../actions/projectDetailsActions';
import { setDataFetched } from '../actions/currentToolActions';
import { openAlertDialog, openOptionDialog, closeAlertDialog } from '../actions/AlertModalActions';
import { selectModalTab } from '../actions/ModalActions';
import * as ResourcesActions from '../actions/ResourcesActions';

class ToolsContainer extends React.Component {

  componentDidMount() {
    this.props.actions.verifyMenuChecksReflectFS();
  }

  componentWillReceiveProps(nextProps) {
    let { contextId } = nextProps.contextIdReducer
    let { toolName } = nextProps.currentToolReducer
    // if contextId does not match current tool, then remove contextId
    if (contextId && contextId.tool !== toolName) {
      nextProps.actions.changeCurrentContextId(undefined)
    }
    // check to see if groupData and groupIndex
    if (!contextId) nextProps.actions.loadCurrentContextId()
  }

  render() {
    let {modules} = this.props.coreStoreReducer;
    let {toolName} = this.props.currentToolReducer;
    let Tool = modules[toolName];

    return (
      <Tool {...this.props} modules={modules} />
    );
  }
}

const mapStateToProps = state => {
  return {
    coreStoreReducer: state.coreStoreReducer,
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
    selectionsReducer: state.selectionsReducer,
    verseEditReducer: state.verseEditReducer,
    groupsIndexReducer: state.groupsIndexReducer,
    groupsDataReducer: state.groupsDataReducer,
    modulesSettingsReducer: state.modulesSettingsReducer,
    currentToolReducer: state.currentToolReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      goToNext: () => {
        dispatch(changeToNextContextId());
      },
      goToPrevious: () => {
        dispatch(changeToPreviousContextId());
      },
      showPopover: (title, bodyText, positionCoord) => {
        dispatch(showPopover(title, bodyText, positionCoord));
      },
      addNewBible: (bibleName, bibleData) => {
        dispatch(ResourcesActions.addNewBible(bibleName, bibleData));
      },
      loadResourceArticle: (resourceType, articleId) => {
        dispatch(ResourcesActions.loadResourceArticle(resourceType, articleId));
      },
      addComment: (text, userName) => {
        dispatch(addComment(text, userName));
      },
      changeSelections: (selections, userName) => {
        dispatch(changeSelections(selections, userName));
      },
      validateSelections: (targetVerse) => {
        dispatch(validateSelections(targetVerse));
      },
      toggleReminder: (userName) => {
        dispatch(toggleReminder(userName));
      },
      selectModalTab: (tab, section, vis) => {
        dispatch(selectModalTab(tab, section, vis));
      },
      addVerseEdit: (before, after, tags, userName) => {
        dispatch(addVerseEdit(before, after, tags, userName));
      },
      changeCurrentContextId: (contextId) => {
        dispatch(changeCurrentContextId(contextId));
      },
      loadCurrentContextId: () => {
        dispatch(loadCurrentContextId());
      },
      addGroupData: (groupId, groupData) => {
        dispatch(addGroupData(groupId, groupData));
      },
      setGroupsIndex: (groupsIndex) => {
        dispatch(setGroupsIndex(groupsIndex));
      },
      setModuleSettings: (NAMESPACE, settingsPropertyName, moduleSettingsData) => {
        dispatch(setModuleSettings(NAMESPACE, settingsPropertyName, moduleSettingsData));
      },
      setProjectDetail: (key, value) => {
        dispatch(setProjectDetail(key, value));
      },
      isDataFetched: val => {
        dispatch(setDataFetched(val));
      },
      doneLoading: () => {
        dispatch({type: "DONE_LOADING"})
      },
      verifyMenuChecksReflectFS: () => {
        dispatch(verifyGroupDataMatchesWithFs());
      },
      openAlertDialog: (message) => {
        dispatch(openAlertDialog(message));
      },
      openOptionDialog: (alertMessage, callback, button1Text, button2Text) => {
        dispatch(openOptionDialog(alertMessage, callback, button1Text, button2Text));
      },
      closeAlertDialog: () => {
        dispatch(closeAlertDialog());
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsContainer);

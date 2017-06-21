import path from 'path-extra';
// actions
import consts from './ActionTypes';
import * as AlertModalActions from './AlertModalActions';
import * as ModalActions from './ModalActions';
import * as ToolsActions from './ToolsActions';
import * as LoadHelpers from '../helpers/LoadHelpers';
import * as RecentProjectsActions from './RecentProjectsActions';
import * as CurrentToolActions from './currentToolActions';
import * as BodyUIActions from './BodyUIActions';
import * as projectDetailsActions from './projectDetailsActions';


export function openProject(projectPath, projectLink) {
    return ((dispatch, getState) => {
        const { username } = getState().loginReducer.userdata;
        const confirmDialog = (message, callback, bt1, bt2) => {
            dispatch(AlertModalActions.openOptionDialog(message, callback, bt1, bt2));
        }
        dispatch(isValidProject(projectPath, projectLink, username, confirmDialog)).then((validProjectObject) => {
            const { manifest, projectPath } = validProjectObject;
            dispatch(clearLastProject());
            dispatch(loadProjectIntoApp(projectPath, manifest));
            dispatch(displayTools(manifest));
        }).catch((err) => {
            dispatch(AlertModalActions.openAlertDialog(err.message || err))
        })
    });
}

export function isValidProject(projectPath, projectLink, username, confirmDialog) {
    return ((dispatch) => {
        return new Promise((resolve, reject) => {
            if (!projectPath) {
                reject("No project path specified");
            } else if (LoadHelpers.isUSFMProject(projectPath)) {
                reject("translationCore does not support USFM importing");
            } else {
                let manifest = getProjectManifest(projectPath, projectLink, username);
                if (!manifest) reject("No valid manifest found in project");
                if (LoadHelpers.projectHasMergeConflicts(manifest.finished_chunks, projectPath)) reject("Oops! The project you are trying to load has a merge conflict and cannot be opened in this version of translationCore! Please contact Help Desk (help@door43.org) for assistance.");
                if (LoadHelpers.projectIsMissingVerses(manifest.project.name, projectPath)) {
                    const callback = (option) => {
                        if (option != "Cancel") {
                            resolve({ manifest, projectPath });
                        }
                        return dispatch(AlertModalActions.closeAlertDialog());
                    }
                    confirmDialog("Oops! Your project has blank verses! Please contact Help Desk (help@door43.org) for assistance with fixing this problem. If you proceed without fixing, some features may not work properly",
                        callback, "Continue Without Fixing", "Cancel");
                } else {
                    return resolve({ manifest, projectPath });
                }
            }
        })
    })
}

export function getProjectManifest(projectPath, projectLink, username) {
    let manifest = LoadHelpers.loadFile(projectPath, 'manifest.json');
    let tCManifest = LoadHelpers.loadFile(projectPath, 'tc-manifest.json');
    manifest = manifest || tCManifest;
    if (!manifest || !manifest.tcInitialized) {
        manifest = LoadHelpers.setUpManifest(projectPath, projectLink, manifest, username);
    }
    return manifest;
}

export function loadProjectIntoApp(projectPath, manifest) {
    return ((dispatch) => {
        LoadHelpers.migrateAppsToDotApps(projectPath);
        projectPath = LoadHelpers.saveProjectInHomeFolder(projectPath);
        dispatch(projectDetailsActions.setSaveLocation(projectPath));
        dispatch(projectDetailsActions.setProjectManifest(manifest));
        dispatch(projectDetailsActions.setProjectDetail("bookName", manifest.project.name));
        const params = LoadHelpers.getParams(projectPath, manifest);
        dispatch(projectDetailsActions.setProjectParams(params));
    });
}

export function displayTools(manifest) {
    return ((dispatch, getState) => {
        const { currentSettings } = getState().settingsReducer;
        if (LoadHelpers.checkIfValidBetaProject(manifest) || currentSettings.developerMode) {
            dispatch(ToolsActions.getToolsMetadatas());
            dispatch(ModalActions.selectModalTab(3, 1, true));
        } else {
            dispatch(AlertModalActions.openAlertDialog('You can only load Ephesians or Titus projects for now.', false));
            dispatch(RecentProjectsActions.getProjectsFromFolder());
            dispatch(clearLastProject())
        }
    });
}

export function clearLastProject() {
    return ((dispatch) => {
        dispatch(BodyUIActions.toggleHomeView(true));
        dispatch(projectDetailsActions.resetProjectDetail());
        dispatch({ type: consts.CLEAR_PREVIOUS_GROUPS_DATA });
        dispatch({ type: consts.CLEAR_PREVIOUS_GROUPS_INDEX });
        dispatch({ type: consts.CLEAR_CONTEXT_ID });
        dispatch({ type: consts.CLEAR_CURRENT_TOOL });
        dispatch({ type: consts.CLEAR_PREVIOUS_DATA });
        dispatch({ type: consts.CLEAR_RESOURCES_REDUCER });
        dispatch(CurrentToolActions.setToolTitle(""));
    });
}
